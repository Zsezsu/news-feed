function clickOnTopNews(){
    const topNewsButton = document.querySelector("#top-news")
    topNewsButton.addEventListener('click', () => {
        console.log("These are the top news")
    })
}

clickOnTopNews();