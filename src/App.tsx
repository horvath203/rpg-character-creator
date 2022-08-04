import React, { useState } from 'react';
import './app.sass';
import CharList from './CharList';
import { User } from './Interfaces';
import Greeting from './Greeting';
import CharArticle from './CharArticle';
import CharCreator from './CharCreator';

function App() {

  //TODO user login system to get a user, greet user by name, render users character list
  const [user, setUser] = useState<User | null>(null);

  // const SetUser = () => {
  //   setUser({
  //     name: 'Peter',
  //     email: 'mail',
  //   })
  // }

  return (
    <div className="App">
      <header>
        <h1> THE ULTIMATE CHARACTER CREATOR! </h1>
      </header>

        <hr />
        <Greeting user= {user}/>
        {/* <button onClick={SetUser}>LogIn</button> */}
        <CharList headerText='Here is a list of your characters:' />
        
        <section className="CharList">
          <CharArticle name='Gorkhan' age={34} size={215} origin='Europe' backstory='Orc Warrior'/>
          <hr className="separator" />
          <CharArticle name='Akshan' age={34} size={186} origin='Europe' backstory='Elven archer'/>
          <CharArticle name='Purin' age={34} size={110} origin='Europe' backstory='Dwarf prince'/>
          <CharArticle name='Trevis' age={34} size={180} origin='Europe' backstory='Human guard'/>
          <CharArticle name='Gruid' age={34} size={195} origin='Europe' backstory='Shaman'/>
          <CharCreator />

        </section>
    
    </div>
  );
}

export default App;
