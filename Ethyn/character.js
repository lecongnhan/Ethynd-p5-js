class Character {
    constructor(name="default"){
        this.name = name;
        this.setAction(CHAR_ACTION.WALK_DOWN);

        /** animtions */
        this.spriteCache = {};
    }

    draw(){
        console.log(millis() - this.lastDrawTime);
        
        let action = this.getAction();
        let minSpriteIndex;
        let maxSpriteIndex;

        switch(action){
            case CHAR_ACTION.WALK_DOWN:
                minSpriteIndex = CHAR_ACTION_NUM_SPRITES.WALK_DOWN_MIN;
                maxSpriteIndex = CHAR_ACTION_NUM_SPRITES.WALK_DOWN_MAX;
                break;
        }

        this.drawAction(action, CHAR_ACTION_NUM_SPRITES.WALK_DOWN_MIN, CHAR_ACTION_NUM_SPRITES.WALK_DOWN_MAX);
    }

    drawAction(action, minSpriteIndex, maxSpriteIndex){
        if (millis() - this.lastDrawTime >= 1000 / CHAR_FRAME_RATE){
            this.spriteIndex = (this.spriteIndex + 1) % maxSpriteIndex + minSpriteIndex;
            this.lastDrawTime = millis();
        }

        let sprite;
        switch(action){
            case CHAR_ACTION.WALK_DOWN:
                sprite = this.getSprite(CHAR_ACTION.WALK_DOWN, this.spriteIndex);
                break;
        }

        image(sprite, 0, 0);
    }

    setAction(action){
        this.action = action;
        switch(action){
            case CHAR_ACTION.WALK_DOWN:
                this.spriteIndex = CHAR_ACTION_NUM_SPRITES.WALK_DOWN_MIN;
                break;
        }

        this.lastDrawTime = 0;
    }

    getSprite(action, index){
        let key = action + "-" + index;
        if(this.spriteCache[key] === undefined){
            this.spriteCache[key] = loadImage('images/sprites/personnage_0' + index + '.png');
        }

        return this.spriteCache[key];
    }

    getAction(){
        return this.action;
    }

    getSpriteIndex(){
        return this.spriteIndex;
    }

    getName(){
        return this.name;
    }
}