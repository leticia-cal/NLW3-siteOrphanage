//create map
const map = L.map('map').setView([-27.222633, -49.6455874], 15);

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

function addMarker({id, name, lat, lng}){ //como se fosse orphanage.id , orphanage.name , mas resumido
    //create popup overlay
    const popup = L.popup({
        closeButton: false,
        className: 'map-popup',
        minWidth: 240,
        minHeight: 240
    }).setContent(`${name} <a href="/orphanage?id=${id}" class="choose-orphanage"> <img src="/images/arrow-white.svg"> </a>`);
    
    //create and add marker
    L
    .marker([lat, lng], {icon}) //como a variavel chamada icon tem o mesmo nome da propriedade icon. Ao invés de ficar icon: icon , vc elimina um, deixando apenas icon
    .addTo(map)
    .bindPopup(popup);
}

const orphanagesSpan = document.querySelectorAll('.orphanages span');
orphanagesSpan.forEach( span => {
    const orphanage = {
        id: span.dataset.id,
        name: span.dataset.name,
        lat: span.dataset.lat,
        lng: span.dataset.lng
    };

    addMarker(orphanage);
} )
