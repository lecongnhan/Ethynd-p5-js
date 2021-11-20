class Character {
    constructor(name="default"){
        this.name = name;
        this.id = GV.characters.length;
        this.setAction(CHAR_ACTION.IDLE);

        /** animtions */
        this.spriteCache = {};
        console.log("created character " + this.id + ": " + this.name);
    }

    draw(){
        let action = this.getAction();
        let minSpriteIndex;
        let maxSpriteIndex;

        switch(action){
            case CHAR_ACTION.WALK_DOWN:
                minSpriteIndex = CHAR_ACTION_NUM_SPRITES.WALK_DOWN_MIN;
                maxSpriteIndex = CHAR_ACTION_NUM_SPRITES.WALK_DOWN_MAX;
                break;
            case CHAR_ACTION.IDLE:
                minSpriteIndex = CHAR_ACTION_NUM_SPRITES.IDLE_MIN;
                maxSpriteIndex = CHAR_ACTION_NUM_SPRITES.IDLE_MAX;
                break;
        }

        this.drawAction(action, minSpriteIndex, maxSpriteIndex);
    }

    drawAction(action, minSpriteIndex, maxSpriteIndex){
        if (millis() - this.lastDrawTime >= 1000 / CHAR_FRAME_RATE){
            if (minSpriteIndex == maxSpriteIndex){
                this.spriteIndex = minSpriteIndex;
            } else {
                this.spriteIndex = (this.spriteIndex + 1) % maxSpriteIndex + minSpriteIndex;
            }

            this.lastDrawTime = millis();
        }

        let sprite;
        switch(action){
            case CHAR_ACTION.WALK_DOWN:
                sprite = this.getSprite(CHAR_ACTION.WALK_DOWN, this.spriteIndex);
                break;
            case CHAR_ACTION.IDLE:
                sprite = this.getSprite(CHAR_ACTION.IDLE, this.spriteIndex);
        }

        image(sprite, 0, 0);
    }

    /** sets action & reset animation for character */
    setAction(action){
        this.action = action;
        switch(action){
            case CHAR_ACTION.WALK_DOWN:
                this.spriteIndex = CHAR_ACTION_NUM_SPRITES.WALK_DOWN_MIN;
                break;
            case CHAR_ACTION.IDLE:
                this.spriteIndex = CHAR_ACTION_NUM_SPRITES.IDLE_MIN;
                break;
        }

        this.lastDrawTime = 0;
    }

    getSprite(action, index){
        let key = action + "-" + index;
        if(this.spriteCache[key] === undefined){
            this.spriteCache[key] = loadImage(this.getImgPath(index));
            console.log("loaded sprite " + key);
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

    getImgPath(index){
        return "images/sprites/personnage_0" + padZero(index, 1, true) + ".png";
    }
}