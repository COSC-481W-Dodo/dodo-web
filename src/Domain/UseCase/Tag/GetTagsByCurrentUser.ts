import { getTagsByCurrentUser } from "../../../Data/Repository/TagRepository";

export async function GetTagsByCurrentUserUseCase(userId: string) {
    return await getTagsByCurrentUser(userId);
}