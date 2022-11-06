import useViewModel from './LoginViewModel';
import { Formik, Form, Field, ErrorMessage } from 'formik';

function Login() {

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
        <div>
            <h1>Login Page</h1>
            <h3>Login to use Dodo</h3>

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
                                <Field name="email" type="email" className="form-control" placeholder="Email..." />
                                <ErrorMessage name="email" render={message => <div className='text-danger'>{message}</div>} />
                            </div>
                            <br></br>
                            <div className="row justify-content-center">
                                <label>Password</label>
                                <Field name="password" type={passwordType} className="form-control" placeholder="Password..."/>
                                <div className="form-check mt-2">
                                    <input className="form-check-input" type="checkbox" onClick={onClickShowPassword} />
                                    <label className="form-check-label">Show password</label>
                                </div>
                                <ErrorMessage name="password" render={message => <div className='text-danger'>{message}</div>} />  
                            </div>
                            <br></br>
                            <p>Need an account? <a href="/registration">Register</a> </p>
                            <button type="submit" className="btn btn-primary">Login</button>
                        </Form>
                    </Formik>
                }
            </div>
        </div>
    );
}

export default Login;