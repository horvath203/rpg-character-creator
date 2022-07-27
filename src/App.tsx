import React, { useState } from 'react';
import './app.sass';
import CharList from './CharList';
import { User } from './Interfaces';
import Greeting from './Greeting';

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
      <header className="App-header">
        <h1> THE ULTIMATE CHARACTER CREATOR! </h1>
      </header>

        <hr />
        <Greeting user= {user}/>
        {/* <button onClick={SetUser}>LogIn</button> */}
        <CharList headerText='Here is a list of your characters:' />
    </div>
  );
}

export default App;
