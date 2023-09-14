const imgUrl ="https://image.tmdb.org/t/p/original";
const movieList = document.querySelector(".movie-list");

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
                <div class="card">
                    <img src="${imgSrc}" loading="lazy">
                    <h3>${title}</h3>
                    <div class="star-year">
                        <p>${ratings}</p>
                        <p class="year">${year}</p>
                    </div>
                <div>
            `;

            movieList.appendChild(div);
        });
    };
}

async function a() {
    let response = await fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=b92574e30ce5f872de6462b72d86654f");
    let data = await response.json();
    return data.results;
}

generateCard();
async function ab() {
    let poster = await a();
    console.log(poster);
    let mc = document.querySelector(".movie-container");
    let img = imgUrl + poster[5].backdrop_path;
    mc.style.backgroundImage = `linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(255,255,255,0) 100%), url('${img}')`;
    mc.innerHTML = `

    `;
}

ab();