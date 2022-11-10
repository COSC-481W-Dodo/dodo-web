import { useState } from "react";
import { LoginUserUseCase } from '../../../Domain/UseCase/User/LoginUser';
import * as Yup from 'yup';

interface NewUser {
    email: string;
    password: string;
}

enum InputType {
    PASSWORD = "password",
    TEXT = "text"
}


export default function LoginViewModel() {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordType, setPasswordType] = useState(InputType.PASSWORD);

    // initial form values
    const initialValues = {
        email: "",
        password: "",
    }

    // Validation criteria for each field in the form
    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Please enter a valid email address.").required("Email is required."),
        password: Yup.string().required("Please provide a password."),
    });

    async function onClickLogin(formData: NewUser) {
        console.log("LoginViewModel line 38");
        const loginEmail = formData.email;
        const loginPassword = formData.password;

        setLoginEmail(loginEmail);
        console.log(formData);

        setLoginPassword(loginPassword);
        console.log(formData);

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

    function onClickShowPassword() {
        if (!passwordVisible) {
            setPasswordType(InputType.TEXT);
            setPasswordVisible(true);
        } else {
            setPasswordType(InputType.PASSWORD);
            setPasswordVisible(false);
        }
    }

    return {
        onClickLogin,
        onChangeEmail,
        onChangePassword,
        onClickShowPassword,
        initialValues,
        validationSchema,
        passwordVisible,
        passwordType
    }
}