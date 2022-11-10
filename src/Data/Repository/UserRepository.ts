import { 
    createUserWithEmailAndPassword, 
    updateProfile, 
    sendEmailVerification, 
    EmailAuthProvider, 
    reauthenticateWithCredential, 
    updatePassword,
    signInWithEmailAndPassword
} from "firebase/auth";
import { auth } from "../DataSource/firebase";

export async function registerUser(email: string, username: string, password: string) {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;

    sendEmailVerification(user);
    
    updateProfile(user, {
        displayName: username
    });
    console.log(auth.currentUser);
    return result;
}

export async function editUsername(newUsername: string) {
    
    const user = auth.currentUser;
    
    if (user !== null) {
        await updateProfile(user, {
            displayName: newUsername
        });
    }

    return user;
}

export async function changePassword(oldPassword: string, newPassword: string) {

    const user = auth.currentUser;

    if (user !== null && user.email !== null) {
        const cred = EmailAuthProvider.credential(user.email, oldPassword);

        await reauthenticateWithCredential(user, cred);

        await updatePassword(user, newPassword);
    }
    
    return user;
}

export async function loginUser(email: string, password: string) {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result;
}