// import { useState } from "react";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";


const Login = () => {
    const { signIn, logInWithGoogle } = useContext(AuthContext)
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/'
    console.log('state in the location', location.state)


    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user)
                Swal.fire({
                    title: "User Login Successful",
                    showClass: {
                      popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                      `
                    },
                    hideClass: {
                      popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                      `
                    }
                  });
                  navigate(from, {replace:true});
            })
    }
    const handleGoogleLogin = () =>{
        logInWithGoogle()
        .then(result => {
            const user = result.user;
            console.log(user)
            Swal.fire({
                title: "User Login Successful",
                showClass: {
                  popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `
                },
                hideClass: {
                  popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                  `
                }
              });
              navigate(from, {replace:true});
        })
        .catch(err=> {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: {err},
              });
        })
    }



    return (
        <>
            <Helmet>
                <title>DOE Courier || Login</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center md:w-1/2 lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                    </div>
                    <div className="card  md:w-1/2 max-w-lg shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            
                            <div className="form-control mt-6">
                                <input  className="btn btn-primary" type="submit" value="Login" />
                            </div>
                        </form>
                        <p className='px-6'><small>New Here? <Link to='/signup' className='text-blue-600 font-bold'>Create an account</Link></small></p>
                        <p onClick={handleGoogleLogin} className="text-blue-500"> With Google </p>
                        {/* <SocialLogin></SocialLogin> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;