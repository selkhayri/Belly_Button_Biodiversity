function init() {
  var selector = d3.select("#selDataset");

  d3.json("samples.json").then((data) => {
    console.log(data);
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    optionChanged(sampleNames[0]);
})}

function optionChanged(newSample) {
  buildMetadata(newSample);
  buildCharts(newSample);
}

function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var PANEL = d3.select("#sample-metadata");

    PANEL.html("");
  
    Object.entries(result).forEach(([key,value]) => PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`)); 
    
  });
}

function buildCharts(sampleId) {
  d3.json("samples.json").then((data) => {
    var samples = data.samples;
    var resultArray = samples.filter(sampleObj => sampleObj.id == sampleId);
    var result = resultArray[0];

    var otu_ids = result.otu_ids;
    var values = result.sample_values;
    var labels = result.otu_labels;

    bacteria = {};
    for(var i=0;i<otu_ids.length;i++){
      otu_id = otu_ids[i];
      value = values[i];
      label = labels[i];
      
      bacteria[otu_id] = [value,label];
      
    }
    
    var sortedBacteria = Object.entries(bacteria).sort((a,b) => b[1][0] - a[1][0]);    

    var topTen = null;
    if ( sortedBacteria.length > 0) {
      topTen = sortedBacteria.slice(0,10);
    }
    else {
      topTen = Object.entries(bacteria);
    }

  
    var yArr = topTen.map(item => `OTU ${item[0]}`).reverse();
    var xArr = topTen.map(item => item[1][0]).reverse();
    var barText = topTen.map(item => item[1][1]).reverse();

    // plot
    var trace = {
      x: xArr,
      y: yArr,
      type: "bar",
      orientation: "h",
      text: barText
    }

    console.log(trace);

    data = [trace];

    layout = {
      title: "Top 10 Bacterial Species",
      xaxis: { title: "Count"},
      yaxis: { title: "Operational Taxonomic Unit"}
    }

    Plotly.newPlot("bar",data,layout);

  });
}

init();