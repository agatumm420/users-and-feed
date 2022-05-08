import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import UserFeed from "./UserFeed";
//import {PostData} from '../services/postData';
//import UserFeed from "../UserFeed/UserFeed";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import "../styles/home.css";
import { confirmAlert } from "react-confirm-alert";

import ImageSlider from "./imageslider";
import Manager from "../services/serverapp";
const styles = {
  icon: {
    width: 20,
    height: 20,
    color: "#5d4954",
  },
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      userFeed: "",
      redirectToReferrer: false,
      name: "",
    };
    this.getUserFeed = this.getUserFeed.bind(this);
    this.feedUpdate = this.feedUpdate.bind(this);
    this.onChange = this.onChange.bind(this);
    this.deleteFeed = this.deleteFeed.bind(this);
    this.editFeed = this.editFeed.bind(this);
    this.deleteFeedAction = this.deleteFeedAction.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentWillMount() {
    if (sessionStorage.getItem("userData")) {
      this.getUserFeed();
    } else {
      this.setState({ redirectToReferrer: true });
    }
  }

  feedUpdate(e) {
    e.preventDefault();
    let data = JSON.parse(sessionStorage.getItem("userData"));
    let postData = { user_id: data.user_id, feed: this.state.userFeed };
    if (this.state.userFeed) {
      Manager("feedUpdate", postData).then((result) => {
        let responseJson = result;
        this.setState({ data: responseJson });
      });
    }
  }
  deleteFeed(e) {
    confirmAlert({
      title: "Delete Feed",
      message: "Are you sure to delete this feed.",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.deleteFeedAction(e),
        },
        {
          label: "No",
          onClick: () => alert("Click No"),
        },
      ],
    });
  }

  deleteFeedAction(e) {
    e.preventDefault();
    let data = JSON.parse(sessionStorage.getItem("userData"));
    let postData = { user_id: data.user_id, feed_id: e.target.id };
    Manager("feedDelete", postData).then((response) => {
      this.setState({ data: response });
    });
  }

  editFeed(e) {
    alert("j");
  }

  getUserFeed() {
    let data = JSON.parse(sessionStorage.getItem("userData"));

    this.setState({ name: data.name });
    let postData = { user_id: data.user_id };
    if (data) {
      Manager("feed", postData).then((result) => {
        let responseJson = result;
        if (responseJson) {
          this.setState({ data: responseJson });
          console.log(this.state);
        }
      });
    }
  }
  onChange(e) {
    this.setState({ userFeed: e.target.value });
  }

  logout() {
    sessionStorage.setItem("userData", "");
    sessionStorage.clear();
    this.setState({ redirectToReferrer: true });
  }

  render() {
    if (this.state.redirectToReferrer) {
      return <Navigate to={"/login"} />;
    }

    return (
      <div className="inner-row">
        {document.addEventListener("logout", this.logout)}

        <form onSubmit={this.feedUpdate} method="post" id="feed-box">
          <input
            id="userFeed"
            name="userFeed"
            onChange={this.onChange}
            value={this.state.userFeed}
            type="text"
            placeholder="Share something..."
          />
          <button
            id="btn-feed"
            type="submit"
            value="Post"
            className="btn-2"
            onClick={this.feedUpdate}
          >
            Post
          </button>
        </form>

        <p className="home-title">
          {" "}
          Pictures of your friends{" "}
          <FontAwesomeIcon icon={faUser} style={styles.icon} />{" "}
        </p>
        <ImageSlider />

        <UserFeed
          feedData={this.state.data}
          deleteFeed={this.deleteFeed}
          name={this.state.name}
        />
      </div>
    );
  }
}
export default Home;
