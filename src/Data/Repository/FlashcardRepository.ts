import { db } from '../DataSource/firebase';
import { doc, setDoc, deleteDoc, updateDoc} from 'firebase/firestore';
import { Card } from '../../Common/interfaces';
import { query, where, collection, getDocs } from 'firebase/firestore';

export async function createFlashcard(flashcard: Card, tagNames: Array<String>, userId: string) {

    const result = await setDoc(doc(db, "flashcards", flashcard.id), {
        answer: flashcard.answer,
        question: flashcard.question,
        tags: tagNames,
        userId: userId
    });

    return result;
}

export async function getFlashcardsByCurrentUser(userId: string) {
    const q = query(collection(db, "flashcards"), where("userId", '==', userId));
    const result = await getDocs(q);
    return result;
}

export async function getFlashcardsByCurrentUserAndTags(userId: string, tagsSelected: Array<string>) {
    const q = query(collection(db, "flashcards"), where("userId", '==', userId), where("tags", "array-contains-any", tagsSelected));
    const result = await getDocs(q);
    return result;
}

export async function getFlashcardsByTags(tagsSelected: Array<string>) {
    const q = query(collection(db, "flashcards"), where("tags", "array-contains-any", tagsSelected));
    const result = await getDocs(q);
    return result;
}

// delete flashcard ()
export async function deleteFlashcard(flashcardId: string){;
    const result = await deleteDoc(doc(db, "flashcards", flashcardId));
    return result;
}

// eidt flashcard ()
export async function editFlashcard(flashcardId : string, updatedQuestion : string, updatedAnswer: string){
    const result = await updateDoc(doc(db,"flashcards", flashcardId), {
        question: updatedQuestion,
        answer: updatedAnswer
    });
    return result;
}