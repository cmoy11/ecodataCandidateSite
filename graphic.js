import * as d3 from "https://cdn.skypack.dev/d3@7";

const div = d3.selectAll("div");
// console.log("hi");


// import mapData from "../data/map.json";
const mapData = d3.json("../data/map.json");


console.log(mapData);

const drawMap = async (ElecJson) => {
    // step 1: access data
    // console.log(ElecJson.features);

  
    // // index = District
    // const getDistrict = feature => (feature.properties.number)
    // console.log(getDistrict(ElecJson.features[0]))
  
    // const getText = feature => (feature.properties.text)
  
    const getAffiliation = feature => (feature.properties.Affiliation);
    const affiliationToColor = new Map();
    affiliationToColor.set("Democrat", "blue")
    affiliationToColor.set("Republican", "red")
    affiliationToColor.set("Unaligned", "gray")
  
    const figure = d3.select("figure");
    const mapHeight = 500;
    // const mapWidth = figure.node().clientWidth;
    const mapWidth = 800;
    const margin = ({top: 10, right: 10, bottom: 10, left: 10});
  
      // switch to .geoMercator() and delete rotate
    const projection =  d3.geoMercator()
        .fitSize([mapWidth, mapHeight], ElecJson);
    const path = d3.geoPath().projection(projection);
  
  
    // may look better if layed on top of a michigan county map and then districts are colored translucently
    {
      // set up
      const svg = figure.append("svg")
          .attr("width", mapWidth + margin.left + margin.right)
          .attr("height", mapHeight + margin.top + margin.bottom);
          // .style("background-color", "lightgrey");
    
      const g = svg.append("g")
          .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
      // draw one svg path per district code
      g.selectAll("path")
        .data(ElecJson.features)
        .join("path")
          .attr("d", path)
          .attr("fill-opacity","0.7")
          .attr("fill", d => affiliationToColor.get(getAffiliation(d)))
          .attr("stroke", "white")
          .attr("stroke-width", 2);
    
      return svg.node();
    }

  }

  drawMap(mapData);