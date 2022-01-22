const container = document.querySelector(".container")
const favorites = [3, 4, 5]

//* Aqui agregamos nuestro fetch
async function fillMovies(movies) {
  for await (const id of favorites) {
    let res = await fetch("http://localhost:3031/api/movies/" + id)
    let info = await res.json()
    movies.push(info.data)
  }
  return movies
}

//* Codigo que usaremos para mostrar los datos en el frontend
function renderFavorites(movies) {
  if (movies.length === 0) {
    container.innerText = "Aqui no hay nada :c"
    return
  }

  movies.forEach(movie => {
    const card = document.createElement("div")
    card.setAttribute("class", "card")
  
    const h1 = document.createElement("h1")
    h1.textContent = movie.title
  
    const p = document.createElement("p")
    p.textContent = `Rating: ${movie.rating}`
  
    const duracion = document.createElement("p")
    duracion.textContent = `Duración: ${movie.length}`
  
    container.appendChild(card)
    card.appendChild(h1)
    card.appendChild(p)
    if (movie.genre !== null) {
      const genero = document.createElement("p")
      genero.textContent = `Genero: ${movie.genre.name}`
      card.appendChild(genero)
    }
    card.appendChild(duracion)
  })
}

async function main() {
  const movies = []
  try {
    await fillMovies(movies)
    renderFavorites(movies)
  } catch (error) {
    console.error(error);
  }
}


main()