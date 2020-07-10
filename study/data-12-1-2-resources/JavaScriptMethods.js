var numbers = [1,2,3,4,5];
var doubled = numbers.map(function(num){
    return num * 2;
});
console.log(doubled);

// Skill Drill2 - 
// Open VS Code and use map() to add 5 to each number in the following array:
// var numbers = [0,2,4,6,8];
// Verify your results in your browser console.

numbers = [0,2,4,6,8];
var inc5 = numbers.map(num => num+5);
console.log(inc5);
// ===============================

cities = [
    {
      "Rank": 1,
      "City": "San Antonio ",
      "State": "Texas",
      "Increase_from_2016": "24208",
      "population": "1511946"
    },
    {
      "Rank": 2,
      "City": "Phoenix ",
      "State": "Arizona",
      "Increase_from_2016": "24036",
      "population": "1626078"
    },
    {
      "Rank": 3,
      "City": "Dallas",
      "State": "Texas",
      "Increase_from_2016": "18935",
      "population": "1341075"
    }
];

cityNames = cities.map(function(city){
    return city.City;
});
console.log(cityNames);

// Skill Drill 3 - Modify the code in the previous example to extract the population of each city, instead of the city name.
cityPopulations = cities.map(function(city){
    return city.population;
});
console.log(cityPopulations);
// ======================================

numbers = [1,2,3,4,5];

var larger = numbers.filter(function(num){
    return num > 1;
});

console.log(larger);

var familyAge = [2,3,39,37,9];
 
var olderThanFive = familyAge.filter(function(age){
    return age > 5;
});

console.log(olderThanFive);

// Skill Drill
// You are given the following array:
// var words = ['seal', 'dog', 'scorpion', 'orangutan', 'salamander'];
// Filter the results to include only animals whose species name starts with the letter “s.”
var words = ['seal', 'dog', 'scorpion', 'orangutan', 'salamander'];
startsWithS = words.filter(word => word.startsWith("s"));
console.log(startsWithS);

// Sorting
var familyAge = [3,2,39,37,9];
// sort ascending
ascending = familyAge.sort((a,b) => a > b);
// also ... sortedAge = familyAge.sort((a,b) => a - b);
console.log(`ascending: ${ascending}`);

// sort descending
descending = familyAge.sort((a,b) => a < b);
// also ... sortedAge = familyAge.sort((a,b) => b - a);
console.log(`descending: ${descending}`);

// slice
var integers = [0,1,2,3,4,5];
slice1 = integers.slice(0,2);
console.log(slice1);

// Skill Drill
// var words = ['seal', 'dog', 'scorpion', 'orangutan', 'salamander'];
// Use slice() to select the first three elements of the words array.
words = ['seal', 'dog', 'scorpion', 'orangutan', 'salamander'];
console.log(words.slice(0,3));

// To slice to the end of an array, you can omit the second argument
var words = ['seal', 'dog', 'scorpion', 'orangutan', 'salamander'];
console.log(words.slice(3, ));
;
