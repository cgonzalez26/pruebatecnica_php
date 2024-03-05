import React, {useState, useEffect} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function EditCurso(props) {
     //Inicializamos las variables a utilizar
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [cursoInput, setCurso] = useState([]);
    const [errorInput, setError] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        
        //const Curso_id = props.match.params.id;
        const Curso_id = id;
        axios.get(`/api/edit-curso/${Curso_id}`).then( res => {   
            //si se guardaron los datos correctamente emitimos un Mensaje y volvemos al listado
            if(res.data.status === 200)
            {
                setCurso(res.data.curso);
                setLoading(false);
            }
            //si No se guardaron los datos emitimos un mensaje de Error
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                navigate('/cursos');
            }
        });
        /*let Cursos = [
            {id : "1", nombre: "Curso 1", descripcion: "test curso 1", estado: "abierto"},
            {id : "2", nombre: "Curso 2", descripcion: "test curso 2", estado: "cerrado"}
          ];
          setCurso(Cursos[1]);
          setLoading(false);*/
            //[props.match.params.id,navigate]
    }, [id,navigate]);

    const handleInput = (e) => {
        e.persist();
        setCurso({...cursoInput, [e.target.name]: e.target.value });
    }
    //definimos la Constante para guardar el formulario de Edicion
    const updateCurso = (e) => {
        e.preventDefault();
        
        //const Curso_id = props.match.params.id;
        // const data = cursoInput;
        //obtenemos los datos del formulario
        const data = {
            nombre: cursoInput.nombre,
            descripcion: cursoInput.descripcion,
            estado: cursoInput.estado
        }
        const Curso_id = id;

        //mandamos los datos a la API para guardar los datos del Curso editado
        axios.put(`/api/update-curso/${Curso_id}`, data).then(res=>{
            //si se guardaron los datos correctamente emitimos un Mensaje y volvemos al listado
            if(res.data.status === 200)
            {
                swal("Éxito",res.data.message,"success");
                setError([]);
                navigate('/cursos');
            }
            else if(res.data.status === 422)
            {
                swal("Todos los campos son Obligatorios","","error");
                setError(res.data.validationErrors);
            }
            //si No se guardaron los datos emitimos un mensaje de Error
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
    //generamos el HTML del formulario de Edicion de Curso
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