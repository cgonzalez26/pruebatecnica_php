import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function AddEstudiante() {

    const navigate = useNavigate();
    const [estudianteInput, setEstudiante] = useState({
        nombre: '',
        curso: '',
        email: '',
        telefono: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setEstudiante({...estudianteInput, [e.target.name]: e.target.value })
    }

    const saveEstudiante = (e) => {
        e.preventDefault();
        
        const data = {
            nombre:estudianteInput.nombre,
            curso:estudianteInput.curso,
            email:estudianteInput.email,
            telefono:estudianteInput.telefono,
        }

        axios.post(`/api/add-estudiante`, data).then(res => {
            console.log('add ',res);
            if(res.data.status === 200)
            {
                swal("Éxito!",res.data.message,"success");
                setEstudiante({
                    nombre: '',
                    curso: '',
                    email: '',
                    telefono: '',
                    error_list: [],
                });
                navigate('/estudiantes');
            }
            else if(res.data.status === 422)
            {
                setEstudiante({...estudianteInput, error_list: res.data.validate_err });
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
                                <h4>Agregar Estudiante 
                                    <Link to={'/estudiantes'} className="btn btn-danger btn-sm float-end"> Volver</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <form onSubmit={saveEstudiante} >
                                    <div className="form-group mb-3">
                                        <label>Nombre</label>
                                        <input type="text" name="nombre" onChange={handleInput} value={estudianteInput.nombre} className="form-control" />
                                        <span className="text-danger">{estudianteInput.error_list.nombre}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Curso</label>
                                        <input type="text" name="curso" onChange={handleInput} value={estudianteInput.curso}  className="form-control" />
                                        <span className="text-danger">{estudianteInput.error_list.curso}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Email</label>
                                        <input type="text" name="email" onChange={handleInput} value={estudianteInput.email}  className="form-control" />
                                        <span className="text-danger">{estudianteInput.error_list.email}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Telefono</label>
                                        <input type="text" name="telefono" onChange={handleInput} value={estudianteInput.telefono}  className="form-control" />
                                        <span className="text-danger">{estudianteInput.error_list.telefono}</span>
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

export default AddEstudiante;