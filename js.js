const search = document.getElementById("search");
const ispis = document.getElementById("ispis");

function searchSong(query) {
  fetch("https://itunes.apple.com/search", {
   method: 'GET',
   mode: 'no-cors',
   datatype: "json",
  cache: 'no-cache',
  credentials: 'same-origin' ,

    headers: {
        'content-type': 'application/json'
    },

    // body: JSON.stringify(query)
  })

  .then(function (response) {
      return response.json();
    })
    .then(function (pjesma) {
      const filteredPjesme = pjesma.results.filter(function (data) {
        return (
          data.artistName.toLowerCase().includes(query.toLowerCase()) ||
          data.collectionName.toLowerCase().includes(query.toLowerCase()) ||
          data.trackName.toLowerCase().includes(query.toLowerCase()) ||
          data.artistViewUrl.toLowerCase().includes(query.toLowerCase())
        );
      });

      ispis.innerHTML = "";

      filteredPjesme.forEach(function (data) {
        const tr = document.createElement("tr");
        const th = document.createElement("th");
        const tdCollection = document.createElement("td");
        const tdTrack = document.createElement("td");
        const a = document.createElement("a");
        a.textContent = data.name;
        a.href = artistViewUrl;
        tdCollection.artistName = "Album: " + data.collectionName;
        tdTrack.textContent = "Pjesma " + data.trackName;
        th.appendChild(a);
        tr.appendChild(th);
        tr.appendChild(tdCollection);
        tr.appendChild(tdTrack);
        ispis.appendChild(tr);

      });
    })
    .catch(function (error) {
      console.error(error);
    });

}

search.addEventListener("input", function (event) {
  const query = event.target.value;

  searchSong(query);
});