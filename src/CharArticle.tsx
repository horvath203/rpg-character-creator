import React from 'react';
import {CharacterData} from './Interfaces'


export default function Character ({name, age, size, origin, backstory}: CharacterData) {
  return (
    <article className="character">
        <p className="name">{name}</p>
        <hr/>
        <h3>Attributes:</h3>
        <div className="attributes">
          <p className="age">Age: {age}</p>
          <p className="sizeVal">Size: {size}</p>
          <p className="orVal">Origin: {origin}</p>
        </div>
        <h3>Backstory:</h3>
        <p className="backstory">{backstory}</p>
    </article>
  );
}
