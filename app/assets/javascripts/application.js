//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .
//=require d3
//d3.select() will reference the first DOM element that matches the CSS selector. To grab multiple DOM elements with the same CSS selector, use selectALL()//
//d3 generated elements wil stack in order of creation. With the first created item being on top.//

$(document).ready(function(){

  var bigFive = [];

  d3.json("/watson_parse.json", function(data) {
    data.children[0].children[0].children.forEach(function(d) {
      trait = {name: d.id, percentage: d.percentage};
      bigFive.push(trait);
    });
    console.log(bigFive);
    var w = 800;
    var h = 200;

    var svg = d3.select("body")
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
      .attr("height", function(d) {
        console.log(d);
        return d.percentage * 125;
      })
      .attr("width", function(d, i ) {
          return (w / bigFive.length - 3);
        })
      .attr("x", function(d , i) {
        return i * (w / bigFive.length);
      })
      .attr("y", function(d, i) {
        return h - (d.percentage * 125);
      })
      .attr("fill", function(d) {
        return "rgb(" + Math.round(255 * d.percentage) + ",0,0)";
      });


      svg.selectAll("text")
      .data(bigFive)
      .enter()
      .append("text")
      .text(function(d) {
        return d.name + " " + (d.percentage.toFixed(3)) + "%";
      })
      .attr("x", function(d, i) {
        return i * (w / bigFive.length) + (w / bigFive.length - 3) / 2;
      })
      .attr("y", function(d, i) {
        return h - (d.percentage * 125) - 5;
      })
      .attr("font-size", "12px")
      .attr("fill", "rgb(0, 0, 0)")
      .attr("text-anchor", "middle");


  });

//   var w = 500;
//   var h = 150;
//
//   var svg = d3.select("body")
//             .append("svg")
//             .attr("width", w)   // <-- Here
//             .attr("height", h); // <-- and here!
//
//   var rectangles = svg.selectAll("rect")
//     .data(bigFive.percentage)
//     .enter()
//     .append("rect");
//
//   rectangles.attr("height", function(d, i) {
//     return d * 4;
//   })
//   .attr("width", function(d, i) {
//     return w / bigFive.length - 3;
//   })
//   .attr("x", function(d, i) {
//     return i * (w / bigFive.length);
//   })
//   .attr("y", function(d, i) {
//     return h - d * 4;
//   })
//   .attr("fill", function(d, i) {
//     return "rgb(0, 0, " + (d*10) + ")";
//   });
//
//   svg.selectAll("text")
//     .data(bigFive.percentage)
//     .enter()
//     .append("text")
//     .text(function(d) {
//       return d;
//     })
//     .attr("x", function(d, i) {
//       return i * (w / bigFive.length) + (w / bigFive.length - 3) / 2;
//     })
//     .attr("y", function(d, i) {
//       return h - (d * 4) + 14;
//     })
//     .attr("font-family", "sans-serif")
//     .attr("font-size", "11px")
//     .attr("fill", "white")
//     .attr("text-anchor", "middle");
// });
//   var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
//                 11, 12, 15, 20, 18, 17, 16, 18, 23, 25, 25];
});
