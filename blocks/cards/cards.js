import { createOptimizedPicture, fetchPlaceholders } from '../../scripts/aem.js';

const placeholders = await fetchPlaceholders('');

export default function decorate(block) {
  const { clickHereForMore } = placeholders;

  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.title = clickHereForMore;
    link.href = '/home';
    link.innerHTML = clickHereForMore;
    link.classList.add('click-here-link');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    li.append(link);
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}
