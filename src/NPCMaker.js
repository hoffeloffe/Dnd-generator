import { getValue } from "@testing-library/user-event/dist/utils";
import React, { useState, useEffect } from "react";

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
    
    componentDidMount()
    {

    }
    
    render()
    {
        var stats = [15, 14, 13, 12, 10, 8];
    
        
        return (
            <>
                <WatchWithHooks />
                <DisplayStats 
                str = {StandardArray(stats)} 
                dex = {StandardArray(stats)}  
                con = {StandardArray(stats)}  
                wis = {StandardArray(stats)}  
                int = {StandardArray(stats)}  
                cha = {StandardArray(stats)}
                />
           </>
        );
    }
  }

  let characterContainerElement = document.getElementById("CharacterContainer");
  let inputName = document.getElementById('inputname');
  let inputRace = document.getElementById("inputRace");
  let inputClas = document.getElementById("inputClass");
  
  let charTemp = document.getElementById("CharacterTemplate");
  let creatbtn = document.getElementById("btnCreate");




creatbtn.onclick = function()
{
    createCharector(inputName.value, inputRace.value, inputClas.value);
    inputName.value = "";
    inputRace.value = "";
    inputClas.value = "";

}

function createCharector(Name,Race,Dndclass)
{
    if(Name === '')
    Name = "Hoffe";
    if(Race === '')
    Race = "Human";
    if(Dndclass === '')
    Dndclass = "Programer";
    
    let clonedCharacter = charTemp.cloneNode(true);
    clonedCharacter.removeAttribute("hidden");
    clonedCharacter.removeAttribute("CharacterTemplate");

    let clonedName = clonedCharacter.getElementsByClassName("CharacterName")[0];
    clonedName.innerText = Name;

    let raceName = clonedCharacter.getElementsByClassName("RaceName")[0];
    raceName.innerText = Race;

    let dndclass = clonedCharacter.getElementsByClassName("dndclass")[0];
    dndclass.innerText = Dndclass;

    let clonedButton = clonedCharacter.getElementsByTagName("button")[0];

    clonedButton.onclick = function()
    {
        this.parentNode.remove();
    };
    
    characterContainerElement.appendChild(clonedCharacter);
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