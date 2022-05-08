import React, { Component } from "react";
import { Navigate } from "react-router-dom";
//import {PostData} from '../services/postData.js';
//import {appManager, login} from '../services/client-app.js';
import Manager from "../services/serverapp.js";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      redirectToReferrer: false,
    };
    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  login() {
    if (this.state.username && this.state.password) {
      Manager("login", this.state).then((result) => {
        let responseJson = result;
        if (responseJson) {
          sessionStorage.setItem("userData", JSON.stringify(responseJson));
          console.log(sessionStorage);
          this.setState({ redirectToReferrer: true });
        } else alert(result.username);
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    if (this.state.redirectToReferrer) {
      return <Navigate to={"/home"} />;
    }
    if (sessionStorage.getItem("userData")) {
      return <Navigate to={"/home"} />;
    }
    return (
      <div className="box">
        <div className="circle">
          <h4 className="heading">Login</h4>
          <input
            className="inp-1"
            id="usernameLogin"
            type="text"
            name="username"
            placeholder="Username"
            onChange={this.onChange}
          />
          <input
            className="inp-1"
            id="passwdLogin"
            type="password"
            name="password"
            placeholder="Password"
            onChange={this.onChange}
          />
          <button
            type="submit"
            className="btn-1"
            value="Login"
            onClick={this.login}
          >
            Log in
          </button>
          <a href="/signup" className="btn-1">
            Sign up!
          </a>
        </div>
      </div>
    );
  }
}
export default Login;
