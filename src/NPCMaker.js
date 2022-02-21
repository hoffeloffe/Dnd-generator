//import { getValue } from "@testing-library/user-event/dist/utils";
import React, { useState, useEffect } from "react";
import "./GameBrowser.css"
import { playerNames, playerRace, playerClass, playerFeats, playerBackground  } from "./name.js";

class PlayerList extends React.Component {
    constructor() {
      super();
    }

    render()
    {
        return (
            <>
                <InputWithHooksHandler/>
                {/* <WatchWithHooks />
                <StatThrow /> */}
           </>
        );
    }
  }

  let characterContainerElement = document.getElementById("CharacterContainer");

  let inputName = document.getElementById('inputname');
  let inputRace = document.getElementById("inputRace");
  let inputClass = document.getElementById("inputClass");
  let inputFeat = document.getElementById("inputFeat");
  let inputCurrentLv = document.getElementById("inputCurrentLv");
  let inputBackground = document.getElementById("inputBackground");

  let inputStrength = document.getElementById("inputStrength");
  let inputDexterity = document.getElementById("inputDexterity");
  let inputConstitution = document.getElementById("inputConstitution");
  let inputIntelligence = document.getElementById("inputIntelligence");
  let inputWisdom = document.getElementById("inputWisdom");
  let inputCharisma = document.getElementById("inputCharisma");

  let charTemp = document.getElementById("CharacterTemplate");
  let creatbtn = document.getElementById("btnCreate");
  let rancrtbtn = document.getElementById("rancrtbtn");


//   let inputProfision1 = document.getElementById("inputProfision1");
//   let inputProfision2 = document.getElementById("inputProfision2");

function findBackgroundValue(myArray, input)
{
    let myObj = myArray.find( ({name}) => name === input.value);
    console.log(myObj);
    return(myObj);
}

function InputWithHooksHandler()
{  
    const input = useFromInput('');

    return(
        <>
        <input {...input} />
        <p>Preview: {input.value}</p>
        </>
    )
}
function useFromInput(initialValue)
{

    const [value , setValue] = useState(initialValue);

    function handleInput(e)
    {
        setValue(e.target.value);
    }

    return {value: value, onChange: handleInput};

}

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
        Math.floor(Math.random() * 4 + 1),
        playerBackground[randomPropNumber(playerBackground)],
        );
}

creatbtn.onclick = function()
{
    createCharector(
        inputName.value, 
        inputRace.value, 
        findBackgroundValue(
        playerClass, 
        inputClass), 
        [inputStrength.value, 
        inputDexterity.value, 
        inputConstitution.value, 
        inputIntelligence.value, 
        inputWisdom.value, 
        inputCharisma.value],
        findBackgroundValue(
        playerFeats, 
        inputFeat),
        inputCurrentLv.value,
        findBackgroundValue(
        playerBackground, 
        inputBackground),
    );
}

function createCharector(Name, Race, Dndclass, PlayerStats, Feats, Currentlv, PlayerBackground)
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

    let playerBackground = clonedCharacter.getElementsByClassName("background")[0];
    playerBackground.innerText = "Back: " +  PlayerBackground.name;

    /////
    // STATS
    /////
    // Gather stats
    let strength = clonedCharacter.getElementsByClassName("str")[0];
    let dexterity = clonedCharacter.getElementsByClassName("dex")[0];
    let constitution = clonedCharacter.getElementsByClassName("con")[0];
    let intelligence = clonedCharacter.getElementsByClassName("int")[0];
    let wisdom = clonedCharacter.getElementsByClassName("wis")[0];
    let charisma = clonedCharacter.getElementsByClassName("cha")[0];

    // Set the stats
    var str = PlayerStats[0];
    var dex = PlayerStats[1];
    var con = PlayerStats[2];
    var int = PlayerStats[3];
    var wis = PlayerStats[4];
    var cha = PlayerStats[5];

    strength.innerText = "Str: " + str;
    dexterity.innerText = "Dex: " + dex;
    constitution.innerText = "Con: " + con;
    intelligence.innerText = "Int: " + int;
    wisdom.innerText = "Wis: " + wis;
    charisma.innerText = "Cha: " + cha;

    /////
    // SKILLS
    /////
    // Gather all the class skills
    // TODO: Find a way to hide it/make it nicer
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

    // Set a list with all proficiency bonuses to keep it neat
    var profList = PlayerBackground.pro

    // Set the shown skill bonus.
    acrobatics.innerText = "acrobatics: " + handleProficien('acrobatics', profList, Currentlv, dex);
    animalHandling.innerText = "animalHandling: " + handleProficien('animalHandling', profList, Currentlv, wis);
    arcana.innerText = "arcana: " + handleProficien('arcana', profList, Currentlv, int);
    athletics.innerText = "athletics: " + handleProficien('athletics', profList, Currentlv, str);
    deception.innerText = "deception: " + handleProficien('deception', profList, Currentlv, cha);
    history.innerText = "history: " + handleProficien('history', profList, Currentlv, int);
    insight.innerText = "insight: " + handleProficien('insight', profList, Currentlv, wis);
    intimidation.innerText = "intimidation: " + handleProficien('intimidation', profList, Currentlv, cha);
    investigation.innerText = "investigation: " + handleProficien('investigation', profList, Currentlv, int);
    nature.innerText = "nature: " + handleProficien('nature', profList, Currentlv, int);
    perception.innerText = "perception: " + handleProficien('perception', profList, Currentlv, wis);
    performance.innerText = "performance: " + handleProficien('performance', profList, Currentlv, cha);
    persuasion.innerText = "persuasion: " + handleProficien('persuasion', profList, Currentlv, cha);
    religion.innerText = "religion: " + handleProficien('religion', profList, Currentlv, int);
    sleightofhand.innerText = "sleightofhand: " + handleProficien('sleightofhand', profList, Currentlv, dex);
    stealth.innerText = "stealth: " + handleProficien('stealth', profList, Currentlv, dex);
    survival.innerText = "survival: " + handleProficien('survival', profList, Currentlv, wis);
    medicine.innerText = "medicine: " + handleProficien('medicine', profList, Currentlv, wis);


    let clonedButton = clonedCharacter.getElementsByTagName("button")[0];

    clonedButton.onclick = function()
    {
        this.parentNode.remove();
    };

    characterContainerElement.appendChild(clonedCharacter);


}

// Calculate the skill level
function handleProficien(skill, prof, currentlv, stat)
{
    // If the skill is 10, bonus is 0. Otherwise it changes on every even it goes up or uneven down.
    var result = Math.floor((stat - 10) / 2);

    if(prof.includes(skill)){
        var profBonus = Math.floor(2 + (currentlv-1)/4);
        result += profBonus;
    }
    return result
}



function StandardArray(stats, callBack)
{
    // Callbacks in case we want to sort it with specific methods later on.
    var selected = callBack(stats);
    var stat = stats[selected]
    stats.splice(selected, 1);
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
    var call = randomPropNumber // The random method we want to use
    var result = [StandardArray(stats, call), StandardArray(stats, call), StandardArray(stats, call), StandardArray(stats, call), StandardArray(stats, call), StandardArray(stats, call)];
    return result;
}

function StatThrow(){
    var stats = [15, 14, 13, 12, 10, 8];
    let elements = stats.map(n => <li key={n}>Number: {n}</li>); // Maps out the standard stat array used - TODO: Make that stat array defined somewhere

    return(
        <>
        <h1>Stats used:</h1>
        {elements}
        </>
    )
}

export default PlayerList;