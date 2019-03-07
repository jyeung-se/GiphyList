document.addEventListener("DOMContentLoaded", () => {

  const portal = 'AqKfwVr9s1p2Dfo1k95y3w5N8P96eGoX&limit=50'

  const modal = document.getElementById("myModal")
  const img = document.getElementsByClassName("gif-image")
  const modalImg = document.getElementById("img-item")

  const firstButton = document.getElementById("first")
  const previousButton = document.getElementById("previous")
  const nextButton = document.getElementById("next")
  const lastButton = document.getElementById("last")

  fetchGiphys = () => {
    fetch(`http://api.giphy.com/v1/gifs/trending?api_key=${portal}`)
    .then(res => res.json())
    .then(json => {
      let giphyStorage = json.data

      calcNumOfPages = () => {
        return Math.ceil(giphyStorage.length / numGifsDisplayed)
      }

      let displayTenGifList = []
      let currentPage = 1
      let numGifsDisplayed = 10
      let numOfPages = calcNumOfPages()

      firstPage = () => {
        currentPage = 1
        showList()
      }

      nextPage = () => {
        currentPage += 1
        showList()
      }

      previousPage = () => {
        currentPage -= 1
        showList()
      }

      lastPage = () => {
        currentPage = numOfPages
        showList()
      }

      showList = () => {
        document.getElementById("giphy-list").innerHTML = ""

        let start = ((currentPage - 1) * numGifsDisplayed)
        let end = start + numGifsDisplayed

        displayTenGifList = giphyStorage.map(gifData => `<img class="gif-image" id="${gifData.title}" src="${gifData.images.original.url}" onclick="document.getElementById('img-item').src='${gifData.images.original.url}'; document.getElementById('myModal').style.display='block'">`).slice(start, end)

        createList()
        statusCheck()
      }

      createList = () => {
        for (let i = 0; i < displayTenGifList.length; i++) {
          // const img = document.getElementById(`gif-${i+1}`)
          // img ? img.style.display = "none" : false
          document.getElementById("giphy-list").innerHTML += displayTenGifList[i]
        }
      }

      statusCheck = () => {
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

    modal.onclick = () => {
      modal.style.display = "none"
    }

    fetchGiphys()
  })
