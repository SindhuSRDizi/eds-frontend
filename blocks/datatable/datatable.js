import { fetchPlaceholders } from '../../scripts/aem.js';

// Fetch placeholders
const placeholders = await fetchPlaceholders('');

const {
  sNo,
  city,
  country,
  timezone,
} = placeholders;

let currentOffset = 0;
let limit = 20;

function createTableHeader(table) {
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');

  const headers = [sNo, city, country, timezone];
  headers.forEach((headerText) => {
    const th = document.createElement('th');
    th.textContent = headerText;
    headerRow.append(th);
  });

  thead.append(headerRow);
  table.append(thead);
}

function createTableRow(table, row, i) {
  const tbody = table.querySelector('tbody') || document.createElement('tbody');
  const tr = document.createElement('tr');

  const data = [i, row.City, row.Country, row.TimeZone];
  data.forEach((dataItemText) => {
    const td = document.createElement('td');
    td.textContent = dataItemText;
    tr.append(td);
  });

  tbody.append(tr);
  if (!table.contains(tbody)) {
    table.append(tbody);
  }
}

async function updateTable(jsonURL, parentDiv) {
  const table = await createTable(jsonURL, currentOffset, limit);
  const existingTable = parentDiv.querySelector('.table-container');

  if (existingTable) {
    existingTable.replaceWith(table);
  } else {
    parentDiv.append(table);
  }
}

async function createTable(jsonURL, offset = 0, limitPerPage = 20) {
  const url = new URL(jsonURL);
  url.searchParams.set('offset', offset);
  url.searchParams.set('limit', limitPerPage);

  const resp = await fetch(url);
  const json = await resp.json();

  const table = document.createElement('table');
  table.classList.add('table-container');

  createTableHeader(table);
  json.data.forEach((row, i) => {
    createTableRow(table, row, i + 1 + offset);
  });

  return table;
}

function createPaginationControls(jsonURL, parentDiv) {
  const paginationContainer = document.createElement('div');
  paginationContainer.classList.add('pagination-controls');

  const prevBtn = document.createElement('button');
  prevBtn.textContent = 'Previous';

  const nextBtn = document.createElement('button');
  nextBtn.textContent = 'Next';

  // Update the state of the buttons
  function updateButtonStates() {
    prevBtn.disabled = currentOffset === 0;
  }

  prevBtn.addEventListener('click', async () => {
    if (currentOffset > 0) {
      currentOffset -= limit;
      await updateTable(jsonURL, parentDiv);
      updateButtonStates();
    }
  });

  nextBtn.addEventListener('click', async () => {
    currentOffset += limit;
    await updateTable(jsonURL, parentDiv);
    updateButtonStates();
  });

  // Initially update the button states
  updateButtonStates();

  paginationContainer.append(prevBtn, nextBtn);
  return paginationContainer;
}

export default async function decorate(block) {
  const countries = block.querySelector('a[href$=".json"]');
  const parentDiv = document.createElement('div');
  parentDiv.classList.add('countries-block');

  if (countries) {
    parentDiv.append(await createTable(countries.href, currentOffset, limit));
    parentDiv.append(createPaginationControls(countries.href, parentDiv));
    countries.replaceWith(parentDiv);
  }
}
