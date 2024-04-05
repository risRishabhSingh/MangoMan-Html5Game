export class Level {
    
    drawWave(type, anim){
        let offset = -100
        for ( let i = 0; i < 21; i++){
            add([sprite(type, {anim}), pos(offset,600), scale(4), fixed()])
            offset += 64
        }
    }

    drawMapLayout(levelLayout,mappings){
        const layerSettings = {
            tileWidth: 16,  //this is 16 beacuse the platform assets are build on 48x48 which mean 16 pixels x 3 = 48 pixel thats why in loader.js 
            tileHeight: 12, //we sliceX in 3 part and sliceY in 4 x 12pixels = 48 pixels 
            tiles:mappings  
        }
        
        this.map = []
        for(const layerLayout of levelLayout){
            this.map.push(addLevel(layerLayout,layerSettings))
        }

        for(const layer of this.map){
            layer.use(scale(4))
        }

    }
    
    drawBackground(bgSpriteName){
        add([
            sprite(bgSpriteName), fixed(), scale(4)    //fixed is used to fix the bg when camera moves
        ])
    }
}