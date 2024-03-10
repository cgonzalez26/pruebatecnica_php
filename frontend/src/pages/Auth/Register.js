import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import AuthUser from './AuthUser';

function Register() {
    const navigate = useNavigate();
    const {http,setToken} = AuthUser();
    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();

    const submitForm = () =>{
        // api call
        http.post('/register',{email:email,password:password,name:name}).then((res)=>{
            navigate('/login')
        })
    }

    return(
        <div className="row justify-content-center pt-5">
            <div className="col-sm-6">
                <div className="card p-4">
                    <h1 className="text-center mb-3">Registro </h1>
                    <div className="form-group">
                        <label>Nombre:</label>
                        <input type="text" className="form-control" placeholder="Imgresar Nombre"
                            onChange={e=>setName(e.target.value)}
                        id="name" />
                    </div>
                    <div className="form-group mt-3">
                        <label>E-mail:</label>
                        <input type="email" className="form-control" placeholder="Ingresar e-mail"
                            onChange={e=>setEmail(e.target.value)}
                        id="email" />
                    </div>

                    <div className="form-group mt-3">
                        <label>Password:</label>
                        <input type="password" className="form-control" placeholder="Ingresar password"
                            onChange={e => setPassword(e.target.value)}
                        id="password" />
                    </div>
                    <button type="button" onClick={submitForm} className="btn btn-primary mt-4">Registrar</button>
                </div>
            </div>
        </div>
    )
}

export default Register;