import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function AddCurso() {

    const navigate = useNavigate();
    const [cursoInput, setCurso] = useState({
        nombre: '',
        descripcion: '',
        estado: '',        
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setCurso({...cursoInput, [e.target.name]: e.target.value })
    }

    const saveCurso = (e) => {
        e.preventDefault();
        
        const data = {
            nombre:cursoInput.nombre,
            descripcion:cursoInput.descripcion,
            estado:cursoInput.estado
        }

        axios.post(`/api/add-curso`, data).then(res => {

            if(res.data.status === 200)
            {
                swal("Success!",res.data.message,"success");
                setCurso({
                    nombre: '',
                    descripcion: '',
                    estado: '',                
                    error_list: [],
                });
                navigate('/Cursos');
            }
            else if(res.data.status === 422)
            {
                setCurso({...cursoInput, error_list: res.data.validate_err });
            }
        });
    }

    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Agregar Curso 
                                    <Link to={'/Cursos'} className="btn btn-danger btn-sm float-end"> Volver</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <form onSubmit={saveCurso} >
                                    <div className="form-group mb-3">
                                        <label>Nombre</label>
                                        <input type="text" name="nombre" onChange={handleInput} value={cursoInput.nombre} className="form-control" />
                                        <span className="text-danger">{cursoInput.error_list.nombre}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Descripcion</label>
                                        <input type="text" name="descripcion" onChange={handleInput} value={cursoInput.descripcion}  className="form-control" />
                                        <span className="text-danger">{cursoInput.error_list.descripcion}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Estado</label>
                                        <input type="text" name="estado" onChange={handleInput} value={cursoInput.estado}  className="form-control" />
                                        <span className="text-danger">{cursoInput.error_list.estado}</span>
                                    </div>
                                   
                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-primary">Guardar</button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default AddCurso;