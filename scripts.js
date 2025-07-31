const { createApp } = Vue;

createApp({
    data() {
        return {
            items: {},
            debugEnabled: false
        }
    },
    created() {
        fetch("./items.json")
            .then(res => res.ok ? res.json() : Promise.reject(`HTTP error: ${res.status}`))
            .then(data => {
                this.items = data;
                this.debugEnabled = data.debugMode ?? false;

                // Add isRevealed check for each item
                this.items.cats = this.items.cats.map((cat) => {
                    return {
                        "name": cat.name,
                        "items": cat.items.map((item) => {
                            return {
                                "name": item.name,
                                "src": item.src,
                                "isRevealed": false
                            }
                        })
                    }
                })
            })
            .catch(error => console.error("Unable to fetch data:", error));
    }
}).mount('#app');