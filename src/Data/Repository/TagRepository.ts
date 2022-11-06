import { doc, setDoc } from 'firebase/firestore';
import { db } from '../DataSource/firebase';

export async function createTag(tagName: string) {
    const result = await setDoc(doc(db, "tags", tagName), { });

    return result;
}