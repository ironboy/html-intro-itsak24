// Get the content of products.json
let productsRaw = await fetch('products.json');
// Unpack the content from JSON to a JavaScript 
// data structure (an array of objects)
let products = await productsRaw.json();

// A shorter but less readable version:
// let products = await(await fetch('products.json')).json();

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
