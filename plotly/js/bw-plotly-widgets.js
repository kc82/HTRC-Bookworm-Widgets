// BW WIDGET FUNCTIONS
/*
    This are the general functions for the Bookworm Widgets, 
    that specialized methods make use of.
*/ 

var plotTimeSeries = function(bw_resp, options, callback) {
    /*
    Take a BW API response grouped by year, and plot as a line_chart.

    options (as keys in the options arg):
        div: the id of the container for the chart.
        
    */
    pairs = _.toPairs(bw_resp[0]);

    var plot1 = {
      x: _.map(pairs, function(x){ return x[0] }),
      y: _.map(pairs, function(x){ return x[1][0] }),
      type: 'scatter',
      line: {shape: 'spline', smoothing: 3}
    };

    // Plot layout options
    var layout = {
      title:'Adding Names to Line and Scatter Plot'
    };

    // Some general options for Plot.ly
    var plotlyOpts = {
        // This removes buttons that we don't need from the hover menu. If you're
        // unsure what it does, comment this out and see what the hover menu does :)
        //modeBarButtonsToRemove: ['sendDataToCloud']
        displayModeBar: false,
    }
    Plotly.newPlot(options.div, [plot1], options.layout, plotlyOpts);

}

function getBWData(endpoint, query, callback) {
    /*
    Make a bookworm query to API at location 'endpoint' and send response to
    callback(). Endpoint needs to have cross-domain headers if it is not on the same
    server.
    */
    var query_string = JSON.stringify(query);
    var url = endpoint + "?query=" + query_string;
    Plotly.d3.json(url).get(function(error, data) {
        if (error) return console.warn(error);
        callback(data, error);
    });
};