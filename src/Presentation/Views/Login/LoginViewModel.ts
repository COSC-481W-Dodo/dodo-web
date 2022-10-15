import { useState } from "react";
import { LoginUserUseCase } from '../../../Domain/UseCase/User/LoginUser';


export default function LoginViewModel() {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    async function onClickLogin() {
        try {
            //Logs the user in if they are registered
            const user = await LoginUserUseCase(loginEmail, loginPassword);
            console.log(user);
            return user
        } catch (error: any) {
            console.log(error.message);
        }
    };

    function onChangeEmail(event: any) {
        setLoginEmail(event.target.value);
    }


    function onChangePassword(event: any) {
        setLoginPassword(event.target.value);
    }

    return {
        onClickLogin,
        onChangeEmail,
        onChangePassword
    }
}