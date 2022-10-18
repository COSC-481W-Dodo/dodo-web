import { editUsername } from "../../../Data/Repository/UserRepository";

export async function EditUsernameUseCase(newUsername: string) {
    return await editUsername(newUsername);
}