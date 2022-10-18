import { changePassword } from "../../../Data/Repository/UserRepository";

export async function ChangePasswordUseCase(oldPassword: string, newPassword: string) {
    return await changePassword(oldPassword, newPassword);
}