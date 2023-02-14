var TILES_ROOT = 'https://thallium.texty.org.ua/maps/destruction/'
const dictionary = {
    irpin: {"squares": "irpin", "tiles": "irpin", "coords": [50.5378718,30.26321411132813]},
    izum: {"squares": "izum", "tiles": "izum", "coords": [49.2050372,37.2680282]},
    novodru: {"squares": "novodru", "tiles": "novodru", "coords": [48.96219529451843,38.35492171347142]},
    dmytrivka: {"squares": "dmytrivka", "tiles": "dmytrivka", "coords": [50.4706167956567,30.209312438964847]},
}

var mymap = L.map('mymap', {
    gestureHandling: true
}
).setView([50.515150, 30.228960], 16);
mymap.scrollWheelZoom.disable();
// https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png
// http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}

L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 19,
    minZoom: 13,
    subdomains:['mt0','mt1','mt2','mt3'],
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mymap);


L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
    maxZoom: 12,
    minZoom: 6,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mymap);

var satelite = L.tileLayer('https://thallium.texty.org.ua/maps/destruction/irpin/{z}/{x}/{y}.webp', {
    maxZoom: 19,
    minZoom: 16,
    attribution: '© Planet.com'
})

satelite.addTo(mymap);


// L.tileLayer('https://thallium.texty.org.ua/maps/destruction/irpin/{z}/{x}/{y}.webp', {
//     maxZoom: 19,
//     minZoom: 16,
//     attribution: '© Planet.com'
// }).addTo(map);

var south_west = L.latLng(50.415150, 30.178960),
    north_east = L.latLng(50.535150, 30.238960);
var bounds = L.latLngBounds(south_west, north_east);

// map.setMaxBounds(bounds);
// map.on('drag', function() {
//     map.panInsideBounds(bounds, { animate: true });
// });

var exteriorStyle = {
    weight: 3,
    fillOpacity: 0,
    opacity: 0.7,
    fillColor: "#00FF00",
    color: "red"
   
};


/* полігон з окупованими територіями */
$.getJSON("data/rects/reprojected/grid_all.geojson", function(military){
    geoJsonLayer = L.geoJson(military, { } );     
         mymap.addLayer(geoJsonLayer);
         geoJsonLayer.setStyle(exteriorStyle);
 });
 

function flyToLocation(dataValue){
    
    // mymap.removeLayer(geoJsonLayer);
    //mymap.removeLayer(satelite)

    // $.getJSON("data/rects/reprojected/" + dictionary[dataValue].squares + ".geojson", 
    //     function(military){
    //         geoJsonLayer = L.geoJson(military, { 
    //             style: function(){ return exteriorStyle }
    //         });
    //         geoJsonLayer.setStyle(exteriorStyle) 
    //         mymap.addLayer(geoJsonLayer);
    //     });

    // satelite = L.tileLayer(TILES_ROOT + dictionary[dataValue].tiles  + '/{z}/{x}/{y}.webp', {
    //     maxZoom: 19,
    //     minZoom: 16,
    //     attribution: '© Planet.com'
    // })
    // satelite.addTo(mymap);


    mymap.flyTo(dictionary[dataValue].coords, 12);
}






//    map.on("zoom", function(){
//     console.log(map.getZoom())
//    })

// mymap.on('click', function(e){
//     var coord = e.latlng;
//     var lat = coord.lat;
//     var lng = coord.lng;
//     console.log(lat + "," + lng);
//     });

