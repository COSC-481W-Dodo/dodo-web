import { db } from '../DataSource/firebase';
import { doc, setDoc} from 'firebase/firestore';
import { Card } from '../../Common/interfaces';

export async function createFlashcard(flashcard: Card, tagNames: Array<String>, userId: string) {

    const result = await setDoc(doc(db, "flashcards", flashcard.id), {
        answer: flashcard.answer,
        question: flashcard.question,
        tags: tagNames,
        userId: userId
    });

    return result;
}