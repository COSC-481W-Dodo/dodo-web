import { editFlashcard } from '../../../Data/Repository/FlashcardRepository';


export async function EditFlashcardUseCase(flashcardId : string, updatedQuestion : string, updatedAnswer: string){
    return await editFlashcard(flashcardId, updatedQuestion, updatedAnswer);
}