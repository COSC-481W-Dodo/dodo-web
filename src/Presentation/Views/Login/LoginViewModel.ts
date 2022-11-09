import { useState } from "react";
import { LoginUserUseCase } from '../../../Domain/UseCase/User/LoginUser';
import * as Yup from 'yup';


interface NewUser {
    email: string;
    username: string;
    password: string
}

export default function LoginViewModel() {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    // initial form values
    const initialValues = {
        email: "",
        username: "",
        password: "",
    }

    // Validation criteria for each field in the form
    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Please enter a valid email address.").required("Email is required."),
        username: Yup.string().max(30, "Too Long! Maximum 30 characters.").required("Username is required."),
        password: Yup.string().min(8, 'Must be at least 8 characters long' ).required("Please provide a password.").matches(/^(?=.*[A-Z])(?=.*[()@#$%^&+=]).*$/, "Password must have at least one capital letter and one special character."),
    });

    async function onClickLogin(formData: NewUser) {
        const loginEmail = formData.email;
        const loginPassword = formData.password;

        setLoginEmail(loginEmail);
        console.log(formData);

        setLoginPassword(loginPassword);
        console.log(formData);

        try {
            //Logs the user in if they are registered
            const user = await LoginUserUseCase(loginEmail, loginPassword);
            return user;
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
        onChangePassword,
        initialValues,
        validationSchema
    }
}