// Global variables
var metadataResult = null;  // metadata for sample id - the first element of metadataArray
var otu_ids = null;         // the Operational Taxonomic Unit IDs associated with selected sample
var values = null;          // the count values of OTU sample IDs
var labels = null;          // the taxonomic names associated with the OTU IDs
var sortedBacteria = null;  // An array of the bacteria OTU IDs, sorted by count

// ================================================
// init()
// ======
// This is the main function in this module. It 
// uses the samples.json file to populate the
// Test Subject ID No. dropdown.
//
// Arguments:
// None
//
// Return:
// None
function init() {
  
  // Display Loading... while loading samples.json file
  d3.select("#status").text("Loading ...");
  // Load the samples data from the samples.json file using a JS Promise
  d3.json("samples.json").then((data) => {

    d3.select("#status").text("");
    samples_data = data;

    // Select the selector whose id is selDataset
    let selector = d3.select("#selDataset");

    // Retrieve the names from the samples data
    var sampleNames = samples_data["names"];

    // Populate the Test Subject ID No. selector with the names (ids) from samples data
    sampleNames.forEach((sample) => 
    {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Select the first item of the id selector and generate the corresponding tables and graphs
    optionChanged(sampleNames[0]);
  }, 1000);
}

// ================================================
// getSamplesData(sample)
// ================
// This function initializes the following global variables for the selected sample:
// metadata - all metadata
// metadataArray - metadata array with sample id - Only one item should be returned
// samples - all samples data
// samplesArray - samples data array with sample id - Only one item should be returned
// samplesResult - samples data for sample id - the first element of samplesArray
// otu_ids - the associated Operational Taxonomic Unit IDs
// values - the OTU sample IDs
// labels - the taxonomic names associated with the OTU IDs 

// Arguments:
// sample - the sample id of the selected sample
//
// Return:
// None

function getSampleData(sample) {
  // Retrive the metadata array from the samples data  
  let metadata = samples_data["metadata"]
  // Filter the metadata array only keeping members with the sample id of interest
  let metadataArray = metadata.filter(metadataObj => parseInt(metadataObj.id) === parseInt(sample));
  // Get the one and only metadata element for the sample id
  metadataResult = metadataArray[0];

  // Retrive the samples array from the samples data 
  let samples = samples_data["samples"];
  // Filter the samples array only keeping members with the sample id of interest
  let samplesArray = samples.filter(sampleObj => parseInt(sampleObj.id) === parseInt(sample));
  // Get the one and only samples element for the sample id
  let samplesResult = samplesArray[0];

  // Get the OTU IDs for the selected ID
  otu_ids = samplesResult.otu_ids;
  // Get the sample OTU values for the selected ID
  values = samplesResult.sample_values;
  // Get the OTU labels for the selected ID
  labels = samplesResult.otu_labels;
}


// ================================================
// optionChanges(newSample)
// ========================
// This function is invoked when the selected sample ID is changed. 
// 
// Argument:
// newSample - the id of the newly select sample
//
// Return:
// None

function optionChanged(newSample) {
  // Initialize the variables for the new sample id
  getSampleData(newSample);

  // Initialize the sortedBacteria array to null to enable
  // the lazy loading that occurs in getTopTen(), the function
  // that retains only the top ten most prevalent bacteria IDs
  // for the current sample.
  sortedBacteria = null;
  
  // Display the metadata for the current sample in the Demographic Info div
  buildMetadata();
  
  // Build the bar chart, the bubble chart, and the gauge chart
  buildCharts();
}

// ================================================
// buildMetadata()
// =====================
// This function takes the metadata of the current sample, metadataResult,
// and displays it in the Demographic Info div.
// 
// Arguments:
// None
//
// Return:
// None
function buildMetadata() {

    // Get the Demographic Info div
    let PANEL = d3.select("#sample-metadata");

    // Clear its contents
    PANEL.html("");
 
    // Repopulate it with the key: value pairs from the metadata of the current sample id
    Object.entries(metadataResult).forEach(([key,value]) => PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`)); 
    
}

// ================================================
// buildCharts()
// =============
// This function creates the bar chart, the bubble chart, and
// the gauge chart by calling barChart(), bubbleChart(), and
// gaugeChart().
//
// Arguments:
// None
//
// Return:
// None
function buildCharts() {
  // Display the bar chart
  barChart();
  // Display the bubble chart
  bubbleChart();
  // Display the gauge chart
  gaugeChart();
}

// ================================================
// sortBacteria()
// ==============
// The function sorts the array of bacteria for the current sample id
// in descending order.
//
// Arguments:
// None
//
// Returns:
// None
function sortBacteria() {
  // Create an empty bacteria json object 
  var bacteria = {};

  // Populate the json object where the keys are the OTU IDs and 
  // and array of [value, label] are the values.

  // Iterate through the OTU IDs of the current sample
  for(var i=0;i<otu_ids.length;i++){
    // Get the otu_id 
    otu_id = otu_ids[i];
    // Get the sample_values for the otu id
    value = values[i];
    // Get the labels values for the otu id
    label = labels[i];
    
    // Insert a new entry into the bacteria json object
    // key = OTU ID
    // value = [value,label]
    bacteria[otu_id] = [value,label];
  }
  
  // Convert the bacteria json object into an array and sort it 
  // based on the value (count).
  sortedBacteria = Object.entries(bacteria).sort((a,b) => b[1][0] - a[1][0]);
}


// ================================================
// getTopTen()
// ===========
// This function returns an array of 10 OTU IDs which 
// are the most numerous for the given sample 
// 
// Arguments:
// None
//
// Return:
// topTen - Array containing the labels and counts of the
// most numerous bacteria for the selected sample.
function getTopTen(){

  // Lazy load the sortedBacteria array
  if (!sortedBacteria) {
    sortBacteria();
  }

  // Initialize the topTen array to null
  var topTen = null;

  // If the sortedBacteria array is not empty
  if ( sortedBacteria.length > 0) {
    // set topTen equal to the first ten items of sortedBacteria.
    topTen = sortedBacteria.slice(0,10);
  }
  // Otherwise,
  else {
    // set topTen to the original bacteria array
    topTen = Object.entries(bacteria);
  }

  // return the topTen array
  return topTen;
}
// ================================================
// barChart()
// ==========
// This function creates a bar chart of the top ten
// most numerous bacteria for the current sample
// on the bar div.
//
// Arguments:
// None
//
// Return:
// None
function barChart() {
  
  // Get the top ten most numerous bacteria for the 
  // current sample.
  topTen = getTopTen();

  // Set the y values to "OTU &lt;OTU_ID&gt;" and reverse
  // the sort order to ascending
  let yArr = topTen.map(item => `OTU ${item[0]}`).reverse();
  // Set the x values to the count values
  let xArr = topTen.map(item => item[1][0]).reverse();
  // Set the hover text to the label values
  let barText = topTen.map(item => item[1][1]).reverse();

  // Create the trace json object for the bar chart
  let trace = {
    x: xArr,
    y: yArr,
    type: "bar",
    orientation: "h",
    text: barText
  }

  data = [trace];

  // Create the layout json object for the bar chart
  layout = {
    title: "Top 10 Bacterial Species",
    xaxis: { title: "Count"},
    yaxis: { title: "Operational Taxonomic Unit"}
  }

  // Plot the bar chart
  Plotly.newPlot("bar",data,layout);
}

// ================================================
// bubbleChart()
// =============
// This function creates a bubble chart of all the OTU IDs 
// in the bubble div. 
// 
// Arguments:
// None
//
// Returns:
// None
function bubbleChart() {
  
  // Create the trace json object for the bubble chart
  let trace = {
    x: otu_ids,
    y: values,
    mode: 'markers',
    marker: {
      color: otu_ids,
      size: values
    },
    text: sortedBacteria.map(item => item[1][1])
  };
  
  var data = [trace];
  
  // Determine the maximum value on the y-axis in order to determine
  // the range of the y-axis that would fully display the bubbles
  let maxval = 0; // all values are greater than or equal to 0
  values.forEach(val => {
    if (val > maxval) {
      maxval = val;
    }
  });
  
  // Create the layout json object for the bubble chart
  let layout= {
      title: 'Operational Taxonomic Unit Distribution',
      showlegend: false,
      yaxis: { title: "Count"},
      xaxis: { title: "OTU ID"}
    };

  // Set the y-axis range to be three times the maximum value
  // of the bubbles to ensure that all bubbles are fully displayed
  if ( maxval > 100 ) {
    layout["height"] = maxval * 3;
  }

  // Plot the bubble chart
  Plotly.newPlot('bubble', data, layout);
}

// ================================================
// gaugeChart()
// ============
// This function creates a guage chart displaying the 
// weekly washing frequency of the current sample on 
// the gauge div.
//
// Arguments:
// None
//
// Returns:
// None
function gaugeChart() {

  // Create the data json object for the gauge chart
  let data = [
    {
      value: metadataResult.wfreq,
      title: { text: "Weekly Washing Frequency" },
      type: "indicator",
      mode: "gauge+number",
      shape: "bullet"
    }
  ];
  
  // Create the layout json object for the gauge chart
  let layout = { 
    width: 600, 
    height: 500, 
    margin: { t: 0, b: 0 } 
  };

  // Plot the gauge chart
  Plotly.newPlot('gauge', data, layout);
}  


// When this script loads, the init() function is called  
// to load the samples.json file and populate the Test 
// Subject ID No. dropdown.
init();
