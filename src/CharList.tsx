import React from 'react';
import './CharList.sass';
import CharArticle from './CharArticle';

export interface IAppProps {
    headerText: string;
}

export default function CharList ({ headerText }: IAppProps) {
  return (
    <section>
      <h2> {headerText} </h2>
    </section>
    //TODO: load the characters from user (maybe better done in app.tsx, here as props) and render a CharArticle for each one found
  );
}
