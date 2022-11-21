import { getFlashcardsByTags } from "../../../Data/Repository/FlashcardRepository";

export async function GetFlashcardsByTagsUseCase(tagsSelected: Array<string>) {
    return await getFlashcardsByTags(tagsSelected);
}