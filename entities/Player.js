export class Player{
    heightDelta = 0
    isMoving = false
    isRespawning = false
    coyoteLapse = 0.1
    coins = 0

    constructor(posX, posY, speed, jumpForce, nbLives, currentLevelScene, isInTerminalScene){
        //this is used to create properties of gameobj
        this.isInTerminalScene = isInTerminalScene   //this keyword is used to develop attribute for calling in an method or function
        this.currentLevelScene = currentLevelScene  
        this.intialX = posX
        this.intialY = posY
        this.makePlayer()    // when Player class is called this.** all are called and when makeplayer() is called then player is generated
        this.setPlayerControls() // same when the Player is called then this.setPlayerControls attribute is also called
        this.speed = speed
        this.jumpForce = jumpForce
        this.lives = nbLives
        this.previousHeight = this.gameObj.pos.y

    }

    makePlayer(){
        this.gameObj = add([
            sprite("player", { anim: "idle"}),
            area({ shape: new Rect(vec2(0,3), 8, 8) }), //Rect(position of hit box, width, height)
            anchor("center"),
            pos(this.intialX, this.intialY),
            scale(4),
            body(),     //body is dynamic in type when type is empty
            "player",   //this tag used so that we could use reference to any other method or can can this properties
        ])
    }

    enablePassthrough() {
        this.gameObj.onBeforePhysicsResolve((collision) => {  // onBeforePhysicsResolve() this is used to intercept collision, *** we have used area and thats why we could use onBeforePhyiscsResolve()
            if(collision.target.is("passthrough") && this.gameObj.isJumping()){ //collision.target is to check collision occur at a particular place collision.target.is("tag")tag is used in general mapping in oneway tiles "passthrough" & isJumping whether player is jumping ?
                collision.preventResolution()
            }

            if(collision.target.is("passthrough") && isKeyDown("down")){ //collision.target is to check collision occur at a particular place collision.target.is("tag")tag is used in general mapping in oneway tiles "passthrough"
                collision.preventResolution()
            }

        })
    }

    enableCoinPickUp(){
        this.gameObj.onCollide("coin", (coin) => {          //Check for collision
            this.coins++
            destroy(coin)
            play("coin")
        })      
    }

    setPlayerControls(){
        onKeyDown("left", () => {
            if(this.gameObj.curAnim() !== "run") this.gameObj.play("run") // curAnim is the to check which animation is running right now and gameObj.play() is to play animation that is attach to the player it is different from sound play() function, .play() is the method
            this.gameObj.flipX = true   // .flipX is the function that flip the player to left or right
            if(!this.isRespawning) this.gameObj.move(-this.speed, 0) // move() function allow us to move the player and move(horizontal direction, vertical direction) and !this.isRespawning means that when this value is false then player will move otherwise it will not move
            this.isMoving = true
        })

        onKeyDown("right", () => {
            if(this.gameObj.curAnim() !== "run") this.gameObj.play("run") // curAnim is the to check which animation is running right now and gameObj.play() is to play animation that is attach to the player it is different from sound play() function, .play() is the method
            this.gameObj.flipX = false   // .flipX is the function that flip the player to left or right
            if(!this.isRespawning) this.gameObj.move(this.speed, 0) // move() function allow us to move the player and move(horizontal direction, vertical direction)
            this.isMoving = true
        })

        onKeyDown("space", () => {
            if ( this.gameObj.isGrounded() && !this.isRespawning ){         //isGrounded checks if the player is on the platform or not
                this.jumpOnce = true
                this.gameObj.jump(this.jumpForce)
                //we didnt make jump anim. because we have to make both jump up and jump down anim and there timing is imp that's why we will make in ****** onUpdateLoop *****
                play("jump" , { speed: 1.5})
            }  
            
            //creating coyote time lapse in which we could jump from edge of roof in certain sec of time
            if( !this.gameObj.isGrounded() && time() - this.timeSinceLastGrounded < this.coyoteLapse && !this.jumpOnce){//time() :- current time
                this.jumpOnce = true
                this.gameObj.jump(this.jumpForce)
                play("jump" , { speed: 1.5})
            }
        })

        onKeyRelease(() => {        // this function is call when any key is released from touch.
            if( isKeyReleased("right") || isKeyReleased("left")){    //isKeyRelased()that check if the key is relased or not returns true or false
                this.gameObj.play("idle")
                this.isMoving = false
            }   
        })
    }

    respawnPlayer() {
        if( this.lives > 0 ){
            this.lives--
            this.gameObj.pos = vec2( this.intialX, this.intialY )        //every gameObj have position or .pos attribute inbuilt
            this.isRespawning = true
            setTimeout(() => this.isRespawning = false, 1000)        //try to add blinking effect on the player when respawn
        }else{
            go("gameOver")
        }
    }

    enableMobVunerability(){
        function hitandRespawn(context){
            play("hit", {speed:1.5})
            context.respawnPlayer()        //we cant use this. keyword becs we are in func. and calling another func. which we cant do
        }
        this.gameObj.onCollide("spiders", () => hitandRespawn(this)) // hitandRespawn(context) context == this.
        this.gameObj.onCollide("flame", () => hitandRespawn(this))  //.onCollide(tagname , calling function)
        this.gameObj.onCollide("fish", () => hitandRespawn(this))
        this.gameObj.onCollide("axes", () => hitandRespawn(this))
        this.gameObj.onCollide("saws", () => hitandRespawn(this))
        this.gameObj.onCollide("birds", () => hitandRespawn(this))
    }

    update() {
        onUpdate(() => {                   //this runs function every frame
            if(this.gameObj.isGrounded()){
                this.jumpOnce = false
                this.timeSinceLastGrounded = time()
            }
            this.heightDelta = this.previousHeight - this.gameObj.pos.y   //perviousHeight is the height we have given in main.js and gameObj.pos.y gives the current height because of onUpdate funct which runs this funct every frame and we get height in every frame
            this.previousHeight = this.gameObj.pos.y
            
            if( this.gameObj.pos.y > 500){
                play("hit")
                this.respawnPlayer() 
            }

            if( !this.isMoving && this.gameObj.curAnim() !== "idle"){
                this.gameObj.play("idle")
            }

            if( !this.gameObj.isGrounded() && this.heightDelta > 0 && this.gameObj.curAnim() !== "jump-up"){
                this.gameObj.play("jump-up")
            }

            if( !this.gameObj.isGrounded() && this.heightDelta < 0 && this.gameObj.curAnim() !== "jump-down"){
                this.gameObj.play("jump-down")
            }

        })
    }

    updateLiveCount(livesCountUI){
        onUpdate(() => {
            livesCountUI.text = this.lives
        })
    }

    updateCoinCount(coinCountUI){
        onUpdate(() => {
            coinCountUI.text = `${this.coins} / ${coinCountUI.fullCoinCount}`
            if(this.coins === coinCountUI.fullCoinCount){
                go(this.isInTerminalScene ? "end" : this.currentLevelScene + 1) //terminalscene here means the Ui page where u won the game other wise it will forward u to the next stage
            }
        })
    }
}