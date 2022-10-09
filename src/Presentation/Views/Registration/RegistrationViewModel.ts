import { useState } from 'react';
import { RegisterUserUseCase } from '../../../Domain/UseCase/User/RegisterUser';


export default function RegistrationViewModel() {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    async function onClickRegister() {
        try {
            //Creates an account and logins automatically
            const user = await RegisterUserUseCase(registerEmail, registerPassword);
            console.log(user);
        } catch (error: any) {
            console.log(error.message);
        }
    };

    function onChangeEmail(event: any) {
        setRegisterEmail(event.target.value);
    }


    function onChangePassword(event: any) {
        setRegisterPassword(event.target.value);
    }

    return {
        onClickRegister,
        onChangeEmail,
        onChangePassword
    }
}