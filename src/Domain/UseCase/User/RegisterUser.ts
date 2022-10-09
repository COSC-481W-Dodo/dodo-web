import { registerUser } from "../../../Data/Repository/UserRepository";

export async function RegisterUserUseCase(email: string, password: string) {
    return await registerUser(email, password);
}