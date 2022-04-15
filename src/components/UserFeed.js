
import React, {Component} from 'react';
import Linkify from 'react-linkify';
import '../styles/UserFeed.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Manager from '../services/serverapp';
//import TimeAgo from 'react-timeago';
class UserFeed extends Component {

constructor(props){
super(props);
}
render() {

    let userFeed = this.props.feedData
    .map(function (feedData, index) {
    return (
    <div className="feed-item" key={index}>
    
            <div id='txt-box' className="people-you-might-know">
    
                <div className="row add-people-section">
                <div className="small-12 medium-10 columns about-people">
    
                <div className="about-people-author">
                <p className="author-name">
                <b>{this.props.name}</b>
                
                <br/>
    
                </p>
                <div>{feedData.feed_txt}</div>
    
            </div>
            </div>
            <div className="small-12 medium-2 columns add-friend">
    
                <div className="add-friend-action">
                <button id={feedData.feed_id} className="submit-btn" onClick={this.props.deleteFeed} data={feedData.feed_id} value={this.props.index} >
                    <FontAwesomeIcon icon={faTrash}/>
                    
                 </button>
            </div>
             </div>
            </div>
            </div>
    </div>
    )
    }, this);
    
    return (
    <div>
    {userFeed}
    
    </div>
    );
    }
    
    
    
    
}

export default UserFeed;