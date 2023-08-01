//Define URL of JSON data
let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

//use d3 to fetch data
d3.json(url).then((data) => {

    //log the data to console for reference
    console.log(data);

    //loop through the names and add each as an option in dropdown
    data.names.forEach((name) => {
        d3.select("#selDataset").append("option").text(name);
    });

    //get the first sample for the initial display
    let sample = data.names[0];

    //update plots and metadata with initial sample data
    updatePlots(sample, data);
    updateMetadata(sample, data);
});