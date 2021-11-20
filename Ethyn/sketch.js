function setup() {
  createCanvas(400, 400);
  frameRate(FRAME_RATE);
  GV.characters.push(new Character());
}

function draw() {
  background(255);
  // put drawing code here
  for (character of GV.characters) {
    character.draw();
  }
}