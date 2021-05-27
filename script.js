require([
  "esri/views/MapView",
  "esri/WebMap",
  "esri/widgets/Expand",
  "esri/widgets/Legend",
  "esri/widgets/Compass",
  "esri/widgets/BasemapGallery"
], function(MapView, WebMap, Expand, Legend, Compass, BasemapGallery) {
  
  const webmap = new WebMap({
    portalItem: {
      id: "245d299f83de4bc1b43fe18ae23dbabf"
    }
  })
  
  const view = new MapView({
    map: webmap,
    container: "viewDiv"
  })

  const compass = new Compass({
    view: view
  })
  view.ui.add(compass, "top-left")

  const basemaps = new BasemapGallery({
    view: view,
    container: document.createElement("div")
  })
  const basemapsExpand = new Expand({
    view: view,
    content: basemaps,
    expandTooltip: "Basemap Gallery",
    group: "widgets"
  })
  view.ui.add(basemapsExpand, "top-left")
  
  const legend = new Legend({
    view: view,
    container: document.createElement("div")
  })
  const legendExpand = new Expand({
    view: view,
    content: legend,
    expandTooltip: "Legend",
    group: "widgets"
  })
  view.ui.add(legendExpand, "bottom-left")

  const selectExpand = new Expand({
    view: view,
    content: document.getElementById("scenario-container"),
    expanded: true,
    expandTooltip: "Scenarios",
    group: "widgets"
  })
  view.ui.add(selectExpand, "bottom-right")
  
  
const mapScenarioInputs = document.querySelectorAll("input[type=radio][name='map-scenario']")
mapScenarioInputs.forEach(radio => radio.addEventListener("change", () => {
  view.map.layers.map(function(lyr){
            console.log(lyr.title);
            lyr.visible = false;
          });
  let checkedLayerName = getCheckedRadioValue(mapScenarioInputs)
  // console.log(view.map.layers)
  
  let checkedLayer = webmap.allLayers.find(function(layer) {
    return layer.title === checkedLayerName;
  });
  console.log(checkedLayer.title)
  checkedLayer.visible = true
  console.log(checkedLayer.visible)
}))
  
  
})



function getCheckedRadioValue(selectors) {
  let checkedName;
  selectors.forEach(selector => {
    if (selector.checked) {
      checkedName = selector.value
    }
  })
  return checkedName
}