import { getFlashcardsByCurrentUser } from "../../../Data/Repository/FlashcardRepository";

export async function GetFlashcardsByCurrentUserUseCase(userId: string) {
    return await getFlashcardsByCurrentUser(userId);
}