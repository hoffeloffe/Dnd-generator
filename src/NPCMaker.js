import React, { useState, useEffect } from "react";
import "./GameBrowser.css"



 function NPCMaker ()
 {
        let name = useFormInput("");
        let faction = useFormInput("");
        let reputation = useFormInput("Friendly");

        return(
        <>
        <WatchWithHooks />
        <NPCFrom name = {name} faction = {faction} reputation = {reputation}/>
        <NameUI name = {name.value} faction = {faction.value}/>
        </>
        )
    
}

function useFormInput(initialValue)
{
    const [Value , setValue] = useState(initialValue);

    function handleChange(event)
    {
        return(setValue(event.target.value));
    }

    return({value : Value, onChange : handleChange});
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




function NPCFrom(props){
    return(
        <>
            <input {...props.name}></input>
            <input {...props.faction}></input>
            
                <select {...props.reputation} >
                    <option>Cool</option>
                    <option>Mah</option>
                    <option>Bitch</option>
                </select>
        </>
    );
}

function NameUI(props){
    return(
        <>
            <h3>Ello</h3>
            <div>{props.name}</div>
            <div>{props.faction}</div>
        </>
    )
}

export default NPCMaker;