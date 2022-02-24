//import { getValue } from "@testing-library/user-event/dist/utils";
import React, { useState } from "react";
import "./GameBrowser.css"
import { playerNames, playerRace, playerClass, playerFeats, playerBackground } from "./name.js";
import {randomProp, StandardArray, Copy} from './helper.js';

class PlayerList extends React.Component {
    constructor() {
        super();
        this.state = {
            num1: 0,

    }
    //Bind funktion handleClick
    this.handleClick = this.handleClick.bind(this);
}
    //Funktion takes one argument that set the maximum value random Math can rool to state.num1 using the setState method.
    handleClick(x) 
    {
        this.setState( ()=> 
        {
            return {
                num1: Math.floor(Math.random() * x) + 1
            }
        })
    }

    render() 
    {
        return (
            <>
                <InputWithHooksHandler />
                {/* Visual repentatation of state.num1 */}
                <h3 id="RollNumber">{this.state.num1}</h3>
                {/* Using arrow funktion because the Render methods should be a pure function of props and state.*/}
                <button onClick={() => this.handleClick(20)}>Roll D20</button>
                <button onClick={() => this.handleClick(12)}>Roll D12</button>
                <button onClick={() => this.handleClick(10)}>Roll D10</button>
                <button onClick={() => this.handleClick(8)}>Roll D8</button>
                <button onClick={() => this.handleClick(6)}>Roll D6</button>
                <button onClick={() => this.handleClick(4)}>Roll D4</button>
                <button onClick={() => this.handleClick(2)}>Roll D2</button>
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
let bioValue;
var basestat = [15, 14, 13, 12, 10, 8];

let statsthrow = document.getElementById("statsthrow");
let outputstatsthrow = document.getElementById("outputstatsthrow");

//Funktion that takes an array and an input that uses .find to find objects that have the same name as the input.value if fund the function return the object, else return undefined.
function findBackgroundValue(myArray, input) {
    let myObj = myArray.find(({ name }) => name === input.value);
    console.log(myObj);
    return (myObj);
}



//#region Controlled component with UseState and function with hooks
function InputWithHooksHandler() {
    bioValue = useFromInput('');

    return (
        <>
            <div id="a">
                <div>
                    <label>Character bio:</label><br />
                    <textarea rows="10" cols="50" maxLength="490" {...bioValue} /><label className="characters">Max 490 characters</label>
                </div>
                <div>
                    <label>Preview:</label>
                    <br />
                    <label>{bioValue.value}</label>
                </div>
            </div>
        </>
    )
}

//simpel controll component
function useFromInput(initialValue) {

    //state oprettes her, med en value og funktion setValue
    const [value, setValue] = useState(initialValue);

    //state value ændres her
    function handleInput(e) {
        setValue(e.target.value);
    }

    //value sættes her og samtidig lyttes der på et event, handleInput
    return { value: value, onChange: handleInput };
}
//#endregion

async function getData(name){
    let genderPromise = getGenderPromise(name);
    let gender = await genderPromise;
    return gender;
}

function getGenderPromise(name){
    return fetch("https://api.genderize.io/?name=" + name)
    .then(response => response.json())
    .then(genderObject => genderObject.gender);
}


rancrtbtn.onclick = function () {
    createCharector(
        playerNames[randomProp(playerNames)],
        playerRace[randomProp(playerRace)],
        playerClass[randomProp(playerClass)],
        DisplayStats(),
        playerFeats[randomProp(playerFeats)],
        Math.floor(Math.random() * 4 + 1),
        playerBackground[randomProp(playerBackground)],
    );
}
//Button with createCharector funktion with inputValue from index.HTML
creatbtn.onclick = function () {
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
            inputBackground)
    );
}

function createCharector(Name, Race, Dndclass, PlayerStats, Feats, Currentlv, PlayerBackground, Gender) {
    if (Name === '')
        Name = "Hoffe";
    if (Race === '')
        Race = "Human";
    if (Dndclass === '')
        Dndclass = "Programer";


    let supclass;

    if (Currentlv >= 3) {
        supclass = " (" + Dndclass.sub[randomProp(Dndclass.sub)] + ")";
    }
    else {
        supclass = '';
    }

    //CloneNode
    let clonedCharacter = charTemp.cloneNode(true);

    //RemoveAttribute
    clonedCharacter.removeAttribute("hidden");
    clonedCharacter.removeAttribute("CharacterTemplate");

    //Sets all the values
    let clonedName = clonedCharacter.getElementsByClassName("CharacterName")[0];
    clonedName.innerText = "Name: " + Name;

    let clonedGender = clonedCharacter.getElementsByClassName("Gender")[0]; 
    let gender = getData(Name);

    gender.then((gender) => 
    {
        clonedGender.innerText = "Gender: " + gender;
    });    

    let raceName = clonedCharacter.getElementsByClassName("RaceName")[0];
    raceName.innerText = "Race: " + Race;

    let dndclass = clonedCharacter.getElementsByClassName("dndclass")[0];
    dndclass.innerText = "Class: " + Dndclass.name + supclass;

    let feats = clonedCharacter.getElementsByClassName("feats")[0];
    feats.innerText = "Feats: " + Feats.name;

    let currentlv = clonedCharacter.getElementsByClassName("currentlv")[0];
    currentlv.innerText = "Lv: " + Currentlv;

    let playerBackground = clonedCharacter.getElementsByClassName("background")[0];
    playerBackground.innerText = "Back: " + PlayerBackground.name;

    let playerBio = clonedCharacter.getElementsByClassName("urBio")[0];
    playerBio.innerText = bioValue.value;

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

    //Gettting the button on the cloned template
    let clonedButton = clonedCharacter.getElementsByTagName("button")[0];

    //remove it self from the list
    clonedButton.onclick = function () {
        this.parentNode.remove();
    };

    //Adds the clone to the end of the list of children
    characterContainerElement.appendChild(clonedCharacter);
}

// Calculate the skill level
function handleProficien(skill, prof, currentlv, stat) {
    // If the skill is 10, bonus is 0. Otherwise it changes on every even it goes up or uneven down.
    var result = Math.floor((stat - 10) / 2);

    if (prof.includes(skill)) {
        var profBonus = Math.floor(2 + (currentlv - 1) / 4);
        result += profBonus;
    }
    return result
}


function DisplayStats() {
    var stats = Copy(basestat);
    var call = randomProp // The random method we want to use
    var result = [StandardArray(stats, call), StandardArray(stats, call), StandardArray(stats, call), StandardArray(stats, call), StandardArray(stats, call), StandardArray(stats, call)];
    return result;
}

statsthrow.onclick = function () 
{ 
    var stats = [15, 14, 13, 12, 10, 8];
    let elements = stats.map(n => <li key={n}>{n}</li>); // Maps out the standard stat array used - TODO: Make that stat array defined somewhere
    let string = '';

    elements.forEach(element => 
    {
        string += `Number: ${element.key}
        `;
    });
    
    outputstatsthrow.innerText = string;
}

export default PlayerList;