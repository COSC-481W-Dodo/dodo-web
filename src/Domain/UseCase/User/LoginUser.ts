import { loginUser } from "../../../Data/Repository/UserRepository";

export async function LoginUserUseCase(email: string, password: string) {
    return await loginUser(email, password);
}