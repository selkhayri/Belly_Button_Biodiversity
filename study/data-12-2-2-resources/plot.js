console.log(cityGrowths);

// Sort the cities in descending order of population growth.
byPopGrowth = cityGrowths.sort((city1,city2) => city1 < city2);  // Descending order
console.log(byPopGrowth);

// Select only the top five cities in terms of growth
top5 = byPopGrowth.slice(0,5);
console.log(top5);

// Create separate arrays for the city names and their population growths
cityName = top5.map(city => city.City);
cityPopGrowth = top5.map(city => parseInt(city.Increase_from_2016));

// var trace = [{
//     x: cityName,
//     y: cityPopGrowth,
//     type: "bar"
// }];

// var layout = {
//     title: "Most Rapidly Growing Cities",
//     xaxis: { title: "City" },
//     yaxis: { title: "Population Growth, 2016-2017"}
//   };

// // Use Plotly to create a bar chart with these arrays.
// Plotly.newPlot("bar-plot", trace, layout);


var trace = {
    x: cityName,
    y: cityPopGrowth,
    type: "bar"
  };
  var data = [trace];
  var layout = {
    title: "Most Rapidly Growing Cities",
    xaxis: { title: "City" },
    yaxis: { title: "Population Growth, 2016-2017"}
  };
Plotly.newPlot("bar-plot", data, layout);


// Skill Drill
// Use the same dataset to create a bar chart of the seven largest cities by population.
sortByPopulation = cityGrowths.sort((city1,city2) => parseInt(city1.population) < parseInt(city2.population)); 
// console.log(sortByPopulation);
top7pop = sortByPopulation.slice(0,7);
names7pop = top7pop.map(name => name.City);
pops7pop = top7pop.map(name => parseInt(name.population));

var trace = {
    x: names7pop,
    y: pops7pop,
    type: "bar"
  };
  var data = [trace];
  var layout = {
    title: "Most Populous Cities",
    xaxis: { title: "City" },
    yaxis: { title: "Population, 2016-2017"}
  };
Plotly.newPlot("bar-plot-pops", data, layout);

