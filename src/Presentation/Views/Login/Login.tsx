import { useEffect, useState } from 'react';
import useViewModel from './LoginViewModel';

function Login() {

    const { onClickLogin, onChangeEmail, onChangePassword } = useViewModel();

    return (
        <div>
            <h1>Login Page</h1>
            <h3>Login to Dodo!</h3>
            <input 
                placeholder="Email..." 
                onChange={onChangeEmail}
            />

            <input
                id="passwordBox" 
                placeholder="Password..."
                type="password"
                onChange={onChangePassword}
            />
            

            <button onClick={onClickLogin}>Login</button>

        </div>
    );
}

export default Login;