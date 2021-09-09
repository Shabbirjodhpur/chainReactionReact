import React from 'react'
import Cell from './Cell'

class Row extends React.Component{
    render(){
        const cellList = this.props.rowData.map(cell => <Cell playersList={this.props.playersList} handle={this.props.handle} cellData={cell} key={cell.pos}/>)

        return(
            <div>{cellList}</div>
        )
    }
}

export default Row