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
        let sprite;

        switch(action){
            case CHAR_ACTION.WALK_DOWN:
                sprite = this.getSprite(CHAR_ACTION.WALK_DOWN, this.spriteIndex);

                if (millis() - this.lastDrawTime < 1000 / CHAR_FRAME_RATE) break;
                this.spriteIndex = (this.spriteIndex + 1) % CHAR_ACTION_NUM_SPRITES.WALK_DOWN_MAX + CHAR_ACTION_NUM_SPRITES.WALK_DOWN_MIN;
                this.lastDrawTime = millis();
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