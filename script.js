const imgUrl ="https://image.tmdb.org/t/p/original";
const movieList = document.querySelector(".movie-list");
let carouselBox = document.querySelector(".movie-info");
let carouselBg = document.querySelector(".movie-container");
let i=0;

const genreId = async () => {
        let response = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=b92574e30ce5f872de6462b72d86654f&language=en-US");
        let data = await response.json();
        return data.genres;
}

let movieDatabyGenre = async (id) => {
    let response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=b92574e30ce5f872de6462b72d86654f&with_genres=${id}`);
    let data = await response.json();
    return data.results;
};

//agar async/await use karre toh use for...of instead of forEach
let generateCard = async () => {
    let genre = await genreId();

    for(genreItem of genre) {

        let genreTitle = document.createElement("h2");
        genreTitle.classList.add("genre");
        genreTitle.innerHTML = `${genreItem.name}`
        movieList.appendChild(genreTitle);

        let div = document.createElement("div");
        div.classList.add("list");

        let movies = await movieDatabyGenre(genreItem.id);
        movies.forEach(movie => {

            let imgSrc = imgUrl + movie.poster_path;
            let ratings = movie.vote_average;
            let title = movie.title;
            let year = movie.release_date.slice(0,4);
            
            div.innerHTML += `
                <a href = "about.html">
                    <div class="card">
                    <img src="${imgSrc}" loading="lazy">
                    <h3>${title}</h3>
                    <div class="star-year">
                        <p><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><style>svg{fill:#fff220}</style><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg> ${ratings}</p>
                        <p class="year">${year}</p>
                    </div>
                    <div>
                </a>
            `;

            movieList.appendChild(div);
        });
    };
}

let carouselList = async () => {
    let response = await fetch("https://api.themoviedb.org/3/discover/movie?api_key=b92574e30ce5f872de6462b72d86654f&with_genres=16");
    let data = await response.json();
    return data.results;
}

const updateCarousel = async () => {
    const movieList = await carouselList();
        
    i = i % movieList.length;
    let movie = movieList[i];

    let img = `${imgUrl}${movie.backdrop_path}`;
    let title = movie.title;
    let ratings = movie.vote_average;
    let year = movie.release_date.slice(0,4); 
    let desc = movie.overview;

    carouselBg.style.backgroundImage = `linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(255,255,255,0) 100%), url('${img}')`;
    carouselBox.innerHTML = `  
        <h2 class="movie-title">${title}</h2>
        <div class="ratings">
            <p>${year}</p>
            <p><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><style>svg{fill:#fff220}</style><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg> ${ratings}</p>
        </div>
        <p class="carousel-genre"><span>Genre</span></p>
        <p>${desc}</p>
        <button class="carousel-btn">Watch Now</button>
    `;
    i++;
}

updateCarousel();
generateCard();
setInterval(updateCarousel,5000);