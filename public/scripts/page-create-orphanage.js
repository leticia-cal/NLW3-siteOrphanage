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
    iconAnchor: [29, 68]
});

let marker;

//create and add marker
map.on('click', (event) => { /*listener, função*/
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    //pegar os valores dos input hidden de lat e lng do html
    document.querySelector('[name=lat]').value = lat;
    document.querySelector('[name=lng]').value = lng;

    //verifica se o marker já existe, se existir, remove ele pra adicionar outro
    marker && map.removeLayer(marker);

    //adiciona o marker novo
    marker = L.marker([lat, lng], {icon}).addTo(map);

    /*antes era assim
    L.marker([-27.222633, -49.6455874], {icon}).addTo(map)
    */
});

//add photo
function addPhotoField(){
    //pega o container que engloba o container do input de adicionar foto ou seja o <div class="images-upload" id="images">
    const containerGeneral = document.querySelector('#images');

    //pega o container do input de adicionar foto <div class="new-upload">
    const fieldsContainer = document.querySelectorAll('.new-upload');
    //ele volta um array com todos os campos de adicionar foto já criados

    //clonar o último campo (última posição do array)
    const newFieldContainer = fieldsContainer[fieldsContainer.length - 1].cloneNode(true);
    //o cloneNode(true) clona tudo o que está dentro do <div class="new-upload"> incluindo span e outras tags
    //se o cloneNode fosse FALSE ele iria clonar apenas a tag <div class="new-upload"> sem o seu interior

    //verificar se o campo está vazio, se sim, não adicionar container de imagem
    const input =  newFieldContainer.children[0];
    if(input.value == ""){
        return;
    }

    //limpar o newFIeldContainer antes de adicionar ele
    input.value = "";

    //adicionar o clone ao container que engloba o container de input
    containerGeneral.appendChild(newFieldContainer);
}

//deletar o field da foto
function deletePhotoField(event){
    //pegar o campo que vc quer limpar
    const span = event.currentTarget;

    //pegar os campos q vc quer deletar se tiver mais de um field de foto
    const photoFieldsContainer = document.querySelectorAll('.new-upload');

    //limpar o valor do primeiro campo SE tiver só ele na tela
    if(photoFieldsContainer.length < 2){
        span.parentNode.children[0].value = ""; //pega o pai new-upload e o primeiro filho dele q é o input e limpa
        return; //começa a função de novo. Não vai para a proxima linha
    }

    //deletar o campo se tiver mais de 1
    span.parentNode.remove(); //pega o pai q é o new-upload e deleta ele
}

//select YES or NO
function toggleActive(event){
    //retirar a classe .active de todos os botões
    document.querySelectorAll(".button-select button")
    .forEach( button => button.classList.remove("active")); // (button) => {} simplificada por ter só 1 argumento

    //adicionar a classe .active no botão clicado
    const button = event.currentTarget;
    button.classList.add("active");

    //atualizar o input hidden com o valor selecionado
    const input = querySelector('[name="open_on_weekends"]');

    //verificar se é sim ou não
    input.value = button.dataset.value; //atualiza o value do input hidden com o valor do data-value do botão clicado
}

function validate(event){
    //pegar o campo de lat e lng
    const lat = document.querySelector('[name=lat]').value;
    const lng = document.querySelector('[name=lng]').value;

    //verificar se no value dele está vazio
    if(lat == '' && lng == ''){
        //se estiver vazio faz o e da o alert
        event.preventDefault()
        alert('Selecione um ponto no mapa')
    }

}
