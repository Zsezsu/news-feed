const eventListeners = {

    start(){
        this.createPagination(1);
        this.clickOnTopNews();
        this.clickOnNewest();
        this.clickOnJobs();
    },

    clickOnTopNews(){
        const topNewsButton = document.querySelector("#top-news");
        topNewsButton.addEventListener('click', eventListenerTopNews.bind(this));

        function eventListenerTopNews(e){
            this.changeActiveNavBar(e.currentTarget);
            this.clickOnPaginationButtons();
            this.loadTopNews(1);
        }
    },

    clickOnNewest(){
        const newestButton = document.querySelector("#newest");
        newestButton.addEventListener('click', eventListenerNewest.bind(this));

        function eventListenerNewest(e){
            this.changeActiveNavBar(e.currentTarget);
            console.log("newest!");
        }
    },

    clickOnJobs(){
        const jobsButton = document.querySelector("#jobs");
        jobsButton.addEventListener('click', eventListenerJobs.bind(this));

        function eventListenerJobs(e){
            this.changeActiveNavBar(e.currentTarget);
            console.log("jobs!");
        }
    },

    clickOnPaginationButtons(){
        let pageButtons = document.querySelectorAll(".page-link");
        for (let button of pageButtons){
            button.addEventListener('click', eventListenerPageButtons.bind(this));
        }

        function eventListenerPageButtons(e){
            debugger;
            let pageNumber = parseInt(e.currentTarget.getAttribute("data-page-number"));
            console.log(pageNumber)
            switch (pageNumber){
                case 1:
                    if (e.currentTarget.getAttribute('id') === 'next'){
                        pageNumber++
                        e.currentTarget.setAttribute('data-page-number', pageNumber)
                    }
                    break;
                case pageNumber > 1:
                    let pageDirection = e.currentTarget.getAttribute('id');
                    switch (pageDirection){
                        case 'prev':
                            pageNumber--;
                            break;
                        case 'next':
                            pageNumber++;
                            break;
                    }
            }
            console.log(pageNumber)
            this.loadTopNews(pageNumber);
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
        for (let element of news){
            cards += `
            <div class="card">
                <h6 class="card-header primary"><a href="${element['url']}">${element['title']}</a></h6>
                <div class="card-body">
                    <p class="card-text">${element['user']}</p>
                    <p class="card-text">${element['time_ago']}</p>
                </div>
            </div>
            `
        }
        return cards
    },

    changeActiveNavBar(e){
        let prevActiveButton = document.querySelector(".active")
        prevActiveButton.classList.remove("active");
        e.classList.add("active");
    },

    createPagination(pageNumber){
        let container = document.querySelector(".pagination-container");
        container.innerHTML = `
        <nav aria-label="Page navigation">
              <ul class="pagination">
                <li class="page-item"><a class="page-link" id="prev" data-page-number="${pageNumber}" href="#">Previous</a></li>
                <li class="page-item"><a class="page-link" id="next" data-page-number="${pageNumber}" href="#">Next</a></li>
              </ul>
        </nav>
        `
    }
}

eventListeners.start();

