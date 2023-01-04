import React, { useState } from "react";

function DvdDescription (props) {
    const { setDescription } = props;
    
    function onChangeHandler (event) {
        setDescription({size: event.target.value});
    }

    return (
        <fieldset id="DVD">
            <label htmlFor="size">Size (MB) </label>
            <input type="text" id="size" onChange={onChangeHandler}/>
            <div>Please provide size of the product.</div>
        </fieldset>
    );
}

function BookDescription (props) {
    const { setDescription } = props;
    
    function onChangeHandler (event) {
        setDescription({weight: event.target.value});
    }

    return (
        <fieldset id="Book">
            <label htmlFor="weight">Weight(kg) </label>
            <input type="text" id="weight" onChange={onChangeHandler}/>
            <div>Please provide weight of the product.</div>
        </fieldset>
    );  
}

function FurnitureDescription (props) {
    const { setDescription } = props;
    
    function onChangeHandler (event) {
        setDescription(description => ({...description, [event.target.id]: event.target.value}));
    }

    return (
        <fieldset id="Furniture">
            <label htmlFor="height">Height (cm)</label>
            <input type="text" id="height" onChange={onChangeHandler}/>
            <label htmlFor="width">Width (cm)</label>
            <input type="text" id="width" onChange={onChangeHandler}/>
            <label htmlFor="length">Length (cm)</label>
            <input type="text" id="length" onChange={onChangeHandler}/>
            <div>Please provide dimensions of the product.</div>
        </fieldset>
    );
}

export { DvdDescription, BookDescription, FurnitureDescription };