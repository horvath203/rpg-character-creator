import * as React from 'react';
import { useState } from 'react';

const defChar = {
    name: "",
    portrait: -1,
    age: 0,
    size: 0,
    origin: "",
    backstory: "",

}

export default function App () {
    const [CharData, SetCharData] = useState(defChar);
    const {name, portrait, age, size, origin, backstory} = CharData

    const Create = (e: React.FormEvent<HTMLFormElement>) => {
        //insert character into dabate under currently logged user
    };

    const Update = (e: React.ChangeEvent<HTMLInputElement>) => {
        SetCharData((prevData) => ({
            ...prevData,
            [e.target.id]: e.target.value,
        }));
    };

    const UpdateSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        SetCharData((prevData) => ({
            ...prevData,
            [e.target.id]: e.target.value,
        }));
    };

    const UpdateTA = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        SetCharData((prevData) => ({
            ...prevData,
            [e.target.id]: e.target.value,
        }));
    };

  return (
    <article className='form'>
      <form onSubmit={Create}>
        <label htmlFor="name">Name: </label>
        <input type="text" id="name" value={name} onChange={Update}  />
        
        <label htmlFor="age">Age: </label>
        <input type="number" id="age" value={age} onChange={Update}  />
        
        <label htmlFor="size">Size: </label>
        <input type="number" id="size" value={size} onChange={Update}  />
        
        <label htmlFor="origin">Origin: </label>
        <select id="origin" value={origin} onChange={UpdateSelect}>
            <option value="Europe"> Europe </option>
            <option value="America"> America </option>
            <option value="Australia"> Australia </option>
            <option value="Russia"> Mars </option>
        </select>
        
        <label htmlFor="backstory">Backstory: </label>
        <textarea id="backstory" value={backstory} onChange={UpdateTA}  />

        <button className='submit' type='submit'>Create new character!</button>
      </form>
    </article>
  );
}
