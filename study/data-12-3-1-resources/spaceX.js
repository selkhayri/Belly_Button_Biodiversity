const url = "https://api.spacexdata.com/v2/launchpads";

d3.json(url).then(receivedData => console.log(receivedData));

// Skill Drill
// Use map() to print only the latitude and longitude coordinates of each SpaceX launch station.
d3.json(url).then(receivedData => {
    latlong = receivedData.map(x => `[${x.location.latitude},${x.location.longitude}]`);
    console.log(latlong);
});



