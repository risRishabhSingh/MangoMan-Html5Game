export const Loader = {
    fonts: () => {
        loadFont("Round", "./assets/Round9x13.ttf")
    },
    assets: () => {
        loadSprite("arrow-keys", "./assets/arrow-Keys.png")
        loadSprite("space-bar", "./assets/spaceBar.png")

        loadSprite("star-icon", "./assets/Stars_Ui.png")
        loadSprite("coin-icon", "./assets/Coins_Ui.png")
        loadSprite("coin", "./assets/Coin.png")
        loadSprite("bridge", "./assets/Bridge.png")

        loadSprite("forest-background", "./assets/Forest_Background_0.png")
        loadSprite("logo", "./assets/Logo.png")
        loadSprite("grass-tileset", "./assets/Grass_Tileset.png", {
            sliceX: 3,               //this divides the tiles in 3 equal part in x direc.(**disgner know there are 3 tiles in x row)
            sliceY: 4,               //this divides the tiles in 4 equal part in y direction(**disgner know he used 4 tile in y direction)
            anims: {
                tl: 0, //here 0 is not taken because in general 0 (top left tile) will picked first so we have to specify after 0 tile
                tm: 1,             //1 is the slice of top middle in grass tiles they are numbered(0:topleft, 1:topmiddle, 2: topright) 
                tr: 2,
                ml: 3,
                mm: 4,
                mr: 5,
                bl: 6,
                bm: 7,
                br: 8
            }
        })
        loadSprite("grass-oneway-tileset", "./assets/Grass_Oneway.png", {
            sliceX: 3,
            sliceY: 4,
            anims: {
                tm: 1,             //1 is the slice of top middle in grass tiles they are numbered(0:topleft, 1:topmiddle, 2: topright) 
                tr: 2,
                ml: 3,
                mm: 4,
                mr: 5,
                bl: 6,
                bm: 7,
                br: 8
            }
        })

        loadSprite("brick-bg", "./assets/Castle_Background_0.png")
        loadSprite("brick-tileset", "./assets/Brick_Tileset.png", {
            sliceX: 3,
            sliceY: 4,
            anims: {
                tl: 0,
                tm: 1,
                tr: 2,
                ml: 3,
                mm: 4,
                mr: 5,
                bl: 6,
                bm: 7,
                br: 8
            }
        })
        loadSprite("brick-oneway-tileset", "./assets/Brick_Oneway.png", {
            sliceX: 3,
            sliceY: 4,
            anims: {
                tm: 1,
                tr: 2,
                ml: 3,
                mm: 4,
                mr: 5,
                bl: 6,
                bm: 7,
                br: 8
            }
        })

        loadSprite("sky-background-0", "./assets/Sky_Background_0.png")
        loadSprite("sky-background-1", "./assets/Sky_Background_1.png")
        loadSprite("sky-background-2", "./assets/Sky_Background_2.png")

        loadSprite("rock-tileset", "./assets/Grass_Rock_Tileset.png", {
            sliceX: 3,
            sliceY: 4,
            anims: {
                tl: 0,
                tm: 1,
                tr: 2,
                ml: 3,
                mm: 4,
                mr: 5,
                bl: 6,
                bm: 7,
                br: 8,
            },
        })
        loadSprite("rock-oneway-tileset", "./assets/Grass_Rock_Oneway.png", {
            sliceX: 3,
            sliceY: 4,
            anims: {
                tl: 0,
                tm: 1,
                tr: 2,
                ml: 3,
                mm: 4,
                mr: 5,
                bl: 6,
                bm: 7,
                br: 8,
            },
        })
        loadSprite("clouds", "./assets/Clouds.png", {
            sliceX: 8,
            sliceY: 1,
            anims: {
                wave: {
                    from: 0,
                    to: 7,
                    speed: 16,
                    loop: true,
                },
                "wave-reversed": {
                    from: 7,
                    to: 0,
                    speed: 16,
                    loop: true,
                },
            },
        })

        loadSprite("water", "./assets/Water.png", {
            sliceX: 8,     //sliceX tell us how many columns are there
            sliceY: 1,    //sliceY tell us how many rows are there
            anims: {
                wave: {
                    from: 0,
                    to: 7,
                    speed: 16,   //16 frame per sec
                    loop: true
                }
            }
        })

        loadSprite("player", "./assets/Player.png", {
            sliceX: 4,
            sliceY: 6,
            anims: {
                idle: {
                    from: 0,
                    to: 3,
                    loop: true
                },
                run: {
                    from: 4,
                    to: 7,
                    loop: true
                },
                "jump-up": 8,
                "jump-down": 9
            }
        })

        loadSprite("lava", "./assets/Lava.png", {
            sliceX: 8,     //sliceX tell us how many columns are there
            sliceY: 1,    //sliceY tell us how many rows are there
            anims: {
                wave: {
                    from: 0,
                    to: 7,
                    speed: 16,   //16 frame per sec
                    loop: true
                }
            }
        })

        loadSprite("sky-low", "./assets/Sky_Background_1.png", {
            sliceX: 8,     //sliceX tell us how many columns are there
            sliceY: 1,    //sliceY tell us how many rows are there
            anims: {
                wave: {
                    from: 0,
                    to: 7,
                    speed: 16,   //16 frame per sec
                    loop: true
                }
            }
        })

        loadSprite("sky-low2", "./assets/Sky_Background_2.png", {
            sliceX: 8,     //sliceX tell us how many columns are there
            sliceY: 1,    //sliceY tell us how many rows are there
            anims: {
                wave: {
                    from: 0,
                    to: 7,
                    speed: 16,   //16 frame per sec
                    loop: true
                }
            }
        })

        loadSprite("spider-1", "./assets/Spider_1.png", {
            sliceX: 3,
            sliceY: 1,
            anims: {
                crawl: { from: 0, to: 2, loop: true },
                idle: 0
            }
        })

        loadSprite("spider-2", "./assets/Spider_2.png", {
            sliceX: 3,
            sliceY: 1,
            anims: {
                crawl: { from: 0, to: 2, loop: true },
                idle: 0
            }
        })

        loadSprite("fish", "./assets/Fish_1.png", {
            sliceX: 2,
            sliceY: 1,
            anims: {
                swim: { from: 0, to: 1, loop: true },
            },

        })

        loadSprite("flame", "./assets/Flame_1.png", {
            sliceX: 2,
            sliceY: 1,
            anims: {
                burn: { from: 0, to: 1, loop: true }
            }
        })

        loadSprite("axe", "./assets/Axe_Trap.png")
        loadSprite("saw", "./assets/Circular_Saw.png")
        loadSprite("bird", "./assets/Bird_2.png", {
            sliceX: 3,
            sliceY: 1,
            anims: {
                fly:{
                    from: 0,
                    to: 2,
                    speed: 9,
                    loop: true,
                }
                
            }
        })

    },
    sounds: () => {
        loadSound("confirm-ui", "./sound/confirm.mp3")
        loadSound("jump", "./sound/jump.mp3")
        loadSound("hit", "./sound/punch.mp3")
        loadSound("coin", "./sound/coin.mp3")
        loadSound("spider-attack", "./sound/spider-attack.mp3")
        loadSound("swinging-axe" , "./sound/swinging axe.mp3")
        loadSound("saw", "./sound/saw.mp3")
        loadSound("dive", "./sound/dive.mp3")
        loadSound("water-ambience", "./sound/water-ambience.mp3")
        loadSound("lava-ambience", "./sound/lava.mp3")
        loadSound("strong-wind", "./sound/strong wind.mp3")
    }
}