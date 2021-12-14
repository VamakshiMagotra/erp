import React from 'react';
import {Routes,Navigate, Route} from 'react-router-dom';
import LoginComponent from './LoginComponent';

const MainComponent= ()=>{
    return(
        <Routes>
           <Route exact path ="/login" element={<LoginComponent/>}/>
            <Route path="" element={<Navigate to="/login"/>}/>
        </Routes>
    )
};

export default MainComponent;