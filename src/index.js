document.addEventListener("DOMContentLoaded", () => {

  const portal = 'AqKfwVr9s1p2Dfo1k95y3w5N8P96eGoX&limit=50'

  const fetchGiphys = () => {
    fetch(`http://api.giphy.com/v1/gifs/trending?api_key=${portal}`)
    .then(res => res.json())
    .then(json => {
      let giphyStorage
      giphyStorage = json.data
      for (let i = 0; i < giphyStorage.length; i++) {

        const modal = document.getElementById("myModal")
        const img = document.getElementsByClassName("gif-image")
        const modalImg = document.getElementById("img-item")
        const clickedImg = document.getElementById(giphyStorage[i].title)

        // console.log(giphyStorage[i].images.original.url);
        console.log(giphyStorage[i].title);
        img.onclick = () => {
          let modalGif = document.createElement("img")
          let modalGifParent = document.getElementsByClassName("modal-content")
          modalGif.src = `${giphyStorage[i].images.original.url}`
          modalGifParent.appendChild(modalGif)

          modal.style.display = "block"
          // modalImg.src = this.src
        }

        modal.onclick = () => {
          modal.style.display = "none"
        }

        // let detail = `
        //   <img class="gif-image" id="gif-${i+1}" src="${giphyStorage[i].images.original.url}">
        // `
      }

      let calcNumOfPages = () => {
        return Math.ceil(giphyStorage.length / numGifsDisplayed)
      }

    let displayTenGifList = []
    let currentPage = 1
    let numGifsDisplayed = 10
    let numOfPages = calcNumOfPages()

    const firstPage = () => {
      currentPage = 1
      showList()
    }

    const nextPage = () => {
      currentPage += 1
      showList()
    }

    const previousPage = () => {
      currentPage -= 1
      showList()
    }

    const lastPage = () => {
      currentPage = numOfPages
      showList()
    }

    const showList = () => {
      const modal = document.getElementById("myModal")
      const img = document.getElementsByClassName("gif-image")

      document.getElementById("giphy-list").innerHTML = ""

      let start = ((currentPage - 1) * numGifsDisplayed)
      let end = start + numGifsDisplayed

      displayTenGifList = giphyStorage.map(gifData => `<img class="gif-image" id="${gifData.title}" src="${gifData.images.original.url}" onclick="document.getElementById('img-item').src='${gifData.images.original.url}'">`).slice(start, end)

      createList()
      statusCheck()
    }

    const createList = () => {
      for (let i = 0; i < displayTenGifList.length; i++) {
        // const img = document.getElementById(`gif-${i+1}`)
        // img ? img.style.display = "none" : false
        document.getElementById("giphy-list").innerHTML += displayTenGifList[i]
      }
    }

    const firstButton = document.getElementById("first")
    const previousButton = document.getElementById("previous")
    const nextButton = document.getElementById("next")
    const lastButton = document.getElementById("last")

    const statusCheck = () => {
      firstButton.disabled = currentPage == 1 ? true : false
      previousButton.disabled = currentPage == 1 ? true : false
      nextButton.disabled = currentPage == numOfPages ? true : false
      lastButton.disabled = currentPage == numOfPages ? true : false
    }

    firstButton.onclick = () => {
      firstPage()
    }

    previousButton.onclick = () => {
      previousPage()
    }

    nextButton.onclick = () => {
      nextPage()
    }

    lastButton.onclick = () => {
      lastPage()
    }

    showList()
    })
  }

  
  fetchGiphys()
})
