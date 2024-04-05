export function attachCamera(attachedObj, offsetX, fixedY){
    
    onUpdate(() => {                                    //onUpdate function it runs evey frame
        camPos(attachedObj.pos.x + offsetX, fixedY)// camPos allow us to change positions of game object(player) of camera specially and this.attachedObj is player position and offset is if we want to move camera left or right or up or down
    })

}
