import React, {Component} from 'react';
//import {PostData} from '../services/postData';
import {Navigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons/faCircleXmark';
//import {appManager }from '../services/client-app';
import Manager from '../services/serverapp';

const styles={
    icon:{
        marginTop:15,
        marginLeft:10,

    }
}
class Signup extends Component {
    constructor(props){
    super(props);
    this.state = {
    username: '',
    password: '',
    email: '',
    name: '',
    redirectToReferrer: false,
    noMatch: false,
    };
    this.signup = this.signup.bind(this);
    this.onChange = this.onChange.bind(this);   
    }

signup() {
if(this.state.username && this.state.password && this.state.email && this.state.name){
    Manager('signup',this.state).then((result) => {
        let responseJson = result;
        if(responseJson){
        sessionStorage.setItem('userData',JSON.stringify(responseJson));
        this.setState({redirectToReferrer: true});
        }
        else
        alert(result.error);
        });
}
}
onChange(e){
this.setState({[e.target.name]:e.target.value});
}
checkIfMatches(e){
 if(this.state.password!==e.target.value){
    this.setState({'noMatch':true});
 }
 else{
    this.setState({'noMatch':false});
 }
}
render() {
if (this.state.redirectToReferrer || sessionStorage.getItem('userData')) {
return (<Navigate to={'/home'}/>)
}
return (
<div className="box">
    <div className="circle">
        <h4 className="heading" >Signup</h4>
            <label className='inpt-label'> Email</label>
            <input id='emailSignup' type="text" name="email" placeholder="Email" onChange={this.onChange}/>
            <label className='inpt-label'>Name</label>
            <input id='nameSignup' type="text" name="name" placeholder="Name" onChange={this.onChange}/>
            <label className='inpt-label'>Usermane</label>
            <input id='usernameSignup' type="text" name="username" placeholder="Username" onChange={this.onChange}/>
            <label className='inpt-label'> Password</label>
            <input id='passwdSignup' type="password" name="password" placeholder="Password" onChange={this.onChange}/>
            
            <button className='submit-btn' onClick={this.signup}> Sign Up</button>
        <a className='submit-btn' href="/login">Login</a>
    </div>
</div>
);
}
}
export default Signup;