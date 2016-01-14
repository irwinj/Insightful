//=require d3
$(document).ready(function(){
  //Show more conent for needs div//
  $(".showMore").on("click", function() {
    var linkText = $(".showMore").text().toUpperCase();
    console.log(linkText);

    if (linkText == "SHOW MORE") {
      $(".showMore").text("Show less");
      $("#needs").switchClass("hideContent", "showContent", 400);
    } else {
      $(".showMore").text("Show more");
      $("#needs").switchClass("showContent", "hideContent", 400);
    }
  });

});

//d3.select() will reference the first DOM element that matches the CSS selector. To grab multiple DOM elements with the same CSS selector, use selectALL()//
//d3 generated elements wil stack in order of creation. With the first created item being on top.//

function dThree(){
  var watson_json = [];
  var parameter =  $("#watson_data").attr('params');

  $.ajax({
    url: "/personalities/" + parameter,
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
  var w = 325;
  var h = 600;

//If statement puts the bigFive in order for globalFive, which needs a specific order. Then changes the name of the catergoy to match globaFive naming//
function bigFiveFunc(){
  var bigFive = [];
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
  globalFiveFunc(bigFive);

  var tooltipJson;

//Grabs data from tooltip.json and puts into tooltipJson for use in tip var html//
  $.getJSON('../tooltip.json', function(data) {
    tooltipJson = data;
  });

//Creates blueprint for tooltips, and assigns it the proper text//
  var tip = d3.tip()
  .attr("class", "d3-tip")
  .offset([-10,0])
  .html(function(d,i) {
    return tooltipJson[0][i].tooltip;
  });

  var svg = d3.select("#bigFive")
    .append("svg")
    .attr("width", w)
    .attr("height", "100%");

//Allows var svg to use tooltips. Currently circle elements show tips//
  svg.call(tip);

//Creates the lines using rectangles//
  var rectangles = svg.selectAll("rect")
    .data(bigFive)
    .enter()
    .append("rect");

  rectangles
    .text(function(d){
      return d.percentage;
    });

  rectangles
    .attr("height", "5px")
    .attr("width", "300px")
    .attr("rx", 3)
    .attr("ry", 3)
    .attr("x", 10)
    .attr("y", function(d, i) {
      return i * (h / bigFive.length) + 50;
    });

//Creates one circle per line//
  var circles = svg.selectAll("circle")
    .data(bigFive)
    .enter()
    .append("circle")
    .attr("cx", 12);

  circles
    .attr("r", "10")
    .attr("stroke", "rgb(232, 173, 21)")
    .attr("stroke-width", "3")
    .attr("fill", "white")
    .on("mouseover", tip.show)
    .on("mouseout", tip.hide)
    .attr("cy", function(d, i) {
      return i * (h / bigFive.length) + 53;
    });

  circles
    .transition()
    .duration(2000)
    .attr("cx", function(d, i) {
      return (d.percentage + 0.04) * 300;
    })
    .attr("fill", function(d) {
        return "hsl(200," + Math.round(255 * d.percentage) + "%,45%)";
      });
//Puts titles on the circles. If over 50% text-anchor at end, less than text-anchor at start//
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
      return d.percentage * 310;
    })
    .attr("y", function(d, i) {
      return i * (h / bigFive.length) + 30;
    })
    .attr("font-size", "12px")
    .attr("font-family", "sans-serif")
    .attr("fill", "rgb(0, 0, 0)")
    .attr("fill-opacity", "1.0")
    .attr("text-anchor", function(d, i) {
      if ((d.percentage * 100) >= 50 ) {
        return "end";
      } else {
        return "start";
      }
    });

}

//Needs//
function needsFunc(){
  var needs = [];
  watson_json.tree.children[1].children[0].children.forEach(function(d) {
    trait = {name: d.id, percentage: d.percentage};
    needs.push(trait);
  });

  var svg = d3.select("#needs")
    .append("svg")
    .attr("width", w)
    .attr("height", "100%");

//Creates the lines using rectangles//
  var rectangles = svg.selectAll("rect")
    .data(needs)
    .enter()
    .append("rect");

  rectangles
    .text(function(d){
      return d.percentage;
    });

  rectangles
    .attr("height", "5px")
    .attr("width", "300px")
    .attr("rx", 3)
    .attr("ry", 3)
    .attr("x", 10)
    .attr("y", function(d, i) {
      return i * (h / 5) + 50;
    });

//Creates one circle per line//
  var circles = svg.selectAll("circle")
    .data(needs)
    .enter()
    .append("circle")
    .attr("cx", 12);

  circles
    .attr("r", "10")
    .attr("stroke", "rgb(232, 173, 21)")
    .attr("stroke-width", "3")
    .attr("fill", "white")
    .attr("cy", function(d, i) {
      return i * (h / 5) + 53;
    });

  circles
    .transition()
    .duration(2000)
    .attr("cx", function(d, i) {
      return (d.percentage + 0.03) * 300;
    })
    .attr("fill", function(d) {
        return "hsl(153," + Math.round(255 * d.percentage) + "%,40%)";
      });

//Puts titles on the circles. If over 50% text-anchor at end, less than text-anchor at start//
  var titles = svg.selectAll("text")
    .data(needs)
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
      return d.percentage * 310;
    })
    .attr("y", function(d, i) {
      return i * (h / 5) + 30;
    })
    .attr("font-size", "12px")
    .attr("font-family", "sans-serif")
    .attr("fill", "rgb(0, 0, 0)")
    .attr("fill-opacity", "1.0")
    .attr("text-anchor", function(d, i) {
      if ((d.percentage * 100) >= 50 ) {
        return "end";
      } else {
        return "start";
      }
    });

}

//Values//
function valuesFunc(){
  var values = [];
  watson_json.tree.children[2].children[0].children.forEach(function(d) {
      trait = {name: d.id, percentage: d.percentage};
      values.push(trait);
    });

  var svg = d3.select("#values")
    .append("svg")
    .attr("width", w)
    .attr("height", "100%");

//Creates the lines using rectangles//
  var rectangles = svg.selectAll("rect")
    .data(values)
    .enter()
    .append("rect");

  rectangles
    .text(function(d){
      return d.percentage;
    });

  rectangles
    .attr("height", "5px")
    .attr("width", "300px")
    .attr("rx", 3)
    .attr("ry", 3)
    .attr("x", 10)
    .attr("y", function(d, i) {
      return i * (h / 5) + 50;
    });

//Creates one circle per line//
  var circles = svg.selectAll("circle")
    .data(values)
    .enter()
    .append("circle")
    .attr("cx", "12");

  circles
    .attr("r", "10")
    .attr("stroke", "rgb(232, 173, 21)")
    .attr("stroke-width", "3")
    .attr("fill", "white")
    .attr("cy", function(d, i) {
      return i * (h / 5) + 53;
    });

  circles
    .transition()
    .duration(2000)
    .attr("cx", function(d, i) {
      return (d.percentage + 0.03)  * 300;
    })
    .attr("fill", function(d) {
        return "hsl(55," + Math.round(255 * d.percentage) + "%,45%)";
      });

//Puts titles on the circles. If over 50% text-anchor at end, less than text-anchor at start//
  var titles = svg.selectAll("text")
    .data(values)
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
      return d.percentage * 310;
    })
    .attr("y", function(d, i) {
      return i * (h / 5) + 30;
    })
    .attr("font-size", "12px")
    .attr("font-family", "sans-serif")
    .attr("fill", "rgb(0, 0, 0)")
    .attr("fill-opacity", "1.0")
    .attr("text-anchor", function(d, i) {
      if ((d.percentage * 100) >= 50 ) {
        return "end";
      } else {
        return "start";
      }
    });
  }
}

//Create a string from bigFive, that matches global 5 personality types//
function globalFiveFunc(bigFive){
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

//Displays the summary of a personality type from mtbi.json//
function mbtiFunc(mbti) {
  $.getJSON('../mbti.json', function(data) {
    data.forEach(function(d) {
      if (d.name == mbti) {
        $("#personality").html(d.summary);
      }
    });
  });
}
