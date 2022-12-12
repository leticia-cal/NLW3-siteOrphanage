//create options
const options = {
    dragging: false,
    touchZoom: false,
    doubleClickZoom: false,
    scrollWheelZoom: false,
    zoomControl: false
}

//get values from html
const lat = document.querySelector('span[data-lat]').dataset.lat
const lng = document.querySelector('span[data-lng]').dataset.lng

//create map
const map = L.map('map', options).setView([lat, lng], 15);

//create and add tile layer
L.tileLayer(
    'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
).addTo(map);

//create icon
const icon = L.icon({
    iconUrl: "/images/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2],
});


//create and add marker
L
.marker([lat, lng], { icon }) //como a variavel chamada icon tem o mesmo nome da propriedade icon. Ao invés de ficar icon: icon , vc elimina um, deixando apenas icon
.addTo(map)

//image gallery
function selectImage(event){
    const button = event.currentTarget;

    //remover todas as classes .active dos botões
    const buttons = document.querySelectorAll(".images button"); //pega todos os .images button
    buttons.forEach((button) => {
        button.classList.remove("active");
    });

    //selecionar a imagem clicada
    const image = button.children[0]; //pega a imagem do botão
    const imageContainer = document.querySelector(".orphanage-details > img") //pega 1 só

    //atualizar o container de image
    imageContainer.src = image.src;

    //adicionar a classe .active de volta no botão
    button.classList.add("active");
}