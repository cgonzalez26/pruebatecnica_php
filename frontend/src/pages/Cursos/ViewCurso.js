import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function ViewCurso() {

    const [loading, setLoading] = useState(true);
    const [Cursos, setCurso] = useState([]);

    useEffect(() => {
        /*let Cursos = [
            {id : "1", nombre: "Curso 1", descripcion: "test curso 1", estado: "abierto"},
            {id : "2", nombre: "Curso 2", descripcion: "test curso 2", estado: "cerrado"}
          ];
        */
        //obtenemos a través de la API el listado de los Cursos de la Base de datos    
        axios.get(`/api/cursos`).then(res=>{
            if(res.status === 200)
            {
                setCurso(res.data.cursos)
                setLoading(false);
            }
        });
    }, []);
    
    //Definimos una contante para implemenatar la funcionalidad de Eliminar un Estudiante
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

    /*const confirmDeleteCurso = (e, id) => {
        var opcion = confirm("¿Desea eliminar el registro?");
        if (opcion == true) {
            deleteCurso(e, id);
        }
    }*/

    if(loading)
    {
        return <h4>Cargando datos de Cursos...</h4>
    }
    else
    {
        var Curso_HTMLTABLE = "";
        //Armamos el HTML de las filas de los datos de Estudiantes
        Curso_HTMLTABLE = Cursos?.map( (item, index) => {
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
                        <button type="button" onClick={(e) => {if(window.confirm('¿Esta seguro de eliminar el Registro?')){ deleteCurso(e,item.id)};}} className="btn btn-danger btn-sm">Eliminar</button>
                    </td>
                </tr>
            );
        });
    }
    //generamos el contenedor de los datos a mostrar
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