//Define URL of JSON data
let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

//Define updateplots function
function updatePlots(sample, data) {

    //Filter the samples for the sample id
    let sampleData = data.samples.filter((obj) => obj.id === sample)[0];

    //Get the top 10 OTUs, reverse the arrays to work with Plotly
    let otuIds = sampleData.otu_ids.slice(0, 10).reverse();
    let otuLabels = sampleData.otu_labels.slice(0, 10).reverse();
    let sampleValues = sampleData.sample_values.slice(0, 10).reverse();

    //Create the trace for the bar chart
    let barData = [{
        x: sampleValues,
        y: otuIds.map((otuId) => `OTU ${otuId}`),
        text: otuLabels,
        name: "otuIDs",
        type: "bar",
        orientation: "h"
    }];

    //Create layout for the bar chart
    let layout = {
        margin: { l: 100, r: 100, t: 100, b: 100 }
    };

    //Render bar chart
    Plotly.newPlot("bar", barData, layout);

    //Get all OTUs for bubble chart
    otuIds = sampleData.otu_ids;
    otuLabels = sampleData.otu_labels;
    sampleValues = sampleData.sample_values;

    //Create trace for bubble chart
    let bubbleData = [{
        x: otuIds,
        y: sampleValues,
        text: otuLabels,
        mode: "markers",
        marker: {
            size: sampleValues,
            color: otuIds,
            colorscale: 'Earth'
        }
    }];

    //Define layout for bubble chart
    layout = {
        xaxis: {
            title: 'OTU ID',
            range: [0, 3700] 
        },
        yaxis: {
            title: 'Sample Values',
            range: [0, 250] 
        },
    };

    // Render bubble chart
    Plotly.newPlot("bubble", bubbleData, layout);
}

//Define updatemetadata function
function updateMetadata(sample, data) {

    // Filter metadata for the selected  id
    let metadata = data.metadata.filter((obj) => obj.id === parseInt(sample))[0];

    // Select where the metadata will be displayed
    let displayBox = d3.select("#sample-metadata");

    // Clear existing metadata
    displayBox.html("");

    // Add each key-value pair to the display
    Object.entries(metadata).forEach(([key, value]) => {
        displayBox.append("h5").text(`${key}: ${value}`);
    });
}

//Call this function when new option in selected from dropdown
function optionChanged(newSample) {

    //Re-fetch data and update the plots/ metadata
    d3.json(url).then((data) => {
        updatePlots(newSample, data);
        updateMetadata(newSample, data);
    });
}

//Use d3 to fetch data
d3.json(url).then((data) => {

    //Log the data to console for reference
    console.log(data);

    //Loop through the names and add each as an option in dropdown
    data.names.forEach((name) => {
        d3.select("#selDataset").append("option").text(name);
    });

    //Get the first sample for the initial display
    let sample = data.names[0];

    //Update plots and metadata with initial sample data
    updatePlots(sample, data);
    updateMetadata(sample, data);
});
