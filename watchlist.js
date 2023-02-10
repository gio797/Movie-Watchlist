
const wListCard = document.getElementById('watchlist-card')
let moviesFromLocalStorage = JSON.parse(localStorage.getItem("movies"))

wListCard.innerHTML = `<div class="empty-watchlist">
            <h3>Your watchlist is looking a little empty...</h3>
            <a href="./index.html">
                <h3><span class="w-list">+</span> Let's add some movies!</h3>
            </a>
            </div>`

if (moviesFromLocalStorage) {
    watchListArray = moviesFromLocalStorage
    displayWatchlist()
}

function displayWatchlist() {
    let wathcListHtml = ''
    watchListArray.forEach(element => {
        // console.log(element)
        wathcListHtml += `
        <div class="mcard">
        <div class="poster">
            <img src="${element.Poster}" alt="">
        </div>
        <div class="info">
            <div class='title-rating'>
                <h3>${element.Title}</h3>
                <p><i class="fa-solid fa-star"></i> ${element.imdbRating}</p>
            </div>
            <div class='genre'>
                <p>${element.Runtime}</p>
                <p>${element.Genre}</p>
                <div>
                    <span class="w-list" data-ident="${element.imdbID}">-</span> Watchlist
                </div>
            </div>
            <p class='plot'>${element.Plot}</p>
            </div>    
        </div>
        <hr>`
        wListCard.innerHTML = wathcListHtml
    })
}

document.addEventListener('click', (e) => {

    if (e.target.dataset.ident) {
        const newArr = watchListArray.filter((object) => {
            return object.imdbID !== e.target.dataset.ident
        })

        watchListArray = newArr

        localStorage.setItem("movies", JSON.stringify(watchListArray))
        moviesFromLocalStorage = JSON.parse(localStorage.getItem("movies"))
        displayWatchlist()

        if (watchListArray.length === 0) {
            wListCard.innerHTML = `<div class="empty-watchlist">
            <h3>Your watchlist is looking a little empty...</h3>
            <a href="./index.html">
                <h3><span class="w-list">+</span> Let's add some movies!</h3>
            </a>
            </div>`
        }
    }
})


