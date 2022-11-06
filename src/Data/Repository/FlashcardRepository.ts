import { db } from '../DataSource/firebase';
import { doc, addDoc, collection } from 'firebase/firestore';

interface Card {
    question: string;
    answer: string;
}

export async function createFlashcard(flashcard: Card, tagNames: Array<String>) {

    const result = await addDoc(collection(db, "flashcards"), {
        answer: flashcard.answer,
        question: flashcard.question,
        tags: tagNames
    });

    return result;
}