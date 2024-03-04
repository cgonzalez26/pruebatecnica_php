import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function ViewCurso() {

    const [loading, setLoading] = useState(true);
    const [Cursos, setCurso] = useState([]);

    useEffect(() => {
        let Cursos = [
            {id : "1", nombre: "Curso 1", descripcion: "test curso 1", estado: "abierto"},
            {id : "2", nombre: "Curso 2", descripcion: "test curso 2", estado: "cerrado"}
          ];
        /*axios.get(`/api/Cursos`).then(res=>{
            if(res.status === 200)
            {
                setCurso(res.data.Cursos)
                setLoading(false);
            }
        });*/
        setCurso(Cursos);
        setLoading(false);

    }, []);
    
    const deleteCurso = (e, id) => {
        e.preventDefault();
        
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Eliminando...";

        axios.delete(`/api/delete-curso/${id}`).then(res=>{
            if(res.data.status === 200)
            {
                swal("Eliminado!",res.data.message,"success");
                thisClicked.closest("tr").remove();
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                thisClicked.innerText = "Eliminar";
            }
        });
    }

    if(loading)
    {
        return <h4>Cargando datos de Cursos...</h4>
    }
    else
    {
        var Curso_HTMLTABLE = "";
        
        Curso_HTMLTABLE = Cursos.map( (item, index) => {
            return (
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.nombre}</td>
                    <td>{item.descripcion}</td>
                    <td>{item.estado}</td>                   
                    <td>
                        <Link to={`edit-curso/${item.id}`} className="btn btn-success btn-sm">Editar</Link>
                    </td>
                    <td>
                        <button type="button" onClick={(e) => deleteCurso(e, item.id)} className="btn btn-danger btn-sm">Eliminar</button>
                    </td>
                </tr>
            );
        });
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Cursos
                                    <Link to={'add-curso'} className="btn btn-primary btn-sm float-end"> Agregar Curso</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th>Descripcion</th>
                                            <th>Estado</th>                                        
                                            <th>Editar</th>
                                            <th>Eliminar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Curso_HTMLTABLE}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default ViewCurso;