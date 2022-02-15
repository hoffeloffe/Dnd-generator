//import { getValue } from "@testing-library/user-event/dist/utils";
import React, { useState, useEffect } from "react";
import "./GameBrowser.css"
import { playerNames, playerRace, playerClass, playerFeats  } from "./name.js";

class PlayerList extends React.Component {
    // constructor() {
    //   super();
    // }
    
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
        DisplayStats(),
        playerFeats[randomPropNumber(playerFeats)],
        Math.floor(Math.random()*4)
        );
}

creatbtn.onclick = function()
{
    createCharector(inputName.value, inputRace.value, inputClas.value);
}

function createCharector(Name, Race, Dndclass, PlayerStats, Feats, Currentlv)
{
    if(Name === '')
    Name = "Hoffe";
    if(Race === '')
    Race = "Human";
    if(Dndclass === '')
    Dndclass = "Programer";

    let supclass;

    if(Currentlv >= 3)
    {
        supclass = " (" + Dndclass.sub[randomPropNumber(Dndclass.sub)] + ")";
    }
    else
    {
        supclass = '';
    }
    
    
    let clonedCharacter = charTemp.cloneNode(true);
    clonedCharacter.removeAttribute("hidden");
    clonedCharacter.removeAttribute("CharacterTemplate");

    let clonedName = clonedCharacter.getElementsByClassName("CharacterName")[0];
    clonedName.innerText = "Name: " + Name;

    let raceName = clonedCharacter.getElementsByClassName("RaceName")[0];
    raceName.innerText = "Race: " + Race;

    let dndclass = clonedCharacter.getElementsByClassName("dndclass")[0];
    dndclass.innerText = "Class: " +  Dndclass.name + supclass;

    let feats = clonedCharacter.getElementsByClassName("feats")[0];
    feats.innerText = "Feats: " +  Feats.name;

    let currentlv = clonedCharacter.getElementsByClassName("currentlv")[0];
    currentlv.innerText = "Lv: " +  Currentlv;

    let strength = clonedCharacter.getElementsByClassName("str")[0];
    let dexterity = clonedCharacter.getElementsByClassName("dex")[0];
    let constitution = clonedCharacter.getElementsByClassName("con")[0];
    let intelligence = clonedCharacter.getElementsByClassName("int")[0];
    let wisdom = clonedCharacter.getElementsByClassName("wis")[0];
    let charisma = clonedCharacter.getElementsByClassName("cha")[0];
    
    strength.innerText = "Str: " + PlayerStats[0];
    dexterity.innerText = "Dex: " +  PlayerStats[1];
    constitution.innerText = "Con: " +  PlayerStats[2];
    intelligence.innerText = "Int: " +  PlayerStats[3];
    wisdom.innerText = "Wis: " +  PlayerStats[4];
    charisma.innerText = "Cha: " +  PlayerStats[5];

    let acrobatics = clonedCharacter.getElementsByClassName("acrobaticst")[0];
    let animalHandling = clonedCharacter.getElementsByClassName("animalHandlingt")[0];
    let arcana = clonedCharacter.getElementsByClassName("arcanat")[0];
    let athletics = clonedCharacter.getElementsByClassName("athleticst")[0];
    let deception = clonedCharacter.getElementsByClassName("deceptiont")[0];
    let history = clonedCharacter.getElementsByClassName("historyt")[0];
    let insight = clonedCharacter.getElementsByClassName("insightt")[0];
    let intimidation = clonedCharacter.getElementsByClassName("intimidationt")[0];
    let investigation = clonedCharacter.getElementsByClassName("investigationt")[0];
    let nature = clonedCharacter.getElementsByClassName("naturet")[0];
    let perception = clonedCharacter.getElementsByClassName("perceptiont")[0];
    let performance = clonedCharacter.getElementsByClassName("performancet")[0];
    let persuasion = clonedCharacter.getElementsByClassName("persuasiont")[0];
    let religion = clonedCharacter.getElementsByClassName("religiont")[0];
    let sleightofhand = clonedCharacter.getElementsByClassName("sleightofhandt")[0];
    let stealth = clonedCharacter.getElementsByClassName("stealtht")[0];
    let survival = clonedCharacter.getElementsByClassName("survivalt")[0];
    let medicine = clonedCharacter.getElementsByClassName("medicinet")[0];

    acrobatics.innerText = "acrobatics: ";
    animalHandling.innerText = "animalHandling: ";
    arcana.innerText = "arcana: ";
    athletics.innerText = "athletics: ";
    deception.innerText = "deception: ";
    history.innerText = "history: ";
    insight.innerText = "insight: ";
    intimidation.innerText = "intimidation: ";
    investigation.innerText = "investigation: ";
    nature.innerText = "nature: ";
    perception.innerText = "perception: ";
    performance.innerText = "performance: ";
    persuasion.innerText = "persuasion: ";
    religion.innerText = "religion: ";
    sleightofhand.innerText = "sleightofhand: ";
    stealth.innerText = "stealth: ";
    survival.innerText = "survival: ";
    medicine.innerText = "medicine: ";
    
    let clonedButton = clonedCharacter.getElementsByTagName("button")[0];

    clonedButton.onclick = function()
    {
        this.parentNode.remove();
    };
    
    characterContainerElement.appendChild(clonedCharacter);

    inputName.value = "";
    inputRace.value = "";
    inputClas.value = "";
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

function DisplayStats()
{
    var stats = [15, 14, 13, 12, 10, 8];

    var result = [StandardArray(stats), StandardArray(stats), StandardArray(stats), StandardArray(stats), StandardArray(stats), StandardArray(stats)];
    return result;
}

export default PlayerList;