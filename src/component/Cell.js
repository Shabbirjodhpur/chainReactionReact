import React from 'react'

class Cell extends React.Component{
    constructor(){
        super()
        this.colors=["red","green"]
    }
    getColor(){
        const index = this.props.playersList.indexOf(this.props.cellData.player)
        return index===-1 ? "white":this.colors[index]
    }
    render(){
        const color=this.getColor()
        const myStyle={
            padding:"5px",
            backgroundColor:color,
            border:"1px solid black",
            margin:"5px",
            boxShadow:"rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px",
            height:`8vh`,
            width:'8vw'
        }
        return(
            <span>
                <button style={myStyle} onClick={()=>this.props.handle(this.props.cellData.pos)}>{`${this.props.cellData.count}`}</button>
            </span>
        )
    }
}

export default Cell