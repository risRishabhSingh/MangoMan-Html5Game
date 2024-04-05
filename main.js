import kaboom from "./libs/kaboom.mjs"
import { Loader } from "./utils/Loader.js"
import { Ui } from "./utils/UI.js"
import { Level } from "./utils/Level.js"
import { level1Layout, level1Mappings } from "./content/level1/level1Layot.js"
import { Player } from "./entities/Player.js"
import { attachCamera } from "./utils/Camera.js"
import { level1Config } from "./content/level1/config.js"
import { level2Config } from "./content/level2/config.js"
import { level3Config } from "./content/level3/config.js"
import { level2Layout, level2Mappings } from "./content/level2/level2Layout.js"
import { level3Layout, level3Mappings } from "./content/level3/level3Layout.js"
import { Spiders } from "./entities/spider.js"
import { Projectiles } from "./entities/Projectiles.js"
import { Axes } from "./entities/Axes.js"
import { Saws } from "./entities/Saw.js"
import { Bird } from "./entities/Bird.js"

//Class are in upper case and lower case is function
kaboom({
    width: 1280,
    height: 720,
    letterbox: true         //letterbox property ensures that the canvas is resized when the user resizes
})

Loader.fonts()          //loading font in games
Loader.assets()         //loading images and sprites in game
Loader.sounds()         //loading sound in games

//organizing our level or scenes in game
const scenes = {
    menu: () => {
        Ui.displayMainMenu()
    },
    control: () => {
        Ui.displayControlsMenu()
    },
    1: () => {
        const water = play("water-ambience", {
            volume: 0.2,
            loop:true
        })
        onSceneLeave(() => {
            water.paused = true
        })

        setGravity(1400)

        const level1 = new Level()
        level1.drawBackground("forest-background")
        level1.drawMapLayout(level1Layout, level1Mappings)

        const player = new Player(level1Config.playerStartPosX, level1Config.playerStartPosY, level1Config.playerSpeed, level1Config.jumpForce, level1Config.nbLives, 1, false)

        player.enablePassthrough()
        player.enableCoinPickUp()
        player.enableMobVunerability()
        player.update()

        const spiders = new Spiders(
            level1Config.spiderPositions.map(spiderPos => spiderPos()),          //we want spiders at these location
            level1Config.spiderRanges,                      //we want it to have range 300px distance
            level1Config.spiderVelocity,                        //durations it crawls to 300px in 2sec
            level1Config.spiderType                           //type of spider
        )

        spiders.setMovementPattern()
        spiders.enablePassthrough()

        const fish = new Projectiles(
            level1Config.fishPositions.map(fishPos => fishPos()),
            level1Config.fishRanges,
            "fish"
        )
        fish.setMovementPatterns()

        attachCamera(player.gameObj, 0, 200)


        level1.drawWave("water", "wave")  //water sprite is call with wave anim

        Ui.addDarkBg()

        Ui.displayCoinCount() //calling this to display sprite and text
        player.updateCoinCount(Ui.coinCountUI) //calling this to update the text of the text that is displayed by the Ui.displayCoinCount()

        Ui.displayLiveCount()
        player.updateLiveCount(Ui.livesCountUI)
    },
    2: () => {
        const lava = play("lava-ambience", {
            volume: 0.2,
            loop:true
        })
        onSceneLeave(() => {
            lava.paused = true
        })

        setGravity(1400)

        const level2 = new Level()
        level2.drawBackground("brick-bg")
        level2.drawMapLayout(level2Layout, level2Mappings)

        const player = new Player(level2Config.playerStartPosX, level2Config.playerStartPosY, level2Config.playerSpeed, level2Config.jumpForce, level2Config.nbLives, 2, false)

        player.enablePassthrough()
        player.enableCoinPickUp()
        player.enableMobVunerability()
        player.update()

        const spiders = new Spiders(
            level2Config.spiderPositions.map(spiderPos => spiderPos()),          //we want spiders at these location
            level2Config.spiderRanges,                      //we want it to have range 300px distance
            level2Config.spiderDurations,                        //durations it crawls to 300px in 2sec
            level2Config.spiderType                           //type of spider
        )

        spiders.setMovementPattern()
        spiders.enablePassthrough()

        const flame = new Projectiles(
            level2Config.flamePositions.map(fishPos => fishPos()),
            level2Config.flameRanges,
            "flame"
        )
        flame.setMovementPatterns()

        const axes = new Axes(level2Config.axesPositions.map(axePos => axePos()), level2Config.axesSwingDurations)
        axes.setMovementPattern()

        const saws = new Saws(level2Config.sawPositions.map(sawPos => sawPos()),level2Config.sawRanges)
        saws.setMovementPattern()

        attachCamera(player.gameObj, 0, 200)

        level2.drawWave("lava", "wave")

        Ui.addDarkBg()

        Ui.displayCoinCount()
        player.updateCoinCount(Ui.coinCountUI)
        Ui.displayLiveCount()
        player.updateLiveCount(Ui.livesCountUI)
    },
    3: () => {
        const wind = play("strong-wind", {
            volume: 0.2,
            loop:true
        })
        onSceneLeave(() => {
            wind.paused = true
        })

        setGravity(1400)

        const level3 = new Level()
        level3.drawBackground("sky-background-0")
        level3.drawBackground("sky-background-1")
        level3.drawBackground("sky-background-2")
        level3.drawMapLayout(level3Layout, level3Mappings)

        const player = new Player(level3Config.playerStartPosX, level3Config.playerStartPosY, level3Config.playerSpeed, level3Config.jumpForce, level3Config.nbLives, 3, true)

        player.enablePassthrough()
        player.enableCoinPickUp()
        player.enableMobVunerability()
        player.update()

        const birds = new Bird(
            level3Config.birdPositions.map(birdPos => birdPos()),
            level3Config.birdRanges
        )
        birds.setMovementPattern()

        attachCamera(player.gameObj, 0, 200)

        level3.drawWave("clouds", "wave")
        level3.drawWave("clouds", "wave-reversed")

        Ui.addDarkBg()

        Ui.displayCoinCount()
        player.updateCoinCount(Ui.coinCountUI)
        Ui.displayLiveCount()
        player.updateLiveCount(Ui.livesCountUI)

    },
    gameOver: () => {
        Ui.displayGameOverScreen()
    },
    end: () => {
        Ui.displayEndGameScreen()
    }
}

//this is for loop is used so that we could load scenes in scene function is kaboom like preloading type
for (const key in scenes) {
    scene(key, scenes[key])
}


go("1") // go is used to call the scene to display and u can use to go to a particular level