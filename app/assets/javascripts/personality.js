//=require d3
//d3.select() will reference the first DOM element that matches the CSS selector. To grab multiple DOM elements with the same CSS selector, use selectALL()//
//d3 generated elements wil stack in order of creation. With the first created item being on top.//

function dThree(){
  var watson_json = [];
  var parameter =  $("#watson_data").attr('params');

  $.ajax({
    url: "/results/" + parameter,
    dataType: 'json',
    type: "GET",
    success: function(data) {
      watson_json = JSON.parse(data.data);
      bigFiveFunc();
      needsFunc();
      valuesFunc();
      console.log(data);
    },
     error: function() {
      console.log("error");
    }
  });

  var bigFive = [];
  var needs = [];
  var values = [];

  var w = 900;
  var h = 200;

  function bigFiveFunc(){
    watson_json.tree.children[0].children[0].children.forEach(function(d) {
      trait = {name: d.id, percentage: d.percentage};
      bigFive.push(trait);
    });

    var svg = d3.select("#watson_data")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

    var rectangles = svg.selectAll("rect")
      .data(bigFive)
      .enter()
      .append("rect");

      rectangles
        .text(function(d){
          return d.percentage;
        });

      rectangles
      .attr("height", function(d, i) {
        return d.percentage * 125;
      })
      .attr("width", 0)
      .attr("x", function(d, i) {
        return (w / 2);
      })
      .attr("y", function(d, i) {
        return h - (d.percentage * 125);
      });

      rectangles
      .transition()
      .duration(2000)
      .attr("x", function(d , i) {
        return (i * (w / bigFive.length));
      })
      .attr("width", function(d, i ) {
          return (w / bigFive.length - 3);
      })
      .attr("fill", function(d) {
          return "rgb(" + Math.round(255 * d.percentage) + ",0,0)";
        });

    var titles = svg.selectAll("text")
      .data(bigFive)
      .enter()
      .append("text")
      .text(function(d) {
        return d.name + " " + (d.percentage * 100) .toFixed(1) + "%";
      })
    .attr("fill", "rgb(255, 255, 255)")
    .attr("fill-opacity", "0.0");

      titles
      .transition()
      .duration(3000)
      .attr("x", function(d, i) {
        return i * (w / bigFive.length) + (w / bigFive.length - 3) / 2;
      })
      .attr("y", function(d, i) {
        return h - (d.percentage * 125) - 5;
      })
      .attr("font-size", "12px")
      .attr("font-family", "sans-serif")
      .attr("fill", "rgb(0, 0, 0)")
      .attr("fill-opacity", "1.0")
      .attr("text-anchor", "middle");
  }

  //Needs//
  function needsFunc(){
    watson_json.tree.children[1].children[0].children.forEach(function(d) {
      trait = {name: d.id, percentage: d.percentage};
      needs.push(trait);
    });

    var svg = d3.select("#watson_data")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

    var rectangles = svg.selectAll("rect")
      .data(needs)
      .enter()
      .append("rect");

      rectangles
        .text(function(d) {
          return d.percentage;
        });

      rectangles
      .attr("height", function(d, i) {
        return d.percentage * 125;
      })
      .attr("width", 0)
      .attr("x", function(d, i) {
        return (w / 2);
      })
      .attr("y", function(d, i) {
        return h - (d.percentage * 125);
      });

      rectangles
      .transition()
      .duration(2000)
      .attr("x", function(d , i) {
        return (i * (w / needs.length));
      })
      .attr("width", function(d, i ) {
          return (w / needs.length - 3);
      })
      .attr("fill", function(d) {
          return "rgb(0,0," + Math.round(255 * d.percentage) + ")";
        });

    var titles = svg.selectAll("text")
      .data(needs)
      .enter()
      .append("text")
      .text(function(d) {
        return d.name + " " + (d.percentage * 100).toFixed(1) + "%";
      })
    .attr("fill", "rgb(255, 255, 255)")
    .attr("fill-opacity", "0.0");

      titles
      .transition()
      .duration(3000)
      .attr("x", function(d, i) {
        return i * (w / needs.length) + (w / needs.length - 3) / 2;
      })
      .attr("y", function(d, i) {
        return h - (d.percentage * 125) - 5;
      })
      .attr("font-size", "9px")
      .attr("font-family", "sans-serif")
      .attr("fill", "rgb(0, 0, 0)")
      .attr("fill-opacity", "1.0")
      .attr("text-anchor", "middle");
  }


  //Values//
  function valuesFunc(){
  watson_json.tree.children[2].children[0].children.forEach(function(d) {
      trait = {name: d.id, percentage: d.percentage};
      values.push(trait);
    });

    var svg = d3.select("#watson_data")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

    var rectangles = svg.selectAll("rect")
      .data(values)
      .enter()
      .append("rect");

      rectangles
        .text(function(d) {
          return d.percentage;
        });

      rectangles
      .attr("height", function(d, i) {
        return d.percentage * 125;
      })
      .attr("width", 0)
      .attr("x", function(d, i) {
        return (w / 2);
      })
      .attr("y", function(d, i) {
        return h - (d.percentage * 125);
      });

      rectangles
      .transition()
      .duration(2000)
      .attr("x", function(d , i) {
        return (i * (w / values.length));
      })
      .attr("width", function(d, i ) {
          return (w / values.length - 3);
      })
      .attr("fill", function(d) {
          return "rgb(0," + Math.round(255 * d.percentage) + ",0)";
        });

    var titles = svg.selectAll("text")
      .data(values)
      .enter()
      .append("text")
      .text(function(d) {
        return d.name + " " + (d.percentage * 100).toFixed(1) + "%";
      })
    .attr("fill", "rgb(255, 255, 255)")
    .attr("fill-opacity", "0.0");

      titles
      .transition()
      .duration(3000)
      .attr("x", function(d, i) {
        return i * (w / values.length) + (w / values.length - 3) / 2;
      })
      .attr("y", function(d, i) {
        return h - (d.percentage * 125) - 5;
      })
      .attr("font-size", "9px")
      .attr("font-family", "sans-serif")
      .attr("fill", "rgb(0, 0, 0)")
      .attr("fill-opacity", "1.0")
      .attr("text-anchor", "middle");
  }
}
