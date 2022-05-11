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
            const data = await this.fetchTopNews();
            console.log(data);
        }
    },

    clickOnNewest(){
        const newestButton = document.querySelector("#newest");
        newestButton.addEventListener('click', ()=>{
            console.log("newest!");
        })
    },

    clickOnJobs(){
        const jobsButton = document.querySelector("#jobs");
        jobsButton.addEventListener('click', ()=>{
            console.log("jobs!");
        })
    },

    async fetchTopNews(pageNumber=1){
        const response = await fetch(`/api/top?page=${pageNumber}`);
        return await response.json();
    }
}

eventListeners.start();

