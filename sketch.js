

var branches = [];
var leaves = [];
var grassblades = [];
var rounds = 9; // How many times to perform the recursion of the fractal.
var ww = 4; // Starting stroke weight for trunk.
var amountOfBlades = 125; // How many grassblades to spawn.
var countForLeaves = rounds-2; // Which round of recursion do you want leaves to start spawning on the limbs.
var thicknessToDrop = 0.25; // The amount of stroke weight to go down for each round of limbs.
var constantSway = 5; //Obsolete
var constantRate = 0.5; //Rate for the wind.
var currentRound = 0;   //hierarchy for the limbs / tree.

function setup()
{
  //Setup the canvas.
  createCanvas(1600, 500);

  //Create the trunks for the three trees.
  branches[0] = new Branch(createVector(width/6, height-17), createVector((width/6)+random(0, 8), height-150), ww);
  branches[1] = new Branch(createVector(width/2, height-17), createVector((width/2)+random(0, 8), height-150), ww);
  branches[2] = new Branch(createVector(width/1.2, height-17), createVector((width/1.2)+random(0, 8), height-150), ww);

  //Rounds for how many times to recurse through the function and develope the tree.
  for(currentRound = 0; currentRound < rounds; currentRound++)
  {
    //Lose some stroke weight for each round to make the limbs smaller.
    ww-=thicknessToDrop;
    for(var j = branches.length-1; j >= 0; j--)
    {
      //Check if the tree has limbs to avoid overflowing the array with pointless limbs.
      if(!branches[j].isGrown)
      {
        //Add the two limbs for each branch.
        var arr = branches[j].grow(ww);
        branches.push(arr[0]);
        branches.push(arr[1]);
        //If the amount of rounds to wait for developing leaves has passes then start spawning the objects.
        if(currentRound > countForLeaves)
        {
          leaves[leaves.length] = new leaf(arr[0].pointB);
          leaves[leaves.length] = new leaf(arr[1].pointB);
        }
      }
    }
  }
  //Creates the grass blades.
  for(var i = 0; i< amountOfBlades; i++)
  {
    var x = random(0, width);
    var y = height;
    grassblades[i] = new grass(createVector(x, y));
  }
}

//Detect the key press and if key 'R' reload the page.
function keyPressed()
{
  if(keyCode == 82)
  {
    location.reload();
  }
}

//Main screen rendering function.
function draw()
{
  //Sets background to a blue.
  background(0, 91, 255);
  //Sets palette color to green and draws the main grass block at the bottom.
  stroke(100, 255, 91);
  for(var i = 15; i >= 0; i--)
    line(0, height-i, width, height-i);

  //Draws the glassblades.
  for(var i = 0; i < grassblades.length;i++)
    grassblades[i].draw();
  
  for(var i = 0; i < branches.length; i++)
  {
    //Performs the wind blow.
    branches[i].blow();
    //If leafs contains the index 'I' then draw the leaf.
    if(leaves[i])
      leaves[i].draw();
    //Draws the branches.
    branches[i].draw();
  }
}
