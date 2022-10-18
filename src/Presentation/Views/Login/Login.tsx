import useViewModel from './LoginViewModel';
import { Formik, Form, Field, ErrorMessage } from 'formik';

function Login() {

    const {
        onClickLogin,
        onChangeEmail,
        onChangePassword,
        initialValues,
        validationSchema
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
                                <small className="form-text text-muted">We'll never share your email with anyone else.</small>
                                <ErrorMessage name="email" render={message => <div className='text-danger'>{message}</div>} />
                            </div>
                            <br></br>
                            <div className="row justify-content-center">
                                <label>Username</label>
                                <Field  name="username" type="username" className="form-control" placeholder="Username..."/>
                                <ErrorMessage name="username" render={message => <div className='text-danger'>{message}</div>} />
                                <small className="form-text text-muted">Username cannot contain special characters.</small>
                            </div>
                            <br></br>
                            <div className="row justify-content-center">
                                <label>Password</label>
                                <Field name="password" type="password" className="form-control" placeholder="Password..."/>

                                <small className="form-text text-muted">Password must be eight characters or longer, must contain at least one special character, and at least one capital letter.</small>
                                <ErrorMessage name="password" render={message => <div className='text-danger'>{message}</div>} />  
                            </div>
                            <br></br>
                            <button type="submit" className="btn btn-primary">Login</button>
                        </Form>
                    </Formik>
                }
            </div>
        </div>
    );
}

export default Login;