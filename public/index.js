const cardContainer = document.querySelector('#cardContainer')

const form = document.querySelector('form')


const cardsCallBack = ({ data: cards}) => displayCards(cards);
const errCallBack = err => console.log(err);

const getAllCards = () => axios.get('/cards').then(cardsCallBack).catch(errCallBack);


const cardsCard = card =>{
    const cardsCard = document.createElement('div');
    cardsCard.classList.add('cards-card');

    let { imageUrl } = card
    cardsCard.innerHTML = `
    <p class="card">${card.number}<p>
    <div class="card-container"> 
    <img src="${imageUrl}"/>
    </div>`

        cardContainer.appendChild(cardsCard);
}

const changeInput = (e) => { //the callback function from the event listener
    e.preventDefault() //prevents the page from reloading when new input is added.

    const drop1 = document.getElementById('sets')
    const drop2 = document.getElementById('colors')
    const drop3 = document.getElementById('types')

    axios.get(`/sets?set=${drop1.value}&color=${drop2.value}&types=${drop3.value}`)     //sets a variable that contains the .get req for the base URL + the new endpoint
    
    .then(cardsCallBack)

    .catch(err => console.log(err))

}

const displayCards = arr => {
    cardContainer.innerHTML=``
    for (i = 0; i < arr.length; i++) {
        if (!arr[i].imageUrl){

        }else (cardsCard(arr[i])
        )
        console.log(arr[i])
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
        particlesJS("snow", {
            "particles": {
                "number": {
                    "value": 400,
                    "density": {
                        "enable": true,
                        "value_area": 900
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false
                    }
                },
                "size": {
                    "value": 1.75,
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
                    "speed": 4,
                    "direction": "bottom-right",
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

form.addEventListener('submit', changeInput)


getAllCards()


