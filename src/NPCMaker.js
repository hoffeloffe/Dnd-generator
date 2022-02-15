import { getValue } from "@testing-library/user-event/dist/utils";
import React, { useState, useEffect } from "react";
import "./GameBrowser.css"
import { playerNames, playerRace, playerClass  } from "./name.js";

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
    }
    
    render()
    {  
        
        return (
            <>
                <WatchWithHooks />
                <DisplayStats />
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
  let rancrtbtn = document.getElementById("rancrtbtn");

function randomPropNumber(props)
{
    var selected = Math.floor(Math.random()*props.length);
    return selected;
}

rancrtbtn.onclick = function()
{
    createCharector(
        playerNames[randomPropNumber(playerNames)], 
        playerRace[randomPropNumber(playerRace)], 
        playerClass[randomPropNumber(playerClass)],
        DisplayStats()
        );
    inputName.value = "";
    inputRace.value = "";
    inputClas.value = "";
}

creatbtn.onclick = function()
{
    createCharector(inputName.value, inputRace.value, inputClas.value);
    inputName.value = "";
    inputRace.value = "";
    inputClas.value = "";
}

function createCharector(Name,Race,Dndclass,PlayerStats)
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
    clonedName.innerText = "Name:" + " " + Name;

    let raceName = clonedCharacter.getElementsByClassName("RaceName")[0];
    raceName.innerText = "Race:" + " " + Race;

    let dndclass = clonedCharacter.getElementsByClassName("dndclass")[0];
    dndclass.innerText = "Class:" + " " +  Dndclass;

    let playerStats = clonedCharacter.getElementsByClassName("playerStats")[0];
    playerStats.innerText = PlayerStats;

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

function DisplayStats(){
    var stats = [15, 14, 13, 12, 10, 8];
    return(
        <>
            <h3>Stats</h3>
            <div>Strength: {StandardArray(stats)} </div>
            <div>Dexterity: {StandardArray(stats)} </div>
            <div>Constitution: {StandardArray(stats)} </div>
            <div>Intelligence: {StandardArray(stats)} </div>
            <div>Wisdom: {StandardArray(stats)} </div>
            <div>Charisma: {StandardArray(stats)} </div>
        </>
    )
}

export default PlayerList;