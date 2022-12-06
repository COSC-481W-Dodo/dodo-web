import useViewModel from './EditAccountViewModel';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEffect } from 'react';


import './edit-account.css';

function EditAccount() {
    
    const { 
        onClickEditUsername,
        onClickChangePassword,
        getUserData,
        initialUsername,
        initialPassword,
        usernameValidationSchema,
        passwordValidationSchema,
        isEditingUsername,
        isChangingPassword,
        onClickToggleEditUsername,
        onClickToggleChangePassword,
        passwordCorrect,
        onClickShowOldPassword,
        onClickShowNewPassword,
        newPasswordType,
        oldPasswordType,
        navigate
    } = useViewModel();

    useEffect(() => {
        getUserData();

    }, []);

    return (
        <div className="pageContainer">
        <div className='edit-section mt-3'>
            <h1>Edit Profile</h1>

            { (!isEditingUsername && !isChangingPassword) &&
                <div className='edit-account-links'>
                    <p onClick={onClickToggleEditUsername}>Edit Username</p>
                    <p onClick={onClickToggleChangePassword}>Edit Password</p>
                </div>
            }

            {/* Renders simple form to edit username */}
            { isEditingUsername &&
                <div>
                    <Formik
                        enableReinitialize={true}
                        initialValues={initialUsername}
                        onSubmit={onClickEditUsername}
                        validationSchema={usernameValidationSchema}
                    >
                        <Form>
                            <div className='mb-3'>
                                <label>Username</label>
                                <Field name="username" className="form-control" placeholder="Enter a username..." />
                                <small className="form-text text-muted">Username cannot contain special characters.</small>
                                <ErrorMessage name="username" render={message => <div className='text-danger'>{message}</div>} />
                            </div>

                            <button type='submit' className='btn btn-primary'>Save</button>
                            <button type='reset' className='btn btn-secondary' onClick={onClickToggleEditUsername}>Cancel</button>
                        </Form>
                    </Formik>
                </div>
            }
            
            {/* Renders simple form to change the password */}
            { isChangingPassword &&
                <div>
                    <Formik
                        initialValues={initialPassword}
                        onSubmit={onClickChangePassword}
                        validationSchema={passwordValidationSchema}
                    >
                        <Form className='m-3'>
                            <div className='mb-3'>
                                <label>Current Password</label>
                                <Field name="oldPassword" type={oldPasswordType} className="form-control" placeholder="Enter your current password..." />
                                <div className="form-check mt-2">
                                    <input className="form-check-input" type="checkbox" onClick={onClickShowOldPassword} />
                                    <label className="form-check-label">Show password</label>
                                </div>
                                <ErrorMessage name="oldPassword" render={message => <div className='text-danger'>{message}</div>} />
                                { !passwordCorrect && <div className='text-danger'>Password is incorrect</div>}
                            </div>
                            <div className='mb-3'>
                                <label>New Password</label>
                                <Field name="newPassword" type={newPasswordType} className="form-control" placeholder="Enter a password..." />
                                <small className="form-text text-muted">Password must be eight characters or longer, must contain at least one special character, and at least one capital letter.</small>
                                <div className="form-check mt-2">
                                    <input className="form-check-input" type="checkbox" onClick={onClickShowNewPassword} />
                                    <label className="form-check-label">Show password</label>
                                </div>
                                <ErrorMessage name="newPassword" render={message => <div className='text-danger'>{message}</div>} />
                            </div>

                            <button type='submit' className='btn btn-primary'>Save</button>
                            <button type='reset' className='btn btn-secondary' onClick={onClickToggleChangePassword} >Cancel</button>
                        </Form>
                    </Formik>
                </div>
            }
            
        </div>
        </div>
    );
}

export default EditAccount;