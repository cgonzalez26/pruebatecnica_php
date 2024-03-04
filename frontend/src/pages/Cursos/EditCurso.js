import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function EditCurso(props) {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [cursoInput, setCurso] = useState([]);
    const [errorInput, setError] = useState([]);

    useEffect(() => {
        
        //const Curso_id = props.match.params.id;
       /* axios.get(`/api/edit-Curso/${props.match.params.id}`).then( res => {   

            if(res.data.status === 200)
            {
                setCurso(res.data.Curso);
                setLoading(false);
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                navigate('/Cursos');
            }
        });*/
        let Cursos = [
            {id : "1", nombre: "Curso 1", descripcion: "test curso 1", estado: "abierto"},
            {id : "2", nombre: "Curso 2", descripcion: "test curso 2", estado: "cerrado"}
          ];
          setCurso(Cursos[1]);
          setLoading(false);
            //[props.match.params.id,navigate]
    }, [navigate]);

    const handleInput = (e) => {
        e.persist();
        setCurso({...cursoInput, [e.target.name]: e.target.value });
    }

    const updateCurso = (e) => {
        e.preventDefault();
        
        //const Curso_id = props.match.params.id;
        // const data = cursoInput;
        const data = {
            nombre: cursoInput.nombre,
            descripcion: cursoInput.descripcion,
            estado: cursoInput.estado
        }

        axios.put(`/api/update-curso/${props.match.params.id}`, data).then(res=>{
            if(res.data.status === 200)
            {
                swal("Success",res.data.message,"success");
                setError([]);
                navigate('/cursos');
            }
            else if(res.data.status === 422)
            {
                swal("All fields are mandetory","","error");
                setError(res.data.validationErrors);
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                navigate('/cursos');
            }
        });
    }

    if(loading)
    {
        return <h4>Cargando datos de Curso...</h4>
    }
    
    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Editar Cursos
                                    <Link to={'/cursos'} className="btn btn-danger btn-sm float-end"> Volver</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <form onSubmit={updateCurso} >
                                    <div className="form-group mb-3">
                                        <label>Nonbre</label>
                                        <input type="txt" name="nombre" onChange={handleInput} value={cursoInput.nombre} className="form-control" />
                                        <span className="text-danger">{errorInput.nombre}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Descripcion</label>
                                        <input type="text" name="descripcion" onChange={handleInput} value={cursoInput.descripcion}  className="form-control" />
                                        <span className="text-danger">{errorInput.descripcion}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Estado</label>
                                        <input type="text" name="estado" onChange={handleInput} value={cursoInput.estado}  className="form-control" />
                                        <span className="text-danger">{errorInput.estado}</span>
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

export default EditCurso;