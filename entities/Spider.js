export class Spiders {
    //ranges is the back and forth movement of the spiders, durations is the speed of the spider, positions where the spiders are.
    constructor( positions, ranges, durations, type){  //pos and ranges and durations are in the form of input arrays
        this.ranges = ranges,
        this.durations = durations
        this.spiders = []       //this contains the gameobj of all the spiders that we create
        for (const position of positions) {
            this.spiders.push(
                add([
                    sprite(`spider-${type}`, { anim: "crawl" }),
                    pos(position),
                    area({
                        shape: new Rect(vec2(0 , 4.5), 20, 6),  //the Rect(pos) pos is relative to the position of the gameObj, width, height
                        collisionIgnore: ["spiders"]
                    }),
                    anchor("center"),
                    body(),
                    scale(4),
                    state("idle", ["idle", "crawl-left", "crawl-right"]),       //state(default, [define all the states])
                    offscreen(), //when the mob is out of view then any computation and colision is stopped so to improve the performance of game
                    "spiders"
                ])
            )
        }
    }

    async crawl(spider, moveBy, duration) {
        if(spider.curAnim() !== "crawl") spider.play("crawl")

        await tween(
            spider.pos.x,               //current position of spider
            spider.pos.x + moveBy,      //range of distance we want to move the spider from current position
            duration,                   //duration we want the anim play
            (posX) => (spider.pos.x = posX),    //position is changes progressively
            easings.easeOutSine                  // this the pattern how position is changed
        )
    }

    setMovementPattern() {
        //entries() gives us both index and element so that we could assign amplitude and durations to each of the spiders
        for (const [index, spider] of this.spiders.entries()){  
            //we have put it into const becs when we want to cancel the event and we want to cancel so that, out of view of camera we want to cancel the computation to increase performance of the game and the sound of spider from previous level will hear in next stage also    
            const idle = spider.onStateEnter("idle", async (previousState) => {
                if(spider.curAnim() !== "idle") spider.play("idle")

                await new Promise((resolve) => {    // we want spider to wait for 1 sec before proceeding to next functions or code
                    setTimeout(() => resolve(), 1000);
                })

                if( previousState === "crawl-left"){
                    spider.enterState("crawl-right")
                    return //return here means that after this if runs no other code will run that is wriiten after this if
                }

                spider.jump()  //use to jump the spider to attack the player

                if(!spider.isOffScreen()) {
                    play("spider-attack", { volume: 0.6 , speed: 2.5, seek: 6}) //allows you to specify the start time of the audio in seconds
                }

                spider.enterState("crawl-left")
            })

            const crawlLeft = spider.onStateEnter("crawl-left", async () => {
                spider.flipX = false
                await this.crawl(
                    spider,
                    -this.ranges[index],  //so that we give specific spider there specific ranges
                    this.durations[index],   //so that we give specific spider there specific durations
                )
                spider.enterState("idle", "crawl-left") //.enterState(default State, previousState)
            })

            const crawlRight = spider.onStateEnter("crawl-right", async () => {
                spider.flipX = true
                await this.crawl(
                    spider,
                    this.ranges[index],
                    this.durations[index]
                )
                spider.enterState("idle")
            })

            onSceneLeave(() => {        //when the player leave the scene this function will triggers
                idle.cancel()
                crawlLeft.cancel()
                crawlRight.cancel()
            })
        }
    }

    enablePassthrough(){
        for(const spider of this.spiders){
            spider.onBeforePhysicsResolve((collision) => {
                if(collision.target.is("passthrough") && spider.isJumping()){
                    collision.preventResolution()
                }
            })
        }
    }
}