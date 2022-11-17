import { Tag } from '../../../Common/interfaces';
import { createTag } from '../../../Data/Repository/TagRepository';

export async function CreateTagUseCase(newTag: Tag, userId: string) {
    return await createTag(newTag, userId);
}