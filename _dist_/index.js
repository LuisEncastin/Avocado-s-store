const baseUrl = "https://platzi-avo.vercel.app";
const url = "https://platzi-avo.vercel.app/api/avo";
const appNode = document.querySelector('#app')

// api de internacionalización intl
//1 - format fechas.
//2 - format monedas.

const formatPrice = price => {

    const newPrice = new window.Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN"
    }).format(price)

    return newPrice;
 }

//Web API para traer recursos de la web - fetch.

 //Primeros pasos:
//Conectarnos al servidor.
window
    .fetch(`${baseUrl}/api/avo`)
    //Procesar la respuesta y convertirla en JSON
    .then(respuesta => respuesta.json())
    //JSON => Data => Renderizar info en el browser.
    .then(responseJson => {

        const todosLosItems = [];
        
        responseJson.data.forEach(item => {
            
            // Crear imagen
            const imagen = document.createElement("img");
            imagen.src = `${baseUrl}${item.image}`;
            imagen.className = "h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6"

            // Crear título
            const title = document.createElement("h2");
            title.className = "text-lg"
            title.textContent = item.name;

            // Crear precio
            const price = document.createElement("div");
            price.className = "text-gray-600"
            price.textContent = formatPrice(item.price);

            // Creamos un contenedor el título y el precio
            const priceAndTitle = document.createElement("div")
            priceAndTitle.className = "text-center md:text-left";
            priceAndTitle.appendChild(title);
            priceAndTitle.appendChild(price);

            // Metemos todo dentro de una tarjeta contenedora
            const card = document.createElement("div");
            card.className = "md:flex bg-white rounded-lg p-6 hover:bg-gray-300";
            card.append(imagen, priceAndTitle);

            // Metemos todo dentro del contenedor principal
            const contenedor = document.createElement("div");
            contenedor.appendChild(card);

            todosLosItems.push(contenedor);

        });

        appNode.append(...todosLosItems);
        
    });

//En vez de promesas, podemos usar asyn-await.
// Solicitud de api usando Async Await

// (async function () {
//     const response = await fetch(`${baseUrl}/api/avo`);
//     // 💡 More about Spread: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
//     const { data: allAvos } = await response.json();
  
//     // Create the HTML Nodes for each avocado we receive from the API
//     // 💡 More about Array.map: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
//     const nodeArray = allAvos.map((avocado) => {
//       // Create image node
//       // <img class="h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6" src="avatar.jpg">
//       const image = document.createElement("img");