mapboxgl.accessToken = mapToken;
console.log("I am map");
console.log(listing.geometry.coordinates);

const map = new mapboxgl.Map({
    container: 'map', // container ID
    // style : "mapbox://styles/mapbox/streets-v12",
    center: listing.geometry.coordinates, // starting position [lng, lat]
    zoom: 10 // starting zoom
});

    // Create a default Marker, colored black, rotated 45 degrees.
const marker = new mapboxgl.Marker({ color: 'red' })
    .setLngLat(listing.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ closeOnClick: false })
        .setHTML(`<h5>${listing.title}(${listing.location})</h5><p>Exact location provided after booking</p>`)
    )
    .addTo(map);

    