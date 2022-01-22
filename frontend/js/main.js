const container = document.querySelector(".container")

//* Aqui agregamos nuestro fetch
let peliculas
fetch("http://localhost:3031/api/movies")
  .then(response => response.json())
  .then(info => renderMovies(info.data))
  .catch(err => console.error(err))


//* Codigo que usaremos para mostrar los datos en el frontend
function renderMovies(movies) {
  movies.forEach((movie) => {
    const card = document.createElement("div")
    card.setAttribute("class", "card")
    card.setAttribute("id", movie.id)
  
    const h1 = document.createElement("h1")
    h1.textContent = movie.title
  
    const p = document.createElement("p")
    p.textContent = `Rating: ${movie.rating}`
  
    const duracion = document.createElement("p")
    duracion.textContent = `Duración: ${movie.length}`
  
    container.appendChild(card)
    card.appendChild(h1)
    card.appendChild(p)
    if (movie.genre) {
      const genero = document.createElement("p")
      genero.textContent = `Genero: ${movie.genre.name}`
      card.appendChild(genero)
    }
    card.appendChild(duracion)
  })
}
