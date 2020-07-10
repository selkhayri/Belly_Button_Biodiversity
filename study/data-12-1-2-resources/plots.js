Plotly.newPlot("plotArea", [{x: [5,10,15], y: [10,20,30]}]);
Plotly.newPlot("plotArea2", [{x: [5,30,20], y: [30,20,5]}]);

var trace = [{
    x: ["burrito", "pizza", "chicken"],
    y: [10, 18, 5],
    type: "bar"
}];

Plotly.newPlot("plotArea3", trace);

var trace2 = {
    x: ["burrito", "pizza", "chicken"],
    y: [10, 18, 5],
    type: "bar"
};

var layout2 = {
    title: "Luncheon Survey",
    xaxis: {title: "Food Option"},
    yaxis: {title: "Number of Respondents"}
};

Plotly.newPlot("plotArea4", [trace2], layout2);

// 12.1.3 Challenge
var trace3 = {
    x: ["nonalcoholic beer", "nonalcoholic wine", "nonalcoholic martini", "nonalcoholic margarita", "ice tea", "nonalcoholic rum & coke", "nonalcoholic mai tai", "nonalcoholic gin & tonic"],  // Drinks
    y: [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6], // Percent consumption
    type: "bar"
};

var layout3 = {
    title: "Beverage Orders",
    xaxis: {title: "Drink Options"},
    yaxis: {title: "Percentage Consumption"}
};

Plotly.newPlot("plotArea5", [trace3], layout3);

// var trace4 = {
//     x: ["nonalcoholic beer", "nonalcoholic wine", "nonalcoholic martini", "nonalcoholic margarita",
//        "ice tea", "nonalcoholic rum & coke", "nonalcoholic mai tai", "nonalcoholic gin & tonic"],
//     y: [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6],
//     type: "pie"
//   };
//   var data4 = [trace4];
//   var layout4 = {
//     title: "'Bar' Chart"
//   };
// Plotly.newPlot("plotArea6", data4, layout4);
  
var trace5 = {
    labels: ["nonalcoholic beer", "nonalcoholic wine", "nonalcoholic martini", "nonalcoholic margarita",
        "ice tea", "nonalcoholic rum & coke", "nonalcoholic mai tai", "nonalcoholic gin & tonic"],
        values: [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6],
        type: 'pie'
};
var data5 = [trace5];
var layout5 = {
    title: "'Bar' Chart",
   };
Plotly.newPlot("plotArea7", data5, layout5);

var trace6 = {
    x: [1, 2, 3, 4],
    y: [10, 15, 13, 17],
    mode: 'markers',
    type: 'scatter'
  };
  
  var trace7 = {
    x: [2, 3, 4, 5],
    y: [16, 5, 11, 9],
    mode: 'lines',
    type: 'scatter'
  };
  
  var trace8 = {
    x: [1, 2, 3, 4],
    y: [12, 9, 15, 12],
    mode: 'lines+markers',
    type: 'scatter'
  };
  
  var data6 = [trace6, trace7, trace8];
  
  Plotly.newPlot('challenge1', data6);