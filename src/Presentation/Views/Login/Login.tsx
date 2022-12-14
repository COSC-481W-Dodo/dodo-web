import useViewModel from './LoginViewModel';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../../Data/DataSource/firebase";
import { Navigate } from "react-router-dom";

function Login() {
    const [user, setUser] = useState({});
    React.useEffect(() => {
        onAuthStateChanged(auth, (currentUser: any) => {setUser(currentUser);})
    },[]);
    const {
        onClickLogin,
        onClickShowPassword,
        onChangeEmail,
        onChangePassword,
        initialValues,
        validationSchema,
        passwordVisible,
        passwordType
    } = useViewModel();

    return (
        <>
            { auth.currentUser !== null ?
                <Navigate to="/" />
                :
                <div>
                    <h3 className='mt-3'>Login to use Dodo</h3>

                    <div>
                        {
                            <Formik
                                initialValues={initialValues}
                                onSubmit={onClickLogin}
                                validationSchema={validationSchema}
                            >
                                <Form className='col-lg-4 offset-lg-4'>

                                    <div className="row justify-content-center">
                                        <label>Email Address</label>
                                        <Field name="email" type="email" className="form-control"
                                               placeholder="Email..."/>
                                        <ErrorMessage name="email"
                                                      render={message => <div className='text-danger'>{message}</div>}/>
                                    </div>
                                    <br></br>
                                    <div className="row justify-content-center">
                                        <label>Password</label>
                                        <Field name="password" type={passwordType} className="form-control"
                                               placeholder="Password..."/>
                                        <div className="form-check mt-2">
                                            <input className="form-check-input" type="checkbox"
                                                   onClick={onClickShowPassword}/>
                                            <label className="form-check-label">Show password</label>
                                        </div>
                                        <ErrorMessage name="password"
                                                      render={message => <div className='text-danger'>{message}</div>}/>
                                    </div>
                                    <br></br>
                                    <p>Need an account? <a href="/registration">Register</a></p>
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </Form>
                            </Formik>
                        }
                    </div>
                </div>

            }
            </>
    );
}

export default Login;