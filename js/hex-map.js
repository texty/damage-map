const powScale = d3.scalePow()
            .exponent(2)
            .domain([0, 1])
            .range([0, 1]);

 function getRGB(str){
            var match = str.match(/rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/);
            return match ? [ +match[1], +match[2], +match[3]]
            : {};
            }

        var color = d3.scaleLinear()
            .domain([10, 20, 30, 35, 45])
            .range(["#eee1e1", "#f0b8b9", "#e67c7d", "#c44b4d", "#ac2123"]);

        var color2 = d3.scaleLinear()
            .domain([10, 20, 30, 35, 45])
            .range(["#eee1e1", "#f0b8b9", "#e67c7d", "#c44b4d", "#ac2123"]);


mapboxgl.accessToken = 'pk.eyJ1IjoiZXZnZXNoYWRyb3pkb3ZhIiwiYSI6ImNqMjZuaGpkYTAwMXAzMm5zdGVvZ2c0OHYifQ.s8MMs2wW15ZyUfDhTS_cdQ';

var { MapboxLayer, HexagonLayer, MapboxLayer, ScatterplotLayer, H3HexagonLayer } = deck;

//Create the Mapbox map
var map = new mapboxgl.Map({
    container: 'map',
    style: 'data/osm_liberty.json',
    center: [ 39.1, 48.5],
    zoom: 10,
    pitch: 60,
    minZoom: 8,
    maxZoom: 11,

    antialias: true
});

map.on("wheel", event => {
    if (event.originalEvent.ctrlKey) {
        return;
    }

    if (event.originalEvent.metaKey) {
        return;
    }

    if (event.originalEvent.altKey) {
        return;
    }

    event.preventDefault();
});


var hexagonLayer;

//Add the deck.gl Custom Layer to the map once the Mapbox map loads
map.on('load', () => {
    const firstLabelLayerId = map.getStyle().layers.find(layer => layer.type === 'symbol').id;



      var h3_layer = map.addLayer(new MapboxLayer({
        id: 'h3',
        type: H3HexagonLayer,
        data: 'https://raw.githubusercontent.com/samoylich/damage_map_data/main/lugansk_9.json', 
        pickable: true,
        elevationScale: 2.5,
        extruded: true,
        filled: true,
        

        getElevation: d => powScale(d.count),
        getFillColor: d => getRGB(color2(d.count)),
        getHexagon: d => d.hex,
        wireframe: false,
        pickable: true,
        visible: true,
        opacity: 1,
        //onClick: (info, event) => console.log('пошкоджено:', info.object.count),
        onClick: function(info, event){
            if(info.color != null && info.object.count > 0){
                showTooltip(info)
            } else {
                d3.select('#tooltip')
            }
           
        },
       
    
      }), firstLabelLayerId);

    });



function showTooltip(info){
    console.log(info)
        d3.select('#tooltip')
          .style('top', info.y +"px")
          .style('left', info.x +"px")
          .style('opacity', 1)
        //   .style('opacity', 1)
          .html(`пошкоджено: ${info.object.count.toFixed(1)} %`);


          setTimeout(function(){d3.select('#tooltip').style('opacity', 0)}, 1000);
     
      }