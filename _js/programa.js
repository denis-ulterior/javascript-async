window.onload = init

function init() {
    loadDeck()
}

let loadBotao = () => {
    let btn = document.getElementById('mudar')
    btn.addEventListener('click', function () {
        const myNode = document.getElementById("cards");
        myNode.innerHTML = ''
        document.location.reload(true);
    })
}

const loadDeck = async () => {
    let deck = (await getDeck())
    let deckRetornado = deck.deck_id

    let cards = await getCards(deckRetornado)

    const cardsImages = document.getElementById('cards')

    for (let [i, card] of cards.cards.entries()) {
        let img = document.createElement('img')
        img.id = i
        img.src = card.image
        cardsImages.appendChild(img)
    }

    loadBotao()

}
const getDeck = async () => {
    let DECK = 'http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
    try {
        let data = await fetch(DECK)
        //console.log(data)
        let json = await data.json()
        //console.log(json)

        return json

    } catch (e) {
        console.log(e.message)
    }
}

const getCards = async (id) => {
    try {
        let data = await fetch(`http://deckofcardsapi.com/api/deck/${id}/draw/?count=7`)
        const json = await data.json()
        return json
    } catch (e) {
        console.log(e.message)
    }
}

