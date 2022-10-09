import useViewModel from './RegistrationViewModel';

function Registration() {

    const { onClickRegister, onChangeEmail, onChangePassword } = useViewModel();


    return (
        <div>
            <h1>Registration Page</h1>
            <h3>Register to use Dodo</h3>
            <input 
                placeholder="Email..." 
                onChange={onChangeEmail}
            />

            <input 
                placeholder="Password..."
                type="password"
                onChange={onChangePassword}
            />

            <button onClick={onClickRegister}>Register</button>

        
        </div>
    );
}

export default Registration;