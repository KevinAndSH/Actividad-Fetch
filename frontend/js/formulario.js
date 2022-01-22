const form = document.querySelector("form")
const createButton = document.querySelector(".botonCrear")
const editButton = document.querySelector(".botonEditar")

createButton.addEventListener("click", async e => {
  e.preventDefault()

  let movie = {}

  let data = new FormData(form)
  for (const entry of data.entries()) {
    movie[entry[0]] = entry[1]
  }

  await createNewMovie(movie)
  window.location.href = "/frontend/home.html"
})

editButton.addEventListener("click", async e => {
  e.preventDefault()

  let id = getID()
  let movie = {}

  let data = new FormData(form)
  for (const entry of data.entries()) {
    movie[entry[0]] = entry[1]
  }

  await editMovie(id, movie)
  window.location.href = "/frontend/home.html"
})


function getID() {
  let params = new URLSearchParams(window.location.search)
  let id = params.get("id")
  return id
}

function createNewMovie(movie) {
  fetch("http://localhost:3031/api/movies/create", {
    method: "POST",
    body: JSON.stringify(movie),
    headers:{
      'Content-Type': 'application/json'
    }
  })
}

function editMovie(id, movie) {
  fetch("http://localhost:3031/api/movies/update/" + id, {
    method: "PUT",
    body: JSON.stringify(movie),
    headers:{
      'Content-Type': 'application/json'
    }
  })
}

async function main(id) {
  if (!id) return

  let res = await fetch("http://localhost:3031/api/movies/" + id)
  let body = await res.json()
  let data = body.data
  let keys = Object.keys(data)

  keys.forEach(key => {
    let input = document.getElementById(key)
    if (input) {
      if (typeof data[key] === "string" && data[key].slice(-1) === "Z") {
        input.value = data[key].slice(0, 10)
      } else {
        input.value = data[key]
      }
    }
  })
}


//* Aquí empieza el script
main(getID())