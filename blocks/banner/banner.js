// import { createOptimizedPicture } from '../../scripts/aem.js';

// export default function decorate(block) {
//   /* change to ul, li */
//   console.log('block', block)
//   const div = document.createElement('div');
// //   [...block.children].forEach((row) => {
//     const p = document.createElement('p');
//     // while (row.firstElementChild) li.append(row.firstElementChild);
//     // [...li.children].forEach((div) => {
//     //   if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
//     //   else div.className = 'cards-card-body';
//     // });
//     // div.className = 'banner'
//     div.appendChild(p);
// //   });
//   div.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
//   block.textContent = '';
//   block.append(div);
// }
