import useViewModel from './RegistrationViewModel';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import './registration.css';

function Registration() {

    const { onClickRegister, registerEmail, validationSchema, initialValues, isEmailTaken, isSubmitted } = useViewModel();

    return (
        <div>
            <h1>Registration Page</h1>
            <h3>Register to use Dodo</h3>

            <div >
                { !isSubmitted ? 
                    <Formik
                        initialValues={initialValues}
                        onSubmit={onClickRegister}
                        validationSchema={validationSchema}
                    >
                        <Form className='col-lg-4 offset-lg-4'>
                            
                            <div className="row justify-content-center">
                                <label>Email Address</label>
                                <Field name="email" type="email" className="form-control" placeholder="Email..." />
                                <ErrorMessage name="email" render={message => <div className='text-danger'>{message}</div>} />
                                { isEmailTaken && <div className='text-danger'>Email is already in use</div> }
                                <small className="form-text text-muted">We'll never share your email with anyone else.</small>
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
                                <ErrorMessage name="password" render={message => <div className='text-danger'>{message}</div>} />
                                <small className="form-text text-muted">Password must be eight characters or longer, must contain at least one special character, and at least one capital letter.</small>
                            </div>
                            <br></br>
                            <button type="submit" className="btn btn-primary">Register</button>
                        </Form>
                    </Formik> :
                    <div className='col-lg-4 offset-lg-4 text-center'>
                        <h3>Please verify your email</h3>
                        <p>We sent an email to { registerEmail }.</p>
                        <p>Just click on the link in that email to complete your signup. If you don't see it, you may need to <strong>check your spam</strong> folder.</p>
                    </div>
                }
            </div>

            

        </div>
    );
}

export default Registration;