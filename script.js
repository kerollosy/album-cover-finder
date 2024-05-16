const album_name = document.getElementById("album-name");
const album_container = document.getElementById("album-cover");

album_name.addEventListener("keypress", (keypress) => {
    if (keypress.key == "Enter") {
        fetch(`https://itunes.apple.com/search?term=${encodeURI(album_name.value)}&country=US&media=music&entity=album&limit=1`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error retrieving album artwork.');
                }
            })
            .then(data => {
                if (data.results.length > 0) {
                    const artworkUrl = data.results[0].artworkUrl100.replace("100x100", "500x500");
                    const imgElement = "<img src=" + artworkUrl + ">";
                    album_container.innerHTML = imgElement;
                } else {
                    throw new Error(`Couldn't find the album "${album_name.value}"`);
                }
            })
            .catch(error => {
                album_container.innerHTML = "Error: " + error.message;
            });
    }
});