import { Link } from 'react-router-dom';

function Guest() {
    return (
        <>
           <div className="pb-5">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/home">Administración de Estudiantes</Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            
            </div>
        </nav>
        </div>
        </>
    );
}

export default Guest;