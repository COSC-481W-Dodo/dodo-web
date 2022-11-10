import { createFlashcard } from '../../../Data/Repository/FlashcardRepository';
import { Card } from '../../../Common/interfaces';

export async function CreateFlashcardUseCase(flashcard: Card, tagNames: Array<string>, userId: string) {
    return await createFlashcard(flashcard, tagNames, userId);
}