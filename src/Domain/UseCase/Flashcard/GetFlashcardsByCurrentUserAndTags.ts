import { getFlashcardsByCurrentUserAndTags } from "../../../Data/Repository/FlashcardRepository";

export async function GetFlashcardsByCurrentUserAndTagsUseCase(userId: string, tagsSelected: Array<string>) {
    return await getFlashcardsByCurrentUserAndTags(userId, tagsSelected);
}