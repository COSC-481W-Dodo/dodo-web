import { arrayUnion, doc, setDoc } from 'firebase/firestore';
import { Tag } from '../../Common/interfaces';
import { db } from '../DataSource/firebase';

export async function createTag(newTag: Tag, userId: string) {
    const result = await setDoc(doc(db, "tags", newTag.id), { 
        name: newTag.tagName,
        authors: arrayUnion(newTag.id)
    });

    return result;
}