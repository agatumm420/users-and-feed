import React, { Component } from 'react';
import './styles/styles.css';
import Welcome from './components/welcome';


import Routez from './routes';
import Header from './components/Header.js';
const styles={
  site:{
        width:'100%',
        height:'100%'

  }
}

class App extends Component {
  constructor(){
    super();
    this.state={
    appName: "Mubi",
    home: false
    }
    }
    render() {
    return (
    <div className="container">
      <Header name={this.state.appName}/>
      <div className="site">
        
          
           
            
            <Routez  name={this.state.appName}/>
          
    
        
      </div>
    </div>
    );
    }
}

export default App;
