
function buildGaugechart(sample) {
    url = "/wfreq/" + sample;
    d3.json(url).then(function(response){
      var level = response.wfreq;
      
      // Trig to calc meter point
    //   var degrees = 9.0 - level, radius = .5;
    //   var radians = degrees * Math.PI / 180;
    //   var x = radius * Math.cos(radians);
    //   var y = radius * Math.sin(radians);
      var x = (level - 4.5) * 0.5/4.5;
      var y = Math.sqrt(0.5*0.5 - x*x);
   
  
      // Path: may have to change to create a better triangle
      var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
      pathX = String(x),
      space = ' ',
      pathY = String(y),
      pathEnd = ' Z';
      var path = mainPath.concat(pathX,space,pathY,pathEnd);
      console.log("Path: ", path);
  
      var data = [
        { type: 'scatter',
          x: [0], 
          y:[0],
          marker: {size: 28, color:'850000'},
          showlegend: false,
          name: 'Weekly freq',
          text: level,
          hoverinfo: 'text+name'
        },
        { type: 'pie',
          values: [50.0/9.0,50.0/9.0,50.0/9.0,50.0/9.0,50.0/9.0,50.0/9.0,50.0/9.0,50.0/9.0,50.0/9.0,50.0],
          rotation: 90,
          text: ['8-9', '7-8', '6-7','5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
          textinfo: 'text',
          textposition:'inside',
          marker: {colors:['rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)', 'rgba(140, 175, 22, .5)',
                            'rgba(190, 202, 42, .5)', 'rgba(202, 209, 95, .5)', 'rgba(206, 208, 120, .5)',
                            'rgba(210, 206, 145, .5)', 'rgba(220, 216, 180, .5)', 'rgba(232, 226, 202, .5)',
                            'rgba(255, 255, 255, 0)']},
          labels: ['8-9', '7-8', '6-7','5-6', '4-5', '3-4', '2-3',' 1-2', '0-1', ''],
          hoverinfo: 'label',
          hole: .6,
          showlegend: false
        }
      ]; 
      var layout = {
        shapes:[{
            type: 'path',
            path: path,
            fillcolor: '850000',
            line: {
              color: '850000'
            }
          }],
        title: 'Belly Button Washing Frequency',
        height: 700,
        width: 700,
        xaxis: {zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]},
        yaxis: {zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]}
      };
      Plotly.newPlot('gauge', data, layout);
    });
  }
