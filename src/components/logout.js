import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Navigate } from "react-router-dom";
const event = new Event("logout");
class Logout extends Component {
  constructor() {
    super();
    this.state = {
      logout: true,
      username: "",
    };
    this.logout = this.logout.bind(this);
  }
  componentDidMount() {
    let localData = sessionStorage.getItem("userData");
    if (localData) {
      this.setState({ logout: false });
      let data = JSON.parse(localData);
      this.setState({ username: data.name });
    }
  }
  onFieldChange = (ev) => {
    const fieldName = ev.target.name;
    const fieldValue = ev.target.value;
    this.props.onChange(fieldName, fieldValue);
  };
  logout() {
    console.log("Logout");
    sessionStorage.setItem("userData", "");
    sessionStorage.clear();
    this.setState({ logout: true });
    document.dispatchEvent(event);
  }
  componentWillUnmount() {
    this.setState({ logout: true });
  }
  render() {
    // if (this.state.logout) {
    //     return (<Navigate to={'/login'}/>)
    // }
    return (
      <div className="logout-box">
        <p id="usernameLogout" name="logout" onChange={this.onFieldChange}>
          {this.state.username}
        </p>
        {this.state.logout == false ? (
          <button className="logout-btn" onClick={this.logout}>
            {" "}
            Log out
          </button>
        ) : null}
      </div>
    );
  }
}
export default Logout;
