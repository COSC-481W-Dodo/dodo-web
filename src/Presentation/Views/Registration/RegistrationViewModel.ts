import { useState, ChangeEvent } from 'react';
import { RegisterUserUseCase } from '../../../Domain/UseCase/User/RegisterUser';
import * as Yup from 'yup';

interface NewUser {
    email: string;
    username: string;
    password: string
}

export default function RegistrationViewModel() {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [isEmailTaken, setIsEmailTaken] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const initialValues = {
        email: "",
        username: "",
        password: ""
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Please enter a valid email address.").required("Email is required."),
        username: Yup.string().max(30, "Too Long! Maximum 30 characters.").required("Username is required.").matches(/^[A-Za-z0-9_]+$/, "Username cannot contain special characters or white spaces"),
        password: Yup.string().min(8, 'Must be at least 8 characters long' ).required("Please provide a password.").matches(/^[\0-9A-Za-z][!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?][\0-9a-zA-Z]*$/, 'Must contain a special character such as !,$,# etc')
    });

    async function onClickRegister(formData: NewUser) {
        const newEmail = formData.email;
        const newUsername = formData.username;
        const newPassword = formData.password;

        setRegisterEmail(newEmail);
        console.log(formData);

        try {
            //Creates an account and logins automatically
            const user = await RegisterUserUseCase(newEmail, newUsername, newPassword);
            console.log(user);
            setIsSubmitted(true);
        } catch (error: any) {
            console.log(error.code);
            if (error.code === "auth/email-already-in-use") {
                setIsEmailTaken(true);
            } else {
                setIsEmailTaken(false);
            }
        }

        
    };

    return {
        onClickRegister,
        validationSchema,
        initialValues,
        isEmailTaken,
        isSubmitted,
        registerEmail
    }
}