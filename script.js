const movieGridElement = document.querySelector('#movie-grid')
const searchInputElement = document.getElementById("search-input")
const key = "6c1d0d53a7def6e48606ef1e2ca00a35"
var page = 1
var query = searchInputElement.value
const input = document.getElementById('search-form').addEventListener('submit', (event)=> {
    event.preventDefault()
    getQuery()
})
const moreButton = document.getElementById('load-more-movies-btn').addEventListener('submit', (event)=> {
    event.preventDefault()
    getMore()
})
const closeButton = document.getElementById('close-search-btn').addEventListener('submit', (event)=> {
    event.preventDefault()
    closeSearch()
})

async function fetchNowPlaying(){
    // movieGridElement.innerHTML = ''
    const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=${page}`)
    const result = await response.json();
    console.log(result.results)
    result.results.forEach(addCard) 
}

function addCard(results){
    movieGridElement.innerHTML = movieGridElement.innerHTML + `
        <div class="movie-card">
            <p class="movie-title">${results.title} <br/><br/></p>
            <img class="movie-poster" src="https://image.tmdb.org/t/p/w500${results.poster_path}" alt="${results.title}" title="${results.title}"/>
            <p class="movie-votes">Average votes: ${results.vote_average} <br/></p>
        </div>`
}

async function getQuery(){
    page = 1
    query = searchInputElement.value
    if (query != ''){
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${query}&page=${page}`)
        const result = await response.json();
        movieGridElement.innerHTML = ''
        result.results.forEach(addCard) 
    }else{
        movieGridElement.innerHTML = ''
        fetchNowPlaying()
    }
}

async function getMore(){
    page++
    if (query != ''){
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${query}&page=${page}`)
        const result = await response.json();
        result.results.forEach(addCard) 
    }else{fetchNowPlaying()}
}

function closeSearch(){
    page = 1
    movieGridElement.innerHTML = ''
    fetchNowPlaying()
}

window.onload = function (){
    fetchNowPlaying();
}