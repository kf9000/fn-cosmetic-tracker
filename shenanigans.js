function getData(url, cb) {
    fetch(url)
        .then(response => response.json())
        .then(result => cb(result));
}

function createDivs(list, type) {
    list.forEach(function(items) {
        let elementDiv = document.createElement("div");
        //name
        let name = document.createElement("p");
        if(type !== "tracks"){
            name.textContent = items.type.displayValue +": " + items.name;
        }
        else{
            name.textContent = "Track: " + items.artist + " - " + items.title;
        }

        //img
        let image = document.createElement("img");
        if(type === "brItems"){
            image.src = items.images.smallIcon;
        }
        else if(type === "tracks"){
            image.src = items.albumArt;
        }
        else{
            image.src = items.images.small;
        }

        elementDiv.appendChild(image);
        elementDiv.appendChild(name);

        elementDiv.className = type;
        document.querySelector(".names").appendChild(elementDiv)
    });
}

getData("https://fortnite-api.com/v2/shop", (data) => {
    const brItems = []
    const tracks = []
    const carParts = []
    const instruments = []
    data.data.entries.forEach(function(obj) {
        if(obj.brItems !== undefined){
            obj.brItems.forEach(function(items) {
                brItems.push(items)
            });
        }
        else if(obj.tracks !== undefined){
            obj.tracks.forEach(function(items) {
                tracks.push(items)
            });
        }
        else if(obj.cars !== undefined){
            obj.cars.forEach(function(items) {
                carParts.push(items)
            });
        }
        else{
            obj.instruments.forEach(function(items) {
                instruments.push(items)
            });
        }
    });
    tracks.sort((a, b) => a.artist.localeCompare(b.artist));
    brItems.sort((a,b) => a.type.displayValue.localeCompare(b.type.displayValue));
    createDivs(brItems, "brItems");
    createDivs(tracks, "tracks");
    createDivs(carParts, "carParts");
    createDivs(instruments, "instruments");
});


