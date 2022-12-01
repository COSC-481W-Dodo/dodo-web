import { arrayUnion, doc, setDoc, updateDoc, query, where, collection, getDocs, orderBy } from 'firebase/firestore';
import { Tag } from '../../Common/interfaces';
import { db } from '../DataSource/firebase';

export async function createTag(newTag: Tag, userId: string) {
    const tagDocRef = doc(db, "tags", newTag.id);

    let data = {};
    let result = null;

    try {
        // Attempt to update the document with given tag ID
        data = {
            authors: arrayUnion(userId)
        }
        result = await updateDoc(tagDocRef, data);
    } catch(error: any) {
        
        // There was no document to update so we create a new one
        if (error.code === "not-found") {
            data = {
                name: newTag.name,
                authors: arrayUnion(userId) 
            }
            result = await setDoc(tagDocRef, data);
        }
    }

    return result;
}

export async function getAllTags() {
    const q = query(collection(db, "tags"), orderBy("name"));
    const result = await getDocs(q);
    return result;
}

export async function getTagsByCurrentUser(userId: string) {
    const q = query(collection(db, "tags"), where("authors", 'array-contains', userId), orderBy("name"));
    const result = await getDocs(q);
    return result;
}
