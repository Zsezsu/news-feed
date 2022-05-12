const eventListeners = {

    start(){
        this.clickOnTopNews();
        this.clickOnNewest();
        this.clickOnJobs();
    },

    clickOnTopNews(){
        const topNewsButtons = document.querySelectorAll(".top-news");
        for (let topNewsButton of topNewsButtons) {
            topNewsButton.addEventListener('click', eventListenerTopNews.bind(this));
        }

        function eventListenerTopNews(){
            this.changeActiveNavBar(document.querySelector("#top-news"));
            this.createPagination();
            this.clickOnPaginationButtons();
            this.loadNews("top", 1);
        }
    },

    clickOnNewest(){
        const newestButtons = document.querySelectorAll(".newest-news");
        for (let newestButton of newestButtons){
            newestButton.addEventListener('click', eventListenerNewest.bind(this));
        }

        function eventListenerNewest(){
            this.changeActiveNavBar(document.querySelector("#newest-news"));
            this.createPagination();
            this.clickOnPaginationButtons();
            this.loadNews("newest", 1);
        }
    },

    clickOnJobs(){
        const jobsButtons = document.querySelectorAll(".jobs");
        for (let jobsButton of jobsButtons){
            jobsButton.addEventListener('click', eventListenerJobs.bind(this));
        }

        function eventListenerJobs(){
            this.changeActiveNavBar(document.querySelector("#jobs"));
            this.createPagination();
            console.log("jobs!");
        }
    },

    clickOnPaginationButtons(){
        let pageButtons = document.querySelectorAll(".page-link");
        for (let button of pageButtons){
            button.addEventListener('click', eventListenerPageButtons.bind(this));
        }

        function eventListenerPageButtons(e){
            let pageNumber = parseInt(e.currentTarget.getAttribute("data-page-number"));
            let pressedPageButton = e.currentTarget;
            let otherPageButton = (e.currentTarget.getAttribute('id') === 'next') ? document.querySelector("#prev") :
                document.querySelector("#next");
            let activeSite = document.querySelector(".active-site").getAttribute("data-name");

            if (pageNumber >= 1 && pageNumber <= 10) {
                let pageDirection = pressedPageButton.getAttribute('id');
                switch (pageDirection){
                    case 'prev':
                        if (pageNumber > 1) {
                            pageNumber--;
                            changePageButtonsValue(pressedPageButton, otherPageButton, pageNumber);
                            this.loadNews(activeSite, pageNumber);
                        }
                        break;
                    case 'next':
                        if (pageNumber < 10) {
                            pageNumber++;
                            changePageButtonsValue(pressedPageButton, otherPageButton, pageNumber);
                            this.loadNews(activeSite, pageNumber);
                        }
                        break;
                }
            }
        }

        function changePageButtonsValue(pressedPageButton, otherPageButton, pageNumber){
            pressedPageButton.setAttribute('data-page-number', pageNumber);
            otherPageButton.setAttribute('data-page-number', pageNumber);
        }
    },

    async fetchNews(site="top", pageNumber= 1){
        const response = await fetch(`/api/${site}?page=${pageNumber}`);
        return await response.json();
    },

    async loadNews(site, pageNumber){
        const data = await this.fetchNews(site, pageNumber);
        let container = document.querySelector(".card-container");
        container.innerHTML = this.renderCards(data);
    },

    renderCards(news){
        let cards = "";
        let cardsInARow = "";
        for (let i = 0; i < news.length; i++) {
            cardsInARow += createCards(news[i]);
            if ((i+1) % 3 === 0){
                let rowContainer = `<div class="row card-container">${cardsInARow}</div>`;
                cards += rowContainer;
                cardsInARow = "";
            }
        }
        return cards

        function createCards(news){
            return `
            <div class="card col">
                <h6 class="card-header primary"><a href="${news['url']}" target="_blank">${news['title']}</a></h6>
                <div class="card-body">
                    <p class="card-text">${news['user']}</p>
                    <p class="card-text">${news['time_ago']}</p>
                </div>
            </div>
            `
        }
    },

    changeActiveNavBar(element){
        let prevActiveButton = document.querySelector(".active");
        prevActiveButton.classList.remove("active");
        prevActiveButton.classList.remove("active-site");
        element.classList.add("active");
        element.classList.add("active-site");
    },

    createPagination(){
        let container = document.querySelector(".pagination-container");
        container.classList.remove("hidden");
        container.innerHTML = `
        <nav aria-label="Page navigation">
              <ul class="pagination">
                <li class="page-item"><a class="page-link" id="prev" data-page-number="1">Previous</a></li>
                <li class="page-item"><a class="page-link" id="next" data-page-number="1">Next</a></li>
              </ul>
        </nav>
        `
    }
}

eventListeners.start();

