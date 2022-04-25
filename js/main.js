import { imageData, shuffle } from "./data.js";

const cards = [...document.querySelectorAll('.card')]
const countScreen = document.querySelector("#count")
const foundScreen = document.querySelector("#found")
const alert = document.querySelector(".alert-box")

// Shuffle Images
const DEFAULT_IMAGES = shuffle(imageData).slice(0, 8)
const GAME_IMAGES = shuffle([...DEFAULT_IMAGES, ...DEFAULT_IMAGES])

const foundCards = []
let choosenCards = []
let moves = 0
let found = 0
let selectCount = 0
let mainMove = Math.floor(moves / 2)

countScreen.innerHTML = moves
foundScreen.innerHTML = `${found} / ${GAME_IMAGES.length / 2}`


// Append to grid
const appendImagesToScreen = () => {
    cards.forEach((card, index) => {
        card.querySelector("img").src = GAME_IMAGES[index].src
    })
}

// Check for match
const checkMatched = () => {
    if(choosenCards[0].id === choosenCards[1].id) {
        selectCount = 0
        updateFound()
        foundCards.push(...choosenCards)
        choosenCards = []
    }

    if(found == 8) {
        stopInteraction()
        if(localStorage.getItem('FLIP_BEST')) {
            const BEST = parseInt(localStorage.getItem('FLIP_BEST'))
            if(BEST > mainMove) {
                localStorage.setItem('FLIP_BEST', mainMove)
            }
        }
        else {
            localStorage.setItem('FLIP_BEST',  mainMove)
        }

        endGame()
    }
    
    flipCardsBack(choosenCards)
    choosenCards = []
}

// End Game
const endGame = () => {
    stopInteraction()
    alert.classList.add("show")

    const BEST = localStorage.getItem("FLIP_BEST")

    alert.addEventListener('transitionend', () => {
        alert.querySelector(".alert > .move > .number").innerHTML = mainMove
        alert.querySelector(".alert > .best > .number").innerHTML = BEST
        alert.querySelector(".alert").classList.add("show")
        alert.querySelector("#play-again").addEventListener("click", () => location.reload())
    })
}


// Flip Cards Back
const flipCardsBack = (cards) => {
    cards.forEach(item => {
        item.card.querySelector(".card-overlay").classList.remove("hide")
    })
    selectCount = 0
}


// Flip Card
const flipCard = (card, index) => {
    selectCount += 1
    updateMove()

    if(selectCount <= 2 ) {
        card.classList.add("flip")

        const chosenCard = {
            ...GAME_IMAGES[index],
            card
        }
        
        choosenCards.push(chosenCard)

        card.addEventListener("transitionend", () => {
            card.classList.remove("flip")
            card.querySelector("img").src = GAME_IMAGES[index].src
            card.querySelector(".card-overlay").classList.add("hide")
        }, { once: true })

        if(choosenCards.length === 2) {
            setTimeout(checkMatched, 1000)
        }
    }

}


// Handle Card Clicks
const handleClick = (e) => {
    const card = e.target.parentElement
    const cardIndex = cards.indexOf(card)
    
    if(cards.includes(card) && !foundCards.find(item => item.card == card)) {
        flipCard(card, cardIndex)
    }
}


// Make Cards Clickable
const startInteraction = () => {
    document.addEventListener("click", handleClick)
}


// Stops cards from being clicked
const stopInteraction = () => {
    document.removeEventListener("click", handleClick)
}


// Increment and update move 
const updateMove = () => {
    moves += 1
    mainMove = Math.floor(moves / 2)
    countScreen.innerHTML = mainMove
}


// Increment and update found 
const updateFound = () => {
    found += 1
    foundScreen.innerHTML = `${found} / ${GAME_IMAGES.length / 2}`
}


startInteraction()
appendImagesToScreen()