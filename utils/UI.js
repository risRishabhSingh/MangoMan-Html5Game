class UI {
    displayLiveCount(player) {
        this.livesCountUI = add([       //this way we can acces the text and any component that is written inside it.
            text("", {
                font: "Round",
                size: 50
            }),
            fixed(),
            pos(70, 10)
        ])

        this.livesCountUI.add([
            sprite("star-icon"),
            pos(-60, -5),
            scale(3),
            fixed()
        ])
    }

    displayCoinCount(player) {
        this.coinCountUI = add([  //this way we can acces the text and any component that is written inside it.
            text("", {
                font: "Round",
                size: 50
            }),
            {
                fullCoinCount: get("coin", { recursive: true }).length   //get is used to retrieve any game object using tag name recusive true becs to get all the coins sometime it get empty array, whole line mean get will return array of all coins  
            },
            fixed(), //so that it does not move with camera,we want to be fixed
            pos(70, 70)
        ])

        this.coinCountUI.add([  //this way we cant access any property
            sprite("coin-icon"),
            pos(-60, 0),     //this position is relative to the parent position
            scale(3),
            fixed()
        ])

    }

    displayBlinkingText(content, position) {
        const message = add([
            text(content, {                 //text(param, {font properties u want to add in param}) param is the text we want to show
                size: 24,
            }),
            area(),                 // generally this is used o give hit box to characters but we have to use anchor tag so we used area 
            anchor("center"),       // anchor tag is used so that we could center the alignment of message (message(text) box center) 
            pos(position),
            opacity(),              //opacity is is not enter because we have to change opacity so that blinking effects could occurs
            state("flash-up", ["flash-up", "flash-down"])       //state(inital , [initial state, final-state])
        ])

        message.onStateEnter("flash-up", async () => {  //we have used state in above add so when we enter the state this function will tiggers
            await tween(                             //tween is used to make effects like in this case we r making blinking effect
                message.opacity,                    // we have used opacity in add so we can use opacity in this function opacity is 1
                0,                //target value so that current opacity go to 0     
                0.5,              //time in sec *****(we want to change opacity of message from 1 to 0 in 0.5 sec)******
                (nextOpacityValue) => message.opacity = nextOpacityValue, // we want to enter the new opacity value in old opacity **(this funtion will be called everytime when the opacity is changed) **
                easings.linear  //easings determine the rate at which the opacity value will change like from 1->0.9->0.8(in linear term)
            )
            message.enterState("flash-down")
        })

        message.onStateEnter("flash-down", async () => {  //we have used state in above add so when we enter the state this function will tiggers
            await tween(                           //tween is used to make effects like in this case we r making blinking effect
                message.opacity,                    // we have used opacity in add so we can use opacity in this function opacity is 0
                1,                                  //target value so that current opacity go to 1     
                0.5,                                //time in sec *****(we want to change opacity of message from 1 to 0 in 0.5 sec)******
                (nextOpacityValue) => message.opacity = nextOpacityValue, // we want to enter the new opacity value in old opacity **(this funtion will be called everytime when the opacity is changed) **
                easings.linear  //easings determine the rate at which the opacity value will change like from 0->0.1->0.2(in linear term)
            )
            message.enterState("flash-up") //use to call the flash-up state again to make blinking effect
        })
    }

    displayMainMenu() {
        add([
            sprite("forest-background"),          //this is how to add sprite in game
            scale(4)                              // this is used to increase the size of the background
        ])
        add([
            sprite("logo"),
            area(),
            anchor("center"),
            pos(center().x, center().y - 200),       //wanted the logo to be in in x axis but nit high in top 
            scale(8)
        ])

        // this is use to call funtion or method(in terms of oops)
        this.displayBlinkingText(               //in above line 2 it got 2 parameters content and position displayBlinkingText(content,position) 
            "Press [ Enter ] to Start Game",         //content line
            vec2(center().x, center().y + 200)     // vec2 is kaboom func that is used to give X and Y position in single term 
        )

        onKeyPress("enter", () => {        //eventlistener by kaboom when enter key is pressed inner function will run
            play("confirm-ui")         // play("soundName", {param like speed:1.5}) use to play sound
            go("control")             //go is used to navigated through pages(or scene) and when pressed enter u will be navigated to control scene
        })
    }

    displayControlsMenu() {
        add([
            sprite("forest-background"),
            scale(4)
        ])
        add([
            text("Control", { font: "Round", size: 50 }),
            area(),
            anchor("center"),
            pos(center().x, center().y - 100)
        ])
        add([
            sprite("arrow-keys"),
            scale(0.15),
            area(),
            anchor("center"),
            pos(center().x + 100, center().y + 75)
        ])
        add([
            sprite("space-bar"),
            scale(0.15),
            area(),
            anchor("center"),
            pos(center().x - 150, center().y + 100)
        ])
        add([
            text("Jump", { font: "Round", size: 25 }),
            pos(center().x - 170, center().y + 170)
        ])
        add([
            text("Move", { font: "Round", size: 25 }),
            pos(center().x + 75, center().y + 170)
        ])
        this.displayBlinkingText(
            "Press [ Enter ] to Start Game",
            vec2(center().x, center().y + 300)
        )
        onKeyPress("enter", () => {
            play("confirm-ui"),
                go(1)
        })
    }

    displayGameOverScreen() {
        add([rect(1280, 720), color(0, 0, 0)])
        add([
            text("Game Over!", { size: 50, font: "Round" }),
            area(),
            anchor("center"),
            pos(center()),
        ])

        this.displayBlinkingText(
            "Press [ Enter ] to Start Game",
            vec2(center().x, center().y + 100)
        )

        onKeyPress("enter", () => {
            play("confirm-ui")
            go(1)
        })
    }

    displayEndGameScreen() {
        add([rect(1280, 720), color(0, 0, 0)])
        add([
            text("You Won! Thanks for Playing.", { size: 50, font: "Round" }),
            area(),
            anchor("center"),
            pos(center()),
        ])

        this.displayBlinkingText(
            "Press [ Enter ] to Play Again",
            vec2(center().x, center().y + 100)
        )

        onKeyPress("enter", () => {
            play("confirm-ui")
            go("menu")
        })
    }

    addDarkBg() {
        add([rect(270, 130), color(0, 0, 0), fixed()])
    }
}

export const Ui = new UI() 