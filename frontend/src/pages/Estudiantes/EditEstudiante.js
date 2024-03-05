import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function EditEstudiante(props) {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [estudianteInput, setEstudiante] = useState([]);
    const [errorInput, setError] = useState([]);

    useEffect(() => {
        
        //const Estudiante_id = props.match.params.id;
        axios.get(`/api/edit-estudiante/${props.match.params.id}`).then( res => {   

            if(res.data.status === 200)
            {
                setEstudiante(res.data.Estudiante);
                setLoading(false);
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                navigate('/estudiantes');
            }
        });
        /*let Estudiantes = [
            {id : "1", nombre: "Jose Lopez", curso: "BD", email: "jlopez@gmail.com", telefono: "12345"},
            {id : "2", nombre: "Jorge Caro", curso: "Programacion", email: "jcaro@gmail.com", telefono: "123456"}
          ];
          setEstudiante(Estudiantes[1]);
          setLoading(false);*/
            //[props.match.params.id,navigate]
    }, [navigate]);

    const handleInput = (e) => {
        e.persist();
        setEstudiante({...estudianteInput, [e.target.name]: e.target.value });
    }

    const updateEstudiante = (e) => {
        e.preventDefault();
        
        //const Estudiante_id = props.match.params.id;
        // const data = estudianteInput;
        const data = {
            nombre: estudianteInput.nombre,
            curso: estudianteInput.curso,
            email: estudianteInput.email,
            telefono: estudianteInput.telefono,
        }

        axios.put(`/api/update-estudiante/${props.match.params.id}`, data).then(res=>{
            if(res.data.status === 200)
            {
                swal("Éxito",res.data.message,"success");
                setError([]);
                navigate('/estudiantes');
            }
            else if(res.data.status === 422)
            {
                swal("Todos los campos son Obligatorios","","error");
                setError(res.data.validationErrors);
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                navigate('/estudiantes');
            }
        });
    }

    if(loading)
    {
        return <h4>Cargando datos de Estudiante...</h4>
    }
    
    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Editar Estudiantes
                                    <Link to={'/Estudiantes'} className="btn btn-danger btn-sm float-end"> Volver</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <form onSubmit={updateEstudiante} >
                                    <div className="form-group mb-3">
                                        <label>Nonbre</label>
                                        <input type="txt" name="name" onChange={handleInput} value={estudianteInput.nombre} className="form-control" />
                                        <span className="text-danger">{errorInput.name}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Curso</label>
                                        <input type="text" name="course" onChange={handleInput} value={estudianteInput.curso}  className="form-control" />
                                        <span className="text-danger">{errorInput.course}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Email</label>
                                        <input type="text" name="email" onChange={handleInput} value={estudianteInput.email}  className="form-control" />
                                        <span className="text-danger">{errorInput.email}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Telefono</label>
                                        <input type="text" name="phone" onChange={handleInput} value={estudianteInput.telefono}  className="form-control" />
                                        <span className="text-danger">{errorInput.phone}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="submit" id="updatebtn" className="btn btn-primary">Guardar</button>
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

export default EditEstudiante;