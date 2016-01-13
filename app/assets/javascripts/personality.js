//=require d3
//d3.select() will reference the first DOM element that matches the CSS selector. To grab multiple DOM elements with the same CSS selector, use selectALL()//
//d3 generated elements wil stack in order of creation. With the first created item being on top.//

var bigFive = [];

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
    },
     error: function() {
      console.log("error");
    }
  });

//svg element parameters//
  var w = 900;
  var h = 200;

//If statement puts the bigFive in order for globalFive, which needs a specific order//
  function bigFiveFunc(){
    watson_json.tree.children[0].children[0].children.forEach(function(d) {
      if (d.id == "Openness") {
        trait = {name: "Intellect", percentage: d.percentage};
        bigFive[4] = trait;
      } else if (d.id == "Conscientiousness") {
        trait = {name: "Orderliness", percentage: d.percentage};
        bigFive[2] = trait;
      } else if (d.id == "Extraversion") {
        trait = {name: d.id, percentage: d.percentage};
        bigFive[0] = trait;
      } else if (d.id == "Agreeableness") {
        trait = {name: "Accommodation", percentage: d.percentage};
        bigFive[3] = trait;
      } else if (d.id == "Neuroticism") {
        trait = {name: "Emotional Stability", percentage: d.percentage};
        bigFive[1] = trait;
      }

    });
    globalFiveFunc();
    console.log(bigFive);

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
  var needs = [];
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
  var values = [];
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

//Create a string from bigFive, that matches global 5 personality types//
function globalFiveFunc(){
  var globalFive;
  var globalFiveArr = [];
  bigFive.forEach(function(d){
    if (d.name == "Extraversion" && d.percentage * 100 >= 50) {
      globalFiveArr[0] = "S";
    } else if (d.name == "Extraversion" && d.percentage * 100 <= 50) {
      globalFiveArr[0] = "R";
    } else if (d.name == "Emotional Stability" && d.percentage * 100 >= 50) {
      globalFiveArr[1] = "L";
    } else if (d.name == "Emotional Stability" && d.percentage * 100 <= 50) {
      globalFiveArr[1] = "C";
    } else if (d.name == "Orderliness" && d.percentage * 100 >= 50) {
      globalFiveArr[2] = "O";
    } else if (d.name == "Orderliness" && d.percentage * 100 <= 50) {
      globalFiveArr[2] = "U";
    } else if (d.name == "Accommodation" && d.percentage * 100 >= 50) {
      globalFiveArr[3] = "A";
    } else if (d.name == "Accommodation" && d.percentage * 100 <= 50) {
      globalFiveArr[3] = "E";
    } else if (d.name == "Intellect" && d.percentage * 100 >= 50) {
      globalFiveArr[4] = "N";
    } else if (d.name == "Intellect" && d.percentage * 100 <= 50) {
      globalFiveArr[4] = "I";
    }
  });
  globalFive = globalFiveArr.join('');
  console.log(globalFive);
  findGlobalFive(globalFive);
}

//Determines which myers briggs acronym the big five is//
function findGlobalFive(mbti){
  var myersBriggs;
  if (mbti === "RCUAI" || mbti === "RLUAI") {
    myersBriggs = "INFP";
  } else if (mbti === "RCUEI" || mbti === "RLUEI") {
    myersBriggs = "INTP";
  } else if (mbti === "RCOAI" || mbti === "RLOAI") {
    myersBriggs = "INFJ";
  } else if (mbti === "RCOEI" || mbti === "RLOEI") {
    myersBriggs = "INTJ";
  } else if (mbti === "RCOEN" || mbti === "RLOEN") {
    myersBriggs = "ISTJ";
  } else if (mbti === "RCOAN" || mbti === "RLOAN") {
    myersBriggs = "ISFJ";
  } else if (mbti === "RCUEN" || mbti === "RLUEN") {
    myersBriggs = "ISTP";
  } else if (mbti === "RCUAN" || mbti === "RLUAN") {
    myersBriggs = "ISFP";
  } else if (mbti === "SCUAI" || mbti === "SLUAI") {
    myersBriggs = "ENFP";
  } else if (mbti === "SCUEI" || mbti === "SLUEI") {
    myersBriggs = "ENTP";
  } else if (mbti === "SCOAI" || mbti === "SLOAI") {
    myersBriggs = "ENFJ";
  } else if (mbti === "SCOEI" || mbti === "SLOEI") {
    myersBriggs = "ENTJ";
  } else if (mbti === "SCOEN" || mbti === "SLOEN") {
    myersBriggs = "INFJ";
  } else if (mbti === "SCOAN" || mbti === "SLOAN") {
    myersBriggs = "ESFJ";
  } else if (mbti === "SCUEN" || mbti === "SLUEN") {
    myersBriggs = "ESTP";
  } else if (mbti === "SCUAN" || mbti === "SLUAN") {
    myersBriggs = "ESFP";
  } else {
    myersBriggs = "error";
  }
  mbtiFunc(myersBriggs);
}

//Displays a summary of personality type//
function mbtiFunc(mbti) {
  $.getJSON('../mbti.json', function(data) {
    data.forEach(function(d) {
      if (d.name == mbti) {
        $("#personality").html(d.summary);
      }
    });
  });

}
