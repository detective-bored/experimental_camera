
let video;
var colors1 = ["#1c77c3", "#39a9db", "#40bcd8", "#f39237", "#d63230", "#540d6e", "#ee4266", "#ffd23f","#f3fcf0", "#19647E",];
var colors2 = ["#785964","#82a7a6","#000000","#9ed0e6","#b796ac"];
var colors3 = ["#99ddc8","#95bf74","#659b5e","#556f44","#283f3b"];
var colors4 = ["#114b5f","#028090","#e4fde1","#456990","#f45b69"];
var colors5 = ["#090446","#786f52","#feb95f","#f71735","#c2095a"]

var listOfColor = [colors1, colors2, colors3 , colors4, colors5];

let fr = 60;
let slider;
var colorset;
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(fr);
  colorset = int(random(0, listOfColor.length));
  slider = createSlider(10, 60, 30, 1);
  slider.position(10, 10);
  slider.style('width', '150px');

  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  grid = new CircleGrid();
}

function draw() {
  background(0, 50)

  grid.display();
}
function keyPressed() {
  if (keyCode === 32) {
    setup();
  }
}
class CircleClass {
  constructor(px, py, s) {
    this.positionX = px;
    this.positionY = py;
    this.size = s;
    this.c = listOfColor[colorset][int(random(0, listOfColor[colorset].length))];
  } 

  display() {
    rect(this.positionX, this.positionY, this.size, this.size);
    
    if (this.size > 15) {
      noStroke();
      fill(this.c);
    } else {
      noFill();
      strokeWeight(1);
      stroke(this.c);
    }
  }
}

class CircleGrid {
  constructor() {
    this.gridSize = 30
    this.circles = [];
    for (let y = 0; y < video.height; y += this.gridSize) {
      let row = [];
      for (let x = 0; x < video.width; x += this.gridSize) {
        let index = (y * video.width + x) * 4;
        let r = video.pixels[index];
        let dia = map(r, 0, 255, this.gridSize, 2);
        row.push(
          new CircleClass(x + this.gridSize / 
                          2, y + this.gridSize / 2, dia)
        );
      }
      this.circles.push(row);
    }
  }

  display() {
    video.loadPixels();
    this.gridSlider = slider.value()
    for (let i = 0; i < this.circles.length; i++) {
      for (let j = 0; j < this.circles[0].length; j++) {
        let index = (i * this.gridSize * video.width + 
                     j * this.gridSize) * 4;
        let r = video.pixels[index];
        let dia = map(r, 0, 255, this.gridSlider, 0);
        this.circles[i][j].size = dia;
        this.circles[i][j].display();
      }
    }

    var selection1 = int(random(this.circles.length - 1));
    var selection2 = int(random(this.circles[0].length - 1));
    var col = listOfColor[colorset][int(random(0, listOfColor[colorset].length))];
    this.circles[selection1][selection2].c = col;
  }
}
