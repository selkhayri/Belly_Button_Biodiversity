d3.json("samples.json").then(function(data){
    // console.log(data);

    // Skill Drill
    // Use Object.entries() and forEach() to print all the metadata of the first person in the samples.json() dataset (ID 940).
    Object.entries(data.metadata[0]).forEach(i => console.log(`[${i[0]},${i[1]}]`));
});

d3.json("samples.json").then(function(data){
    firstPerson = data.metadata[0];
    Object.entries(firstPerson).forEach(([key, value]) =>
      {console.log(key + ': ' + value);});
});