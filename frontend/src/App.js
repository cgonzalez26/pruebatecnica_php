import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Navbar from './pages/Shared/Navbar';
import Home from './pages/Home/Home';

import ViewEstudiante from './pages/Estudiantes/ViewEstudiante';
import AddEstudiante from './pages/Estudiantes/AddEstudiante';
import EditEstudiante from './pages/Estudiantes/EditEstudiante';
import ViewCurso from './pages/Cursos/ViewCurso';
import AddCurso from './pages/Cursos/AddCurso';
import EditCurso from './pages/Cursos/EditCurso';

import axios from 'axios';
axios.defaults.baseURL = "http://localhost:8000/";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/estudiantes" element={<ViewEstudiante />} />
          <Route path="/estudiantes/add-estudiante" element={<AddEstudiante />} />
          <Route path="/estudiantes/edit-estudiante/:id" element={<EditEstudiante />} />
          <Route path="/cursos" element={<ViewCurso />} />
          <Route path="/cursos/add-curso" element={<AddCurso />} />
          <Route path="/cursos/edit-curso/:id" element={<EditCurso />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
