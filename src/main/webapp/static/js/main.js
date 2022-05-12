const eventListeners = {

    start(){
        this.clickOnTopNews();
        this.clickOnNewest();
        this.clickOnJobs();
    },

    clickOnTopNews(){
        const topNewsButton = document.querySelector("#top-news");
        topNewsButton.addEventListener('click', eventListenerTopNews.bind(this));

        function eventListenerTopNews(e){
            this.changeActiveNavBar(e.currentTarget);
            this.createPagination();
            this.clickOnPaginationButtons();
            this.loadTopNews(1);
        }
    },

    clickOnNewest(){
        const newestButton = document.querySelector("#newest");
        newestButton.addEventListener('click', eventListenerNewest.bind(this));

        function eventListenerNewest(e){
            this.changeActiveNavBar(e.currentTarget);
            this.createPagination();
            console.log("newest!");
        }
    },

    clickOnJobs(){
        const jobsButton = document.querySelector("#jobs");
        jobsButton.addEventListener('click', eventListenerJobs.bind(this));

        function eventListenerJobs(e){
            this.changeActiveNavBar(e.currentTarget);
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

            if (pageNumber >= 1 && pageNumber <= 10) {
                let pageDirection = pressedPageButton.getAttribute('id');
                switch (pageDirection){
                    case 'prev':
                        if (pageNumber !== 1) {
                            pageNumber--;
                            changePageButtonsValue(pressedPageButton, otherPageButton, pageNumber)
                            this.loadTopNews(pageNumber);
                        }
                        break;
                    case 'next':
                        if (pageNumber !== 10) {
                            pageNumber++;
                            changePageButtonsValue(pressedPageButton, otherPageButton, pageNumber)
                            this.loadTopNews(pageNumber);
                        }
                        break;
                }
            }
        }

        function changePageButtonsValue(pressedPageButton, otherPageButton, pageNumber){
            pressedPageButton.setAttribute('data-page-number', pageNumber);
            otherPageButton.setAttribute('data-page-number', pageNumber);
            changePageNumberButtonsValue(pageNumber, "page-number-left");
            changePageNumberButtonsValue(++pageNumber, "page-number-middle");
            changePageNumberButtonsValue(++pageNumber, "page-number-right");
        }

        function changePageNumberButtonsValue(pageNumber, id){
            let secondPageNumber = document.querySelector(`#${id}`);
            secondPageNumber.setAttribute('data-value', pageNumber);
            secondPageNumber.innerHTML = pageNumber;
        }
    },

    async fetchTopNews(pageNumber= 1){
        const response = await fetch(`/api/top?page=${pageNumber}`);
        return await response.json();
    },

    async loadTopNews(pageNumber){
        const data = await this.fetchTopNews(pageNumber);
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

    changeActiveNavBar(e){
        let prevActiveButton = document.querySelector(".active")
        prevActiveButton.classList.remove("active");
        e.classList.add("active");
    },

    createPagination(){
        let container = document.querySelector(".pagination-container");
        container.classList.remove("hidden");
        container.innerHTML = `
        <nav aria-label="Page navigation">
              <ul class="pagination">
                <li class="page-item"><a class="page-link" id="prev" data-page-number="1">Previous</a></li>
                <li class="page-item"><a class="page-link" id="page-number-left" data-value="1">1</a></li>
                <li class="page-item"><a class="page-link" id="page-number-middle" data-value="2">2</a></li>
                <li class="page-item"><a class="page-link" id="page-number-right" data-value="3">3</a></li>
                <li class="page-item"><a class="page-link" id="next" data-page-number="1">Next</a></li>
              </ul>
        </nav>
        `
    }
}

eventListeners.start();

