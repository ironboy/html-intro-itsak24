let products = [
  {
    name: 'Farfalle - ekologisk pasta (500g)',
    description: 'Riktigt fin handgjord farfalle pasta. Gjorde enligt italiensk tradition. Odlad på äkta durumvete från Gotland.',
    priceSEK: 25
  },
  {
    name: 'Körsbärstomater (400 g)',
    description: 'Små fina körsbärstomater odlade på Österlen av Gretchen, som arbetat med tomatolding i 45 år.',
    priceSEK: 40
  },
  {
    name: 'Karljohanssvamp (fryst, 1 kg)',
    description: 'Karljohanssvamp av mycket hög kvalitet. Handplockad i svenska skogar.',
    priceSEK: 500
  }
];

let html = '';

for (let product of products) {
  html += `
    <article>
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p>Pris: ${product.priceSEK} kr</p>
    </article>
  `;
}

// Grab the tag/HTML-element with the class
// product-list and change its content
// to our generade HTML
document.querySelector('.product-list').innerHTML = html;