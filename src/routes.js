import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import{ Routes} from 'react-router-dom'

import Welcome from '././components/welcome.js';
import Home from '././components/Home.js';
import Login from '././components/login.js';
import Signup from '././components/signup.js';
import NotFound from '././components/notfound.js';
const styles={
    site:{
          width:'100%',
          height:'100%'
  
    }
  }

const Routez = () => {
    
 return <BrowserRouter className='site'>
            <Routes>
                <Route exact path="*" element={<Welcome/>}/>
                <Route path="home/*" element={<Home/>}/>
                <Route path="login/*" element={<Login/>}/>
                <Route path="signup/*" element={<Signup/>}/>
                <Route path="notfound/*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
};

export default Routez;