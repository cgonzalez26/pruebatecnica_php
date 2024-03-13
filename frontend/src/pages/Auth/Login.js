import { useState } from "react"
import AuthUser from './AuthUser';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from "react-hook-form";
import swal from 'sweetalert';

function Login() {
    const navigate = useNavigate();
    const {http,setToken} = AuthUser();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [errorLogin,setErrorLogin] = useState();
    const { register, handleSubmit,  formState: { errors } } = useForm({
        shouldUseNativeValidation: true,
      });

    const submitForm = () =>{
        // api call
        //try {
        http.post('/login',{email:email,password:password})
            .then((res)=>{
                console.log('aqui',res);
                if(res.data.status === 200)
                {
                    setToken(res.data.user,res.data.access_token);
                    navigate('/home')
                }
                else if(res.status === 401)
                {
                    swal("Error",res.data.message,"error");
                }
             })
             .catch((e) => {
                console.log('entro',e);
                //this console logs Error: Network Error
                // at createError (monkeytype.js:formatted:35086:25)
                // at XMLHttpRequest.handleError (monkeytype.js:formatted:34457:28)
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

    const onSubmit = (useForm) => {
        console.log('onSubmit',useForm);
        //console.log(errors);
        setErrorLogin(false);
        http.post('/login',{email:useForm.email,password:useForm.password})
        .then((res)=>{
            console.log('login',res);
            if(res.request.status === 200)
            {
                setToken(res.data.user,res.data.access_token);
                navigate('/home')
            }
            else if(res.request.status === 401)
            {
                swal("Error",res.request.message,"error");
            }
        })
        .catch((e) => {
            console.log('entro',errors);
            setErrorLogin(true);
            //swal("Error","Usuario incorrecto","error");
            //this console logs Error: Network Error
            // at createError (monkeytype.js:formatted:35086:25)
            // at XMLHttpRequest.handleError (monkeytype.js:formatted:34457:28)
        });;
    }
       
    return(
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row justify-content-center pt-5">
            <div className="col-sm-6">
                <div className="card p-4">
                    <h1 className="text-center mb-3">Login </h1>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" className="form-control" placeholder="Enter email"
                            onChange={e=>setEmail(e.target.value)}
                        id="email" {...register("email", { required: messages.req,
                            pattern: {
                                value: patterns.mail,
                                message: messages.mail
                            } })} />
                    </div>
                    {errors.email && <p className='text-danger'>{errors.email.message}</p>}
                    <div className="form-group mt-3">
                        <label>Contraseña:</label>
                        <input type="password" className="form-control" placeholder="Enter password"
                            onChange={e => setPassword(e.target.value)}
                        id="password" {...register("password", { required: messages.req })} />
                    </div>
                    {errors.password && <p className='text-danger'>{errors.password.message}</p>}
                    {errorLogin && <p className='text-danger'>El mail o el password son Incorrectos.</p>}
                    <button type="submit" className="btn btn-primary mt-4">Login</button>
                </div>
            </div>
        </div>
        </form>
    )
}

export default Login;