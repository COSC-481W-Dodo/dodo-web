import { registerUser } from "../../../Data/Repository/UserRepository";

export async function RegisterUserUseCase(email: string, username: string, password: string) {
    return await registerUser(email, username, password);
}