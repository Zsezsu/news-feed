const eventListeners = {

    start(){
        this.clickOnTopNews();
        this.clickOnNewest();
        this.clickOnJobs();
    },

    clickOnTopNews(){
        const topNewsButton = document.querySelector("#top-news");
        topNewsButton.addEventListener('click', eventListenerTopNews.bind(this))

        async function eventListenerTopNews(e){
            this.changeActiveNavBar(e.currentTarget);
            const data = await this.fetchTopNews();
            console.log(data);
            let container = document.querySelector(".container");
            container.innerHTML = this.renderCards(data);
        }
    },

    clickOnNewest(){
        const newestButton = document.querySelector("#newest");
        newestButton.addEventListener('click', eventListenerNewest.bind(this))

        function eventListenerNewest(e){
            this.changeActiveNavBar(e.currentTarget);
            console.log("newest!");
        }
    },

    clickOnJobs(){
        const jobsButton = document.querySelector("#jobs");
        jobsButton.addEventListener('click', eventListenerJobs.bind(this))

        function eventListenerJobs(e){
            this.changeActiveNavBar(e.currentTarget);
            console.log("jobs!");
        }
    },

    async fetchTopNews(pageNumber=1){
        const response = await fetch(`/api/top?page=${pageNumber}`);
        return await response.json();
    },

    renderCards(news){
        let cards = "";
        for (let element of news){
            cards += `
            <div class="card">
                <h5 class="card-header primary"><a href="${element['url']}">${element['title']}</a></h5>
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
    }
}

eventListeners.start();

