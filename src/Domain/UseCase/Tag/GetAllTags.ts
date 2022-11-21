import { getAllTags } from "../../../Data/Repository/TagRepository";

export async function GetAllTagsUseCase() {
    return await getAllTags();
}