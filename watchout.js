// function for moving asteroids positions
  // randomly generates new top & left for each asteroid
  // animates transition
// function for initiating asteroid position change ^^
// function for score keeping
  // constantly increments score by some interval of milliseconds
  //detects mouse over on an asteroid by creating listener for mouse over on event
    // stores score at event
      // if score is higher than top score
        // score at event is top score
    // score is reset to 0
var radius = 15;
var drag = d3.behavior.drag()
             .on('dragstart', function() { player.style('fill', 'orange'); })
             .on('drag', function() { player
              .attr("cx", Math.max(radius, Math.min(width - radius, d3.event.x)))
              .attr("cy", Math.max(radius, Math.min(height - radius, d3.event.y))) })
              .on('dragend', function() { player.style('fill', 'white'); });

var d3highScore = d3.select('body').select('.high').select('span');
var d3currentScore = d3.select('body').select('.current').select('span');
var d3collisions = d3.select('body').select('.collisions').select('span');

var highScore = 0;
var collisions = 0;
var player;
var currentScore = 0;
var width = window.innerWidth;
var height = window.innerHeight;
var svgHolder = d3.select('body').append('svg').attr('width', width).attr('height', height);
var enemyCount = 15;
var setUp = function () {
  var enemies = enemyGenerator(15);

  svgHolder
    .selectAll('.enemies')
    .data(enemies)
    .enter()
    .append('circle')
    .attr("r", radius)
    .attr("x", function (d) { return d.x; })
    .attr("y", function (d) { return d.y; })
    .style("fill", "purple")
    .attr("class", "enemies");

  player = svgHolder
    .append('circle')
    .attr("r", radius)
    .attr("cx", 100 )
    .attr("cy", 100 )
    .style("fill", "white")
    .attr("class", "player")
    .call(drag);
};

var player;
var randomCoordinates = function () {
  var obj = {};
  obj['y'] = Math.ceil(Math.random() * height);
  obj['x'] = Math.ceil(Math.random() * width);
  return obj;
};

var enemyGenerator = function (enemyCount) {
  var enemies = [];
  for (var i = 0; i < enemyCount; i++) {
    enemies.push(randomCoordinates());
  }
  return enemies;
};

var playerMaker = function () {
  var enemies = [];
  enemies.push(randomCoordinates());
  return enemies;
};

var gameLoop = function () {
  var newPositions = enemyGenerator(enemyCount);
  svgHolder
    .selectAll('.enemies')
    .data(newPositions)
    .transition()
    .duration(750)
    .attr("cx", function (d) { return d.x; })
    .attr("cy", function (d) { return d.y; });
  setTimeout(gameLoop, 1000);
};

//Tracking Collisions and Scores

var collisionLoop = function () {
  checkTweenPositions();
  if ( collisions > 4 ) {
    if (currentScore > highScore) {
      highScore = currentScore;
      d3highScore.text(""+highScore);
    }
    collisions = 0;
    d3collisions.text(""+collisions);
    currentScore = 0;
    d3currentScore.text("0");
  }

  setTimeout(collisionLoop, 13);
}

var scoreLoop = function () {
  currentScore++;
  d3currentScore.text(""+currentScore);
  setTimeout(scoreLoop, 50);
};

var checkCollisions = function (d3Obj) {
  var obj = {};
  obj.x = player.attr('cx');
  obj.y = player.attr('cy');
  var enemyObj = {};
  enemyObj.x = d3Obj.attr('cx');
  enemyObj.y = d3Obj.attr('cy');
  if ( console.log(Math.sqrt((obj.x - enemyObj.x)*(obj.x - enemyObj.x) + (obj.y - enemyObj.y)*(obj.y - enemyObj.y) < radius) )) {
    collisions++;
    d3collisions.text(""+collisions);
  }
};

var checkTweenPositions = function () {
  d3.selectAll('.enemies').each(function (d, i) { return checkCollisions(d3.select(this)); } )
};

var filterPlayer = function (player) {
  if (d3.select(player).attr('class') === 'player') {
    return true;
  }
  return false;
};

/*
var dragstarted = function(d) {
  console.log('dragstarted');
    d3.event.sourceEvent.stopPropagation();
    d3.select(this).classed("dragging", true);
};

var dragged = function (d) {
  console.log('dragged');

  d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);

};

var dragended = function (d) {
  console.log('dragended');

  d3.select(this).classed("dragging", false);

};
*/

setUp();
gameLoop();
scoreLoop();
collisionLoop();
/*
for (var i = 0; i < enemyCount; i++) {
  svgHolder
  .append('circle')
  .attr("r", 15)
  .attr("cx", Math.ceil(Math.random() * width))
  .attr("cy", Math.ceil(Math.random() * height))
  .style("fill", "purple")
  .style("stroke-width", 3);
}

*/
/*
d3.selectAll("circle").transition()
    .duration(750)
    .delay(function(d, i) { return i * 10; })
    .attr("r", function(d) { return Math.sqrt(d * scale); });


//================//

//1d3.select("body").append("svg").attr("width", 50).attr("height", 50).append("circle").attr("cx", 25).attr("cy", 25).attr("r", 25).style("fill", "purple");


  // var th = d3.select(selection).select("thead").selectAll("th")
  //       .data(colspec)
  //   .enter().append("th")
  //       .text(function(d) { return d["data-name"]; })
  //       // now address each item individually
  //       .each(function(d) {
  //           var header = d3.select(this);
  //           // loop through the keys - this assumes no extra data
  //           d3.keys(d).forEach(function(key) {
  //               if (key != "data-name")
  //                   header.attr(key, d[key]);
  //           });
  //       });
*/