import React, { useState, useEffect } from "react";
import "./GameBrowser.css"

class PlayerList extends React.Component {
    constructor() {
      super();
      this.state = {
        Dex: 8,
        Str: 8,
        Wis: 8,
        Con: 8,
        Cha: 8,
        Int: 8,
      };
    }
    
    render()
    {
        var stats = [15, 14, 13, 12, 10, 8];
        return (
            <>
                <Ui />
                <WatchWithHooks />
                <DisplayStats str = {StandardArray(stats)} dex = {StandardArray(stats)}  con = {StandardArray(stats)}  wis = {StandardArray(stats)}  int = {StandardArray(stats)}  cha = {StandardArray(stats)}/>
           </>
        );
    }
  }

function Ui()
{
    return(
        <>

        <div>
            <select> Race
                <option>Elver</option>
            </select>
        </div>



        </>
    )
}

function StandardArray(props)
{
    var selected = Math.floor(Math.random()*props.length);
    var stat = props[selected]
    props.splice(selected, 1);
    return stat
}




function WatchWithHooks()
{
    let date = useDate();

    return(<h1>{date.toLocaleTimeString()}</h1>)
}

function useDate()
{
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        let id = setInterval(() => setDate(new Date()),100);
        return () => clearInterval(id);
    })

    function updateTime(){
        setDate(new Date());
    }

    return date;
}


function DisplayStats(props){
    return(
        <>
            <h3>Stats</h3>
            <div>Strength: {props.str}</div>
            <div>Dexterity: {props.dex}</div>
            <div>Constitution: {props.con}</div>
            <div>Intelligence: {props.int}</div>
            <div>Wisdom: {props.wis}</div>
            <div>Charisma: {props.cha}</div>
        </>
    )
}

export default PlayerList;