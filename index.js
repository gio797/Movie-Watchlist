
let title
const movieCards = document.getElementById('movie-card')
const form = document.getElementById('form-search')
let watchListArray = []
let moviesFromLocalStorage = JSON.parse(localStorage.getItem("movies"))

movieCards.innerHTML = `
    <div class="empty-screen">
    <img src="./images/Icon.svg" alt="">
    <h2>Start Exploring</h2>
    </div>`

if (moviesFromLocalStorage) {
    watchListArray = moviesFromLocalStorage
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    title = document.getElementById('search-input')
    movieCards.innerHTML = ''

    fetch(`https://www.omdbapi.com/?apikey=fb65d34e&s=${title.value}`)
        .then(Response => Response.json())
        .then(data => {
            getMoviesFromSearch(data.Search)
        })

    document.getElementById('search-input').value = ''
})


function getMoviesFromSearch(movies) {

    movies.forEach(movie => {
        fetch(`https://www.omdbapi.com/?apikey=fb65d34e&i=${movie.imdbID}`)
            .then(Response => Response.json())
            .then(data => {
                // console.log(data)
                movieCards.innerHTML += `
            <div class="mcard">
                <div class="poster">
                    <img src="${data.Poster}" alt="">
                </div>
                <div class="info">
                    <div class='title-rating'>
                        <h3>${data.Title}</h3>
                        <p><i class="fa-solid fa-star"></i> ${data.imdbRating}</p>
                    </div> 
                    <div class='genre'>  
                        <p>${data.Runtime}</p>
                        <p>${data.Genre}</p>
                        <div>
                            <span class="w-list" data-id="${data.imdbID}">+</span> Watchlist
                        </div>
                    </div>
                    <p class='plot'>${data.Plot}</p>
                    
                </div>    
            </div>
            <hr>`
            })
    })
}


document.addEventListener('click', (e) => {
    if (e.target.dataset.id) {
        fetch(`http://www.omdbapi.com/?i=${e.target.dataset.id}&apikey=fb65d34e`)
            .then(Response => Response.json())
            .then(data => {
                watchListArray.unshift(data)
                localStorage.setItem("movies", JSON.stringify(watchListArray))
            })
    }
})





