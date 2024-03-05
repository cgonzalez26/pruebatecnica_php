import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function ViewEstudiante() {

    const [loading, setLoading] = useState(true);
    const [Estudiantes, setEstudiante] = useState([]);

    useEffect(() => {
        /*let Estudiantes = [
            {id : "1", nombre: "Jose Lopez", curso: "BD", email: "jlopez@gmail.com", telefono: "12345"},
            {id : "2", nombre: "Jorge Caro", curso: "Programacion", email: "jcaro@gmail.com", telefono: "123456"}
          ];*/
        axios.get(`/api/estudiantes`).then(res=>{
            console.log(res);
            if(res.status === 200)
            {
                setEstudiante(res.data.estudiantes)
                setLoading(false);
            }
        });
        /*setEstudiante(Estudiantes);
        setLoading(false);*/

    }, []);
    
    const deleteEstudiante = (e, id) => {
        e.preventDefault();
        
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Eliminando...";

        axios.delete(`/api/delete-estudiante/${id}`).then(res=>{
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
        return <h4>Cargando datos de Estudiantes...</h4>
    }
    else
    {
        var Estudiante_HTMLTABLE = "";
        console.log(Estudiantes);
        Estudiante_HTMLTABLE = Estudiantes?.map( (item, index) => {
            return (
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.nombre}</td>
                    <td>{item.curso}</td>
                    <td>{item.email}</td>
                    <td>{item.telefono}</td>
                    <td>
                        <Link to={`edit-estudiante/${item.id}`} className="btn btn-success btn-sm">Editar</Link>
                    </td>
                    <td>
                        <button type="button" onClick={(e) => deleteEstudiante(e, item.id)} className="btn btn-danger btn-sm">Eliminar</button>
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
                                <h4>Estudiantes
                                    <Link to={'add-estudiante'} className="btn btn-primary btn-sm float-end"> Agregar Estudiante</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th>Curso</th>
                                            <th>Email</th>
                                            <th>Telefono</th>
                                            <th>Editar</th>
                                            <th>Eliminar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Estudiante_HTMLTABLE}
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

export default ViewEstudiante;