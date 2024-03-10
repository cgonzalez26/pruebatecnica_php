import React from 'react';

import { Routes, Route} from 'react-router-dom';
import { Link } from 'react-router-dom';
import Login from '../../../pages/Auth/Login';
import Register from '../../../pages/Auth/Register';

function Guest() {
    return (
        <>
       
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                  
                    <span className="navbar-brand">Administración de Estudiantes</span>

                    <div className="" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Registrarse</Link>
                            </li>
                        </ul>
                    </div>    
                </div>
            </nav>

            <div className="container">
                <Routes>
                    <Route path="/" element={<Login />} />                   
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
          
        </>
    );
}

export default Guest;