import { db } from "../DataSource/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../DataSource/firebase";

export async function registerUser(email: string, password: string) {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return result;
}


export async function loginUser(email: string, password: string) {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result;
}