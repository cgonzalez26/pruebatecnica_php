import { Link } from 'react-router-dom';
import { Routes, Route} from 'react-router-dom';

import AuthUser from '../../../pages/Auth/AuthUser';
import Home from '../../../pages/Home/Home';
import Login from '../../../pages/Auth/Login';
import ViewEstudiante from '../../../pages/Estudiantes/ViewEstudiante';
import AddEstudiante from '../../../pages/Estudiantes/AddEstudiante';
import EditEstudiante from '../../../pages/Estudiantes/EditEstudiante';
import ViewCurso from '../../../pages/Cursos/ViewCurso';
import AddCurso from '../../../pages/Cursos/AddCurso';
import EditCurso from '../../../pages/Cursos/EditCurso';

function Auth() {
    const {token,logout} = AuthUser();
    const logoutUser = () => {
        if(token !== undefined){
            logout();
        }
    }

    return (
        <>

            <div className="pb-5">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container">
                        <Link className="navbar-brand" to="/home">Administración de Estudiantes</Link>

                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/home">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/estudiantes">Estudiantes</Link>
                            </li>    
                            <li className="nav-item">
                                <Link className="nav-link" to="/cursos">Cursos</Link>
                            </li>   
                            <li className="nav-item">
                                <span role="button" className="nav-link" onClick={logoutUser}>Salir</span>
                            </li>                         
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
            
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/estudiantes" element={<ViewEstudiante />} />
                <Route path="/estudiantes/add-estudiante" element={<AddEstudiante />} />
                <Route path="/estudiantes/edit-estudiante/:id" element={<EditEstudiante />} />
                <Route path="/cursos" element={<ViewCurso />} />
                <Route path="/cursos/add-curso" element={<AddCurso />} />
                <Route path="/cursos/edit-curso/:id" element={<EditCurso />} />
            </Routes>
            
         
        
        </>
    );
}

export default Auth;