document.addEventListener("DOMContentLoaded", () => {

  console.log("Hello Giphy Lovers")

  let giphyStorage = {}
  const giphyContainer = document.getElementById('giphy-container')

  const loadGiphys = () => {
    giphyContainer.style.display = 'block'
  }


  const showImg = (src) => {
    let img = document.createElement("img")
    img.src = src
    img.width = 250
    img.height = 250
    document.body.appendChild(img)
  }

  const fetchGiphys = () => {
    fetch('http://api.giphy.com/v1/gifs/trending?api_key=AqKfwVr9s1p2Dfo1k95y3w5N8P96eGoX&limit=10')
    .then(res => res.json())
    .then(json => {
      giphyStorage = json.data
      console.log(giphyStorage)
      giphyStorage.map((gif) => showImg(gif.images.original.url) && gifList.push(gif.images.orginal.url))
      }
    )
  }

  // const fetchGiphys = () => {
  //   fetch('http://api.giphy.com/v1/gifs/trending?api_key=AqKfwVr9s1p2Dfo1k95y3w5N8P96eGoX&limit=10')
  //   .then(res => res.json())
  //   .then(json => {
  //     giphyStorage = json.data
  //     console.log(giphyStorage)
  //     }
  //   )
  // }

  let gifList = new Array()
  let pagelist = new Array()
  let currentPage = 1
  let numGifsDisplayed = 10
  let numOfPages = 1

  const calcNumOfPages = () => {
    return Math.ceil(gifList.length / numGifsDisplayed)
  }

  fetchGiphys()
  numOfPages = calcNumOfPages()
  console.log(gifList)
  console.log(numOfPages)

})
