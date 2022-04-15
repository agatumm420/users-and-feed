import React, { Component } from 'react';
import '../styles/header.css';
import '../styles/styles.css';
import Logout from './logout';

const show=false;
class Header extends Component {
   constructor(props) {
      super(props);
      this.state={
         username:this.props.username,
         scroll:this.props.scroll
      }
   }
   onScroll(){
     this.setState({scroll:true});
   }
   Change=(field, value)=>{
      this.setState({[field]: value});
      this.props.onChange(field, value);
  
     }
   
render() {
return (
      <nav  className={this.state.scroll} onScroll={this.onScroll} >
         <div className='logo'>{this.props.name}</div>
         <ul>
            <li><a > Welcome</a></li>
            <li><a > Menu </a></li>
            <li><a > Contact </a></li>
            <li><a> Staff </a></li>
         </ul>
         <Logout onChange={this.Change} username={this.state.username}/>
         
         <div className="burger">
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
         </div>
      </nav>
);
}
}
export default Header;