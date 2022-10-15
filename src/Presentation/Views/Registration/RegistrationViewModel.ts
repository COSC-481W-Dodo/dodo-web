import { useState } from 'react';
import { RegisterUserUseCase } from '../../../Domain/UseCase/User/RegisterUser';
import * as Yup from 'yup';

interface NewUser {
    email: string;
    username: string;
    password: string
}

enum InputType {
    PASSWORD = "password",
    TEXT = "text"
}

export default function RegistrationViewModel() {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerUsername, setRegisterUsername] = useState("");
    const [isEmailTaken, setIsEmailTaken] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordConfirmationVisible, setPasswordConfirmationVisible] = useState(false);
    const [passwordType, setPasswordType] = useState(InputType.PASSWORD);
    const [passwordConfirmationType, setPasswordConfirmationType] = useState(InputType.PASSWORD);
    

    // Initial values to be set in the form
    const initialValues = {
        email: "",
        emailConfirmation: "",
        username: "",
        password: "",
        passwordConfirmation: ""
    }

    // Validation criteria for each field in the form
    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Please enter a valid email address.").required("Email is required."),
        emailConfirmation: Yup.string().oneOf([Yup.ref("email"), null], "Email does not match!").required("Please confirm your email address."),
        username: Yup.string().max(30, "Too Long! Maximum 30 characters.").required("Username is required."),
        password: Yup.string().min(8, 'Must be at least 8 characters long' ).required("Please provide a password.").matches(/^(?=.*[A-Z])(?=.*[()@#$%^&+=]).*$/, "Password must have at least one capital letter and one special character."),
        passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], "Passwords do not match!").required("Please confirm your password.")
    });

    // Registering the user
    async function onClickRegister(formData: NewUser) {
        const newEmail = formData.email;
        const newUsername = formData.username;
        const newPassword = formData.password;

        setRegisterEmail(newEmail);
        console.log(formData);

        setRegisterUsername(newUsername);
        console.log(formData);

        try {
            //Creates an account and logins automatically
            const user = await RegisterUserUseCase(newEmail, newUsername, newPassword);
            console.log(user);
            setIsSubmitted(true);
        } catch (error: any) {
            console.log(error);
            console.log(error.code);

            if (error.code === "auth/email-already-in-use") {
                setIsEmailTaken(true);
            } else {
                setIsEmailTaken(false);
            }
        }
    };

    // OnClik methods for making the passwords visible to the user
    function onClickShowPassword() {
        if (!passwordVisible) {
            setPasswordType(InputType.TEXT);
            setPasswordVisible(true);
        } else {
            setPasswordType(InputType.PASSWORD);
            setPasswordVisible(false);
        }
    }

    function onClickShowPasswordConfirmation() {
        if (!passwordConfirmationVisible) {
            setPasswordConfirmationType(InputType.TEXT);
            setPasswordConfirmationVisible(true);
        } else {
            setPasswordConfirmationType(InputType.PASSWORD);
            setPasswordConfirmationVisible(false);
        }
    }

    return {
        onClickRegister,
        onClickShowPassword,
        onClickShowPasswordConfirmation,
        validationSchema,
        initialValues,
        isEmailTaken,
        isSubmitted,
        registerEmail,
        registerUsername,
        passwordType,
        passwordConfirmationType
    }
}