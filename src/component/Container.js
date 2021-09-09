import React from 'react'
import '../App.scss';
import initialState from './Data'
import Row from './Row.js'
import chainReaction from './chainReaction.js'

class Container extends React.Component{
    constructor(){
        super()
        this.playersList=["shabbir","abbas"]
        this.count=0
        this.steps=0
        this.win=false
        this.state={
            data:initialState,
            player:this.playersList[0]
        }
        this.increment=this.increment.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.updatePlayer=this.updatePlayer.bind(this)
    }
    checkWin(){
        var first_saw=null
        for(let i=0;i<this.state.data.length;i++){
            for(let j=0;j<this.state.data[0].length;j++){
                if(this.state.data[i][j].player!=null){
                    if(first_saw==null){
                        first_saw = this.state.data[i][j].player
                    } else{
                        if(first_saw !==this.state.data[i][j].player){
                            return
                        }
                    }
                }   
            }
        }
        if(first_saw!=null){
            this.win =true
        }
        return
    }
    updatePlayer(){
        this.count++
        this.count=this.count%this.playersList.length
        this.setState(prevState=>{
            return{
                ...prevState,
                player:this.playersList[this.count]
            }
        })
    }
    handleChange(pos){
        let x= Math.floor(pos/this.state.data[0].length)
        let y= pos%this.state.data.length

        if(!this.check(x,y,this.state.player)) return

        this.increment(pos,this.state.player)

        this.updatePlayer()
    }
    check(x,y,player){
        if(this.state.data[x][y].player===null) return true
        if(this.state.data[x][y].player===player) return true

        return false
    }
    increment(pos,new_player){
        this.steps++
        if(this.steps>2){
            this.checkWin()
            if(this.win) return
        }
        if(this.win) return
        var newState = this.state.data.map(row=>{
            const newRow = row.map(cell=>{
                return {
                    ...cell
                }
            })
            return newRow
        })
        
        //checking whether incrementing it will cause chain reaction
        let x= Math.floor(pos/this.state.data[0].length)
        let y= pos%this.state.data.length

        newState[x][y].count +=1
        newState[x][y].player =new_player
        chainReaction(newState,x,y)

        this.setState( prevState => {
            return {
                ...prevState,
                data:newState
            }
        })
    }
    render(){
        const rowLists = this.state.data.map(row => <Row 
            playersList={this.playersList} 
            handle={this.handleChange} 
            rowData={row} 
            key={row[0].pos}
        />)
        return (
            <div>
                <div className="container">
                    {rowLists}
                </div>
                <h3>{this.win?"Game Over":this.state.player}</h3>
            </div>
        )
    }
}

export default Container