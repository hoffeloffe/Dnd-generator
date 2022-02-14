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
        name: ""
      };
      this.handleChange = this.onChange.bind(this);
    }

    onChange(event){
        let inputName = event.target.name;
        let inputValue = event.target.value;
        this.setState({[inputName]: inputValue});
    }

    render()
    {
        var stats = [15, 14, 13, 12, 10, 8];

        return (
            <>
                <Ui onChange={this.onChange} stats ={this.state} />
                <WatchWithHooks />
                <DisplayStats str = {StandardArray(stats)} dex = {StandardArray(stats)}  con = {StandardArray(stats)}  wis = {StandardArray(stats)}  int = {StandardArray(stats)}  cha = {StandardArray(stats)}/>
           </>
        );
    }
    
    
}

function Ui(props)
{
    return(
        <>
            <h1>Character creator</h1>
            <label>Character name</label>
            <br/>
            <input onChange={props.onChange} name="name" value={props.name}></input>
            <br/>
            <label>Pick race</label>
            <br/>
            <select> Race
                <option>Elver</option>
                <option>Dwarf</option>
                <option>Orc</option>
                <option>Undead</option>
            </select> <br/>

            <button>Create</button>
        
        <hr/>
        <div className="CharacterInfoBox">
            <label className="Box">Character Info</label>
            <hr/>
            <label className="name">Name:{props.stats.name}</label>
            <br/>
            <label className="race">Race:</label>
            <br/>
            <label>Stats:</label>
            <br/>
            <div className="stats">
                <label> 
                         Str: {props.stats.Str}
                    <br/>Dex: {props.stats.Dex}
                    <br/>Con: {props.stats.Con}
                </label>
                <label>
                    <br/>Int: {props.stats.Int}
                    <br/>Wis: {props.stats.Wis}
                    <br/>Cha: {props.stats.Cha}
                </label>
            </div>
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