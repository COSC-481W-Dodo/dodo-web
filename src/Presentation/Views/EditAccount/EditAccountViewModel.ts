import { useState } from "react";
import { EditUsernameUseCase } from "../../../Domain/UseCase/User/EditUsername";
import { ChangePasswordUseCase } from "../../../Domain/UseCase/User/ChangePassword";
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../../../Data/DataSource/firebase';
import * as Yup from 'yup';

interface EditUsernameFormValues {
    username: string,
}

interface EditPasswordFormValues {
    oldPassword: string,
    newPassword: string
}

enum InputType {
    PASSWORD = "password",
    TEXT = "text"
}

export default function EditAccountViewModel() {
    
    const [user, setUser] = useState<User | null>();
    const [isEditingUsername, setIsEditingUsername] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [passwordCorrect, setPasswordCorrect] = useState(true);
    const [oldPasswordType, setOldPasswordType] = useState(InputType.PASSWORD);
    const [newPasswordType, setNewPasswordType] = useState(InputType.PASSWORD);

    const initialUsername = {
        username: user?.displayName || ""
    }

    const initialPassword = {
        oldPassword: "",
        newPassword: ""
    }

    const usernameValidationSchema = Yup.object().shape({
        username: Yup.string().max(30, "Too Long! Maximum 30 characters.").required("Username is required.")
    });

    const passwordValidationSchema = Yup.object().shape({
        oldPassword: Yup.string().required("Please type your current password."),
        newPassword: Yup.string().min(8, 'Must be at least 8 characters long' ).required("Please provide a password.").matches(/^(?=.*[A-Z])(?=.*[()@#$%^&+=]).*$/, "Password must have at least one capital letter and one special character.")
    })

    function getUserData() {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    }

    function onClickToggleEditUsername() {
        if (isEditingUsername) {
            setIsEditingUsername(false);
        } else {
            setIsEditingUsername(true);
        }
    }

    function onClickToggleChangePassword() {
        if (isChangingPassword) {
            setIsChangingPassword(false);
            setPasswordCorrect(true);
        } else {
            setIsChangingPassword(true);
        }
    }

    async function onClickEditUsername(formData: EditUsernameFormValues) {

        const newUsername = formData.username;

        try {
            await EditUsernameUseCase(newUsername).then(() => {
                alert("Username has been successfully updated");
                window.location.reload();
            });
        } catch (error: any) {
            console.log(error);
        }
    }

    async function onClickChangePassword(formData: EditPasswordFormValues) {

        const oldPassword = formData.oldPassword;
        const newPassword = formData.newPassword;

        try {
            await ChangePasswordUseCase(oldPassword, newPassword).then(() => {
                setPasswordCorrect(true);
                alert("Password has been successfully updated");
                window.location.reload();
            });
            
        } catch (error: any) {
            console.log(error);
            if (error.code === "auth/wrong-password") {
                setPasswordCorrect(false);
            }
        }
    }

    function onClickShowOldPassword() {
        if (oldPasswordType === InputType.PASSWORD) {
            setOldPasswordType(InputType.TEXT);
        } else {
            setOldPasswordType(InputType.PASSWORD);
        }
    }

    function onClickShowNewPassword() {
        if (newPasswordType === InputType.PASSWORD) {
            setNewPasswordType(InputType.TEXT);
        } else {
            setNewPasswordType(InputType.PASSWORD);
        }
    }


    return {
        onClickEditUsername,
        onClickChangePassword,
        getUserData,
        initialUsername,
        initialPassword,
        usernameValidationSchema,
        passwordValidationSchema,
        user,
        isEditingUsername,
        isChangingPassword,
        onClickToggleEditUsername,
        onClickToggleChangePassword,
        passwordCorrect,
        onClickShowOldPassword,
        onClickShowNewPassword,
        newPasswordType,
        oldPasswordType
    }
}