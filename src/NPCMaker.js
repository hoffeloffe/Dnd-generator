//import { getValue } from "@testing-library/user-event/dist/utils";
import React, { useState, useEffect } from "react";
import "./GameBrowser.css"
import { playerNames, playerRace, playerClass, playerFeats, playerBackground } from "./name.js";

class PlayerList extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "",
            race: "",
            class: ""
        };
        this.onChange = this.onChange.bind(this);
        this.createCharecter = this.createCharecter.bind(this);
    }

    createCharecter() {    
        console.log("testing")
            return (
                <>
                <div id="CharacterTemplate" class="quest">
                    <button class="buttonRemove"><small>x</small></button> <label>Character Info</label>
                </div>
                </>
            )
    }

    onChange(event) {
        let inputName = event.target.name;
        let inputValue = event.target.value;
        this.setState({ [inputName]: inputValue })
    }

    render() {
        return (
            <>
                <CharacterCreation onChange={this.onChange} createcharacter={this.createCharecter} {...this.state} />
                <CharacterPreview {...this.state} />


                <WatchWithHooks />
                <DisplayStats />
            </>
        );
    }
}


let characterContainerElement = document.getElementById("CharacterContainer");

let inputName = document.getElementById('inputname');
let inputRace = document.getElementById("inputRace");
let inputClass = document.getElementById("inputClass");

let charTemp = document.getElementById("CharacterTemplate");
let creatbtn = document.getElementById("btnCreate");
let rancrtbtn = document.getElementById("rancrtbtn");

function CharacterCreation(props) {
    return (
        <>
            <br />
            <label>Name:</label>
            <br />
            <input onChange={props.onChange} name="name" value={props.name} ></input>
            <br />
            <select onChange={props.onChange} name="race" value={props.race}>
                <option>Elf</option>
                <option>Dragonborn</option>
            </select>
            <br />
            <select onChange={props.onChange} name="class" value={props.class}>
                <option>Mage</option>
                <option>Rouge</option>
            </select><br/>
            <button createcharacter={props.createCharecter} id="create">Create Character</button>
        </>
    )
}

function CharacterPreview(props) {
    return (
        <>
            <h3>Preview:</h3>
            <div>Name: {props.name}</div>
            <div>Race: {props.race}</div>
            <div>Class: {props.class}</div>

        </>
    )
}



function randomPropNumber(props) {
    var selected = Math.floor(Math.random() * props.length);
    return selected;
}

rancrtbtn.onclick = function () {
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

creatbtn.onclick = function () {
    createCharector(inputName.value, inputRace.value, inputClass.value, DisplayStats(),
        playerFeats[randomPropNumber(playerFeats)],
        Math.floor(Math.random() * 4 + 1),
        playerBackground[randomPropNumber(playerBackground)]);
}

function createCharector(Name, Race, Dndclass, PlayerStats, Feats, Currentlv, PlayerBackground) {
    if (Name === '')
        Name = "Hoffe";
    if (Race === '')
        Race = "Human";
    if (Dndclass === '')
        Dndclass = "Programer";

    let supclass;

    if (Currentlv >= 3) {
        supclass = " (" + Dndclass.sub[randomPropNumber(Dndclass.sub)] + ")";
    }
    else {
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
    dndclass.innerText = "Class: " + Dndclass.name + supclass;

    let feats = clonedCharacter.getElementsByClassName("feats")[0];
    feats.innerText = "Feats: " + Feats.name;

    let currentlv = clonedCharacter.getElementsByClassName("currentlv")[0];
    currentlv.innerText = "Lv: " + Currentlv;

    let playerBackground = clonedCharacter.getElementsByClassName("background")[0];
    playerBackground.innerText = "Back: " + PlayerBackground.name;

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

    clonedButton.onclick = function () {
        this.parentNode.remove();
    };

    characterContainerElement.appendChild(clonedCharacter);

    inputName.value = "";
    inputRace.value = "";
    inputClass.value = "";
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



function StandardArray(props) {
    var selected = Math.floor(Math.random() * props.length);
    var stat = props[selected]
    props.splice(selected, 1);
    return stat
}

function WatchWithHooks() {
    let date = useDate();

    return (<h1>{date.toLocaleTimeString()}</h1>)
}

function useDate() {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        let id = setInterval(() => setDate(new Date()), 100);
        return () => clearInterval(id);
    })

    return date;
}

function DisplayStats() {
    var stats = [15, 14, 13, 12, 10, 8];

    var result = [StandardArray(stats), StandardArray(stats), StandardArray(stats), StandardArray(stats), StandardArray(stats), StandardArray(stats)];
    return result;
}

export default PlayerList;