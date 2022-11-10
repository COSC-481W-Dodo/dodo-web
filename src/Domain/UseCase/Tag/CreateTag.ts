import { createTag } from '../../../Data/Repository/TagRepository';

export async function CreateTagUseCase(tagName: string) {
    return await createTag(tagName);
}