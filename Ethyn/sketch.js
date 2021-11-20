function setup() {
  createCanvas(400, 400);
  frameRate(FRAME_RATE);
  GV.myCharacter = new Character();
  GV.characters.push(GV.myCharacter);
}

function draw() {
  background(255);

  if (keyIsPressed) {
    if (keyIsDown(DOWN_ARROW)) GV.myCharacter.setAction(CHAR_ACTION.WALK_DOWN);
    if (keyIsDown(UP_ARROW)) GV.myCharacter.setAction(CHAR_ACTION.WALK_UP);
    if (keyIsDown(LEFT_ARROW)) GV.myCharacter.setAction(CHAR_ACTION.WALK_LEFT);
    if (keyIsDown(RIGHT_ARROW)) GV.myCharacter.setAction(CHAR_ACTION.WALK_RIGHT);
  } else {
    GV.myCharacter.setAction(CHAR_ACTION.IDLE);
  }

  // put drawing code here
  for (character of GV.characters) {
    character.update();
  }
}

// handle keypresses
function keyPressed() {

}

// function keyReleased() {
//   let stopActions = [CHAR_ACTION.WALK_DOWN, CHAR_ACTION.WALK_UP, CHAR_ACTION.WALK_LEFT, CHAR_ACTION.WALK_RIGHT];
//   if (stopActions.includes(GV.myCharacter.getAction())) {
//     GV.myCharacter.setAction(CHAR_ACTION.IDLE);
//   }
// }