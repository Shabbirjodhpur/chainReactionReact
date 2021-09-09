//{count:0,player:null,pos:(i*width+j)}
export default function chainReaction(newState,x,y){
    multiply(newState,x,y)

    return newState
}
function multiply(newState,x,y){
    if(inBound(x,y,newState)) return
    //set it to zero
    //increment all neighbours
    //mutiply all neighbours
    const oldPlayer = newState[x][y].player

    newState[x][y].count = 0
    newState[x][y].player = null

    const allNeighbours = getNeighbours(x,y)
    for(let i=0;i<allNeighbours.length;i++){
        let a = allNeighbours[i][0]
        let b = allNeighbours[i][1]

        newState[a][b].count++
        newState[a][b].player = oldPlayer
        multiply(newState,a,b)
    }
}
function inBound(x,y,newState){
    //case 1:corner pieces
    if(
        (x === 0 || x=== newState.length-1) &&
        (y === 0 || y=== newState[0].length-1)
    ) {
        if(newState[x][y].count>1) return false
    }
    //case 2:borders
    if(
        (x===0 || x===newState.length -1) ||
        (y===0 || y===newState[0].length-1)
    ) {
        if(newState[x][y].count>2) return false
            
    }
    // case 3:center pieces
    if(newState[x][y].count>3) return false

    return true
}

function getNeighbours(x,y){
    const allNeighbours = [
        [x-1,y],
        [x+1,y],
        [x,y-1],
        [x,y+1]
    ]
    const validNeighbours = allNeighbours.filter(unit=>{
        if(checkValid(unit)){
            return true
        }
        return false
    })
    return validNeighbours
}
function checkValid(unit){
    let x=unit[0]
    let y=unit[1]
    if(x<0 || x>9) return false
    if(y<0 || y>9) return false
    return true
}