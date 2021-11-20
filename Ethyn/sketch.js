function setup() {
  createCanvas(400, 400);
  frameRate(FRAME_RATE);
  GV.myCharacter = new Character();
  GV.characters.push(GV.myCharacter);
}

function draw() {
  background(255);

  switch (keyCode) {
    case DOWN_ARROW:
      GV.myCharacter.setAction(CHAR_ACTION.WALK_DOWN);
      break;
    case UP_ARROW:
      GV.myCharacter.setAction(CHAR_ACTION.WALK_UP);
      break;
    case LEFT_ARROW:
      GV.myCharacter.setAction(CHAR_ACTION.WALK_LEFT);
      break;
    case RIGHT_ARROW:
      GV.myCharacter.setAction(CHAR_ACTION.WALK_RIGHT);
      break;
  }

  // put drawing code here
  for (character of GV.characters) {
    character.draw();
  }
}

// handle keypresses
function keyPressed() {

}

function keyReleased() {
  let stopActions = [CHAR_ACTION.WALK_DOWN, CHAR_ACTION.WALK_UP, CHAR_ACTION.WALK_LEFT, CHAR_ACTION.WALK_RIGHT];
  if (stopActions.includes(GV.myCharacter.action)) {
    GV.myCharacter.setAction(CHAR_ACTION.IDLE);
  }
}