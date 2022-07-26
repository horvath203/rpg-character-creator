import * as React from 'react';

export interface IAppProps {
    headerText: string;
}

export default function CharList ({ headerText }: IAppProps) {
  return (
    <div>
      <p> {headerText} </p>
    </div>
  );
}
