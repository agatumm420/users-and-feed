import React, {Component} from 'react';
import '../styles/welcome.css';
import {Navigate, Route, Routes, Link} from 'react-router-dom';

class Welcome extends Component {
    constructor(){
        super();
    }
 
render() {
return (

    <div className="box" >
        <div className='circle'>
            <h2 id="welcomeText">Welcome stranger</h2>
            <a className='submit-btn' href="login/*">Login</a>
            <a className='submit-btn' href="signup/*">Sign up</a>  
        </div>

    </div>

);
}
}
export default Welcome;