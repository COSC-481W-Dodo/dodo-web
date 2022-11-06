import { createFlashcard } from '../../../Data/Repository/FlashcardRepository';

interface Card {
    question: string;
    answer: string;
}

export async function CreateFlashcardUseCase(flashcard: Card, tagNames: Array<string>) {
    return await createFlashcard(flashcard, tagNames);
}