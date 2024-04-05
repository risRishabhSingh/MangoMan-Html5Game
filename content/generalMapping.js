export function generateMappings(tileType) {
    return {
        0: () => [
            sprite(`${tileType}-tileset`, { anim: "tl"} ),
            area(),      //this create hitbox so that player could land on it 
            body({ isStatic: true }),                //if static is applied then ur object will not be affected by gravity and will not fall
            offscreen()               //usefull to maintain fps it reduces calculation when tiles or character is outside the game or end
        ],
        1: () => [
            sprite(`${tileType}-tileset`, { anim: "tm" }),  //anims in loader.js
            area(),
            body({ isStatic: true }),
            offscreen()
        ],
        2: () => [
            sprite(`${tileType}-tileset`, { anim: "tr" }),
            area(),
            body({ isStatic: true }),
            offscreen(),
        ],
        3: () => [
            sprite(`${tileType}-tileset`, { anim: "ml" }),
            area(),
            body({ isStatic: true }),
            offscreen(),
        ],
        4: () => [sprite(`${tileType}-tileset`, { anim: "mm" }), offscreen()],
        5: () => [
            sprite(`${tileType}-tileset`, { anim: "mr" }),
            area(),
            body({ isStatic: true }),
            offscreen(),
        ],
        6: () => [sprite(`${tileType}-tileset`, { anim: "bl" }), offscreen()],
        7: () => [sprite(`${tileType}-tileset`, { anim: "bm" }), offscreen()],
        8: () => [sprite(`${tileType}-tileset`, { anim: "br" }), offscreen()],
        9: () => [
            sprite(`${tileType}-oneway-tileset`),
            area({ shape: new Rect(vec2(0), 16, 3) }),  //custom hitbox shape ,Rect stand for rectangular hitbox and Rect((starting point X,Y position),height of hitbox, width of hitbox)
            "passthrough",  //this is Tag to identify them 
            body({ isStatic: true }),
            offscreen(),
        ],
        a: () => [
            sprite(`${tileType}-oneway-tileset`, { anim: "tm" }),
            area({ shape: new Rect(vec2(0), 16, 3) }),
            "passthrough",
            body({ isStatic: true }),
            offscreen(),
        ],
        b: () => [
            sprite(`${tileType}-oneway-tileset`, { anim: "tr" }),
            area({ shape: new Rect(vec2(0), 16, 3) }),
            "passthrough",
            body({ isStatic: true }),
            offscreen(),
        ],
        c: () => [
            sprite(`${tileType}-oneway-tileset`, { anim: "ml" }),
            offscreen(),
        ],
        d: () => [
            sprite(`${tileType}-oneway-tileset`, { anim: "mm" }),
            offscreen(),
        ],
        e: () => [
            sprite(`${tileType}-oneway-tileset`, { anim: "mr" }),
            offscreen(),
        ],
        o: () => [sprite("bridge"), area(), body({ isStatic: true }), offscreen()],
        "@": () => [sprite("coin"), area(), "coin", offscreen()], //here "coin" is tag given so we could check collision btw player and coin
    }
}