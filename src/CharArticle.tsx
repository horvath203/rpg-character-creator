import React from 'react';
import './CharArticle.sass';

export interface CharProps {
}

export default function Character ({}: CharProps) {
  return (
    <article>
        <p className="name">Name of the character</p>
        <hr/>
        <img src="" alt="portrait" />
        <hr/>
        <h3>Attributes</h3>
        <p className="age">Age of the character</p>
        <p className="size">Size of the character</p>
        <p className="origin">Origin of the character</p>
        <h3>Backstory</h3>
        <p className="backstory">Backstory of the character</p>
    </article>
  );
}
