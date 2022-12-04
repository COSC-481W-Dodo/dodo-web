import { deleteFlashcard } from "../../../Data/Repository/FlashcardRepository";

export async function DeleteFlashcardUseCase(flashcardId: string){
    return await deleteFlashcard(flashcardId);
}