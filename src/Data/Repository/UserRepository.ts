import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { auth } from "../DataSource/firebase";

export async function registerUser(email: string, username: string, password: string) {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;

    sendEmailVerification(user);
    
    updateProfile(user, {
        displayName: username
    })
    console.log(auth.currentUser);
    return result;
}
