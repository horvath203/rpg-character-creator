import React from 'react';
import {User} from './Interfaces'

interface GreetProps{
    user?: User | null;
}

interface nameProp{
    name: string;
}

function LoggedUserGreeting({name}: nameProp){
    return <p className="greeting">Welcome, creator {name}</p>
}

function NewUserGreeting(){
    return <p className="greeting">Welcome, new creator</p>
}

export default function Greeting({user}: GreetProps){
    if(user){
        return <LoggedUserGreeting name={user.name} />;
    }
    return <NewUserGreeting />;
}