class Character {
    constructor(name="default", x=0, y=0){
        this.name = name;
        this.id = GV.characters.length;
        this.setAction(CHAR_ACTION.IDLE);
        this.x = x;
        this.y = y;

        /** animtions */
        this.spriteCache = {};
    }

    update(){
        this.updatePosition();
        this.draw();
    }

    updatePosition(){
        switch(this.action){
            case CHAR_ACTION.WALK_DOWN:
                this.y += CHAR_SPEED;
                break;
            case CHAR_ACTION.WALK_LEFT:
                this.x -= CHAR_SPEED;
                break;
            case CHAR_ACTION.WALK_RIGHT:
                this.x += CHAR_SPEED;
                break;
            case CHAR_ACTION.WALK_UP:
                this.y -= CHAR_SPEED;
                break;
        }
    }

    draw(){
        let action = this.getAction();
        let minSpriteIndex;
        let maxSpriteIndex;

        switch(action){
            case CHAR_ACTION.IDLE:
                minSpriteIndex = CHAR_ACTION_NUM_SPRITES.IDLE_MIN;
                maxSpriteIndex = CHAR_ACTION_NUM_SPRITES.IDLE_MAX;
                break;
            case CHAR_ACTION.WALK_DOWN:
                minSpriteIndex = CHAR_ACTION_NUM_SPRITES.WALK_DOWN_MIN;
                maxSpriteIndex = CHAR_ACTION_NUM_SPRITES.WALK_DOWN_MAX;
                break;
            case CHAR_ACTION.WALK_RIGHT:
                minSpriteIndex = CHAR_ACTION_NUM_SPRITES.WALK_RIGHT_MIN;
                maxSpriteIndex = CHAR_ACTION_NUM_SPRITES.WALK_RIGHT_MAX;
                break;
            case CHAR_ACTION.WALK_UP:
                minSpriteIndex = CHAR_ACTION_NUM_SPRITES.WALK_UP_MIN;
                maxSpriteIndex = CHAR_ACTION_NUM_SPRITES.WALK_UP_MAX;
                break;
            case CHAR_ACTION.WALK_LEFT:
                minSpriteIndex = CHAR_ACTION_NUM_SPRITES.WALK_LEFT_MIN;
                maxSpriteIndex = CHAR_ACTION_NUM_SPRITES.WALK_LEFT_MAX;
                break;
        }

        this.drawAction(action, minSpriteIndex, maxSpriteIndex);
    }

    drawAction(action, minSpriteIndex, maxSpriteIndex){
        if (millis() - this.lastDrawTime >= 1000 / CHAR_FRAME_RATE){
            if (minSpriteIndex == maxSpriteIndex){
                this.spriteIndex = minSpriteIndex;
            } else {
                this.spriteIndex = (this.spriteIndex + 1) % (maxSpriteIndex - minSpriteIndex + 1);
            }

            this.lastDrawTime = millis();
        }

        let sprite;
        sprite = this.getSprite(action, this.spriteIndex + minSpriteIndex);

        image(sprite, this.x, this.y);
    }

    /** sets action & reset animation for character */
    setAction(action){
        if (this.action == action) return;
        console.log("set action " + action);
        this.action = action;

        switch(action){
            case CHAR_ACTION.WALK_DOWN:
                this.spriteIndex = CHAR_ACTION_NUM_SPRITES.WALK_DOWN_MIN;
                break;
            case CHAR_ACTION.IDLE:
                this.spriteIndex = CHAR_ACTION_NUM_SPRITES.IDLE_MIN;
                break;
            case CHAR_ACTION.WALK_LEFT:
                this.spriteIndex = CHAR_ACTION_NUM_SPRITES.WALK_LEFT_MIN;
                break;
            case CHAR_ACTION.WALK_RIGHT:
                this.spriteIndex = CHAR_ACTION_NUM_SPRITES.WALK_RIGHT_MIN;
                break;
            case CHAR_ACTION.WALK_UP:
                this.spriteIndex = CHAR_ACTION_NUM_SPRITES.WALK_UP_MIN;
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
        return "static/images/sprites/personnage_" + padZero(index, 2, true) + ".png";
    }
}