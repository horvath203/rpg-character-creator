import React from 'react';
import './app.sass';
import CharList from './CharList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1> Welcome to the character creator! </h1>
        <CharList headerText='Here is a list of your characters:' />
      </header>
    </div>
  );
}

export default App;
