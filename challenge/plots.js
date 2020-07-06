var metadata = null;
var resultArray = null;
var result = null;
var otu_ids = null;
var values = null;
var labels = null;
var metadataResult = null;
var samplesResult = null;
var samples_data;
var sorted_data;
var sortedBacteria;

// ================================================
function init() {
  console.log("Running init()");

  d3.json("samples.json").then((data) => {
    samples_data = data;
    let selector = d3.select("#selDataset");

    var sampleNames = samples_data["names"];
    sampleNames.forEach((sample) => 
    {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    console.log(sampleNames);

    optionChanged(sampleNames[0]);
  }, 1000);
}


function getSampleData(sample) {
  metadata = samples_data["metadata"]
  metadataArray = metadata.filter(metadataObj => parseInt(metadataObj.id) === parseInt(sample));
  metadataResult = metadataArray[0];

  samples = samples_data["samples"];
  samplesArray = samples.filter(sampleObj => parseInt(sampleObj.id) === parseInt(sample)); 
  samplesResult = samplesArray[0];

  otu_ids = samplesResult.otu_ids;
  values = samplesResult.sample_values;
  labels = samplesResult.otu_labels;
}


// ================================================
function optionChanged(newSample) {
  getSampleData(newSample);
  sortedBacteria = null;
   
  buildMetadata(newSample);
  buildCharts(newSample);
}

// ================================================
function buildMetadata(sample) {
  // d3.json("samples.json").then((data) => {

    var PANEL = d3.select("#sample-metadata");

    PANEL.html("");
 
    Object.entries(metadataResult).forEach(([key,value]) => PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`)); 
    
  // });
}

// ================================================
function buildCharts(sampleId) {
  barChart();
  bubbleChart();
  gaugeChart(sampleId);
}

// ================================================
function sortBacteria() {
  var bacteria = {};

  for(var i=0;i<otu_ids.length;i++){
    otu_id = otu_ids[i];
    value = values[i];
    label = labels[i];
    
    bacteria[otu_id] = [value,label];
  }
  
  sortedBacteria = Object.entries(bacteria).sort((a,b) => b[1][0] - a[1][0]);
}


// ================================================
function getTopTen(){
  if (!sortedBacteria) {
    sortBacteria();
  }

  var topTen = null;
  if ( sortedBacteria.length > 0) {
    topTen = sortedBacteria.slice(0,10);
  }
  else {
    topTen = Object.entries(bacteria);
  }

  return topTen;
}
// ================================================
function barChart() {
  
  topTen = getTopTen();

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
}

// ================================================
function bubbleChart() {
  
  var trace = {
    x: otu_ids,
    y: values,
    mode: 'markers',
    marker: {
      color: otu_ids,
      size: values
    }
  };
  
  var data = [trace];
  var maxval = 0; // all values are greater than or equal to 0
  values.forEach(val => {
    if (val > maxval) {
      maxval = val;
    }
  });
  
  let layout= {
      title: 'Operational Taxonomic Unit Distribution',
      showlegend: false,
      yaxis: { title: "Count"},
      xaxis: { title: "OTU ID"}
    };

  if ( maxval > 100 ) {
    layout["height"] = maxval * 3;
  }


  Plotly.newPlot('bubble', data, layout);
  
}

// ================================================
function gaugeChart() {

  var data = [
    {
      value: metadataResult.wfreq,
      title: { text: "Weekly Washing Frequency" },
      type: "indicator",
      mode: "gauge+number",
      shape: "bullet"
    }
  ];
  
  var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
  Plotly.newPlot('gauge', data, layout);
  
}  

init();