const deckContainer = document.querySelector('#deckContainer')
const form = document.querySelector('form')


const cardsCallBack = ({ data: cards}) => displayCards(cards);
const errCallBack = err => console.log(err);

const addDeckCard  = body => axios.post('/cards', body).then(cardsCallBack).catch(errCallBack) 
const deleteCard = id => axios.delete(`/cards/${id}`).then(cardsCallBack).catch(errCallBack)

function submitHandler(e) {
    e.preventDefault()
    console.log('hit')

    let cardInput = document.querySelector('#cardInput')
    let drop1 = document.querySelector('#sets2')

    let bodyObj = {
        cardInput: cardInput.value,
        drop1: drop1.value
    }
    console.log(bodyObj)
    addDeckCard(bodyObj)

    cardInput.value=''
}

const cardsCard = card =>{
    const cardsCard = document.createElement('div');
    cardsCard.classList.add('cards-card');

    let { imageUrl } = card
    cardsCard.innerHTML = `
    <p class="card">${card.number}<p>
    <div class="deck-container"> 
    <img src="${imageUrl}"/>
    </div>
    <button onclick="deleteCard('${card.id}')">DELETE</button>`

        deckContainer.appendChild(cardsCard);
}


const displayCards = arr => {
    deckContainer.innerHTML=``
    for (i = 0; i < arr.length; i++) {
        console.log(arr[i])
        if (!arr[i].imageUrl){

        }else (cardsCard(arr[i])
        )
    }
}


const filter = evt => {
    let filtersCollection = document.querySelector('filter-input')
    let filtersObj = {}

    for(let i = 0; i < filtersCollection.length; i++){
        if(filtersCollection[i].value != ''){
            filtersObj[filtersCollection[i].id] = filtersCollection[i].value
        }
    }
}

document.addEventListener('DOMContentLoaded', function(){
    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
    script.onload = function(){
        particlesJS("spark", {
            "particles": {
                "number": {
                    "value": 50,
                    "density": {
                        "enable": true,
                        "value_area": 900
                    }
                },
                "color": {
                    "value": "#c27ba0"
                },
                "opacity": {
                    "value": .7,
                    "random": false,
                    "anim": {
                        "enable": false
                    }
                },
                "size": {
                    "value": 2,
                    "random": true,
                    "anim": {
                        "enable": false
                    }
                },
                "line_linked": {
                    "enable": false
                },
                "move": {
                    "enable": true,
                    "speed": 3,
                    "direction": "top right",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": true,
                        "rotateX": 300,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "events": {
                    "onhover": {
                        "enable": false
                    },
                    "onclick": {
                        "enable": false
                    },
                    "resize": false
                }
            },
            "retina_detect": true
        });
    }
    document.head.append(script);
});

form.addEventListener('submit', submitHandler)