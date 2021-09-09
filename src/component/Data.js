const height=10
const width=10
var intialState = []
for(let i=0;i<height;i++){
    intialState[i]=[]
    for(let j=0;j<width;j++){
        intialState[i].push({count:0,player:null,pos:(i*width+j)})
    }
}

export default intialState