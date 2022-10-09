import useViewModel from './RegistrationViewModel';

function Registration() {

    const { register, onChangeEmail, onChangePassword } = useViewModel();


    return (
        <div>
            <h1>Registration Page</h1>
            <h3>Register to use Dodo</h3>
            <input 
                placeholder="Email..." 
                onChange={(event) => onChangeEmail(event.target.value)}
            />

            <input 
                placeholder="Password..."
                type="password"
                onChange={(event) => onChangePassword(event.target.value)}
            />

            <button onClick={register}>Register</button>

        
        </div>
    );
}

export default Registration;