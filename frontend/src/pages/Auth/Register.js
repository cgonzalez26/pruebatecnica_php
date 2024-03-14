import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import AuthUser from './AuthUser';
import { useForm } from "react-hook-form";
import swal from 'sweetalert';

function Register() {
    const navigate = useNavigate();
    const {http,setToken} = AuthUser();
    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [errorRegistro,setErrorRegistro] = useState();
    const { register, handleSubmit,  formState: { errors } } = useForm({
        shouldUseNativeValidation: true,
      });

    const onSubmit = () => {
        //console.log(errors);
        setErrorRegistro(false);
        http.post('/register',{name:name,email:email,password:password})
        .then((res)=>{
            console.log('register',res);
            if(res.request.status === 200)
            {
                swal("Éxito!",res.data.message,"success");
                navigate('/login')
            }
            else if(res.request.status === 401)
            {
                swal("Error",res.request.message,"error");
            }
        })
        .catch((e) => {
            console.log('entro',errors);
            setErrorRegistro(true);
        });
    }
    const messages = {
        req: "Este campo es obligatorio",
        name: "El formato introducido no es el correcto",
        mail: "Debes introducir una dirección correcta"
       };

    const patterns = {
        mail:/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    };

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row justify-content-center pt-5">
                <div className="col-sm-6">
                    <div className="card p-4">
                        <h1 className="text-center mb-3">Registro </h1>
                        <div className="form-group">
                            <label>Nombre:</label>
                            <input type="text" className="form-control" placeholder="Imgresar Nombre"
                                onChange={e=>setName(e.target.value)}
                            id="name" {...register("name", { required: messages.req })}/>
                        </div>
                        {errors.name && <p className='text-danger'>{errors.name.message}</p>}
                        <div className="form-group mt-3">
                            <label>E-mail:</label>
                            <input type="email" className="form-control" placeholder="Ingresar e-mail"
                                onChange={e=>setEmail(e.target.value)}
                                id="email" {...register("email", { required: messages.req,
                                pattern: {
                                    value: patterns.mail,
                                    message: messages.mail
                                } })}/>
                        </div>
                        {errors.email && <p className='text-danger'>{errors.email.message}</p>}
                        <div className="form-group mt-3">
                            <label>Password:</label>
                            <input type="password" className="form-control" placeholder="Ingresar password"
                                onChange={e => setPassword(e.target.value)}
                            id="password" {...register("password", { required: messages.req })}/>
                        </div>
                        {errors.password && <p className='text-danger'>{errors.password.message}</p>}
                        {errorRegistro && <p className='text-danger'>Hubo un problema a registrar el Usuario.</p>}
                        <button type="submit" className="btn btn-primary mt-4">Registrar</button>
                    </div>
                </div>
            </div>
        </form>    
    )
}

export default Register;