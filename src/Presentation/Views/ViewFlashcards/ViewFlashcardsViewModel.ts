import { useState } from 'react';
import { FlashcardDatabase, TagDatabase, FilterFlashcardData } from '../../../Common/interfaces';
import { auth } from '../../../Data/DataSource/firebase';
import { DocumentData } from 'firebase/firestore';

import { GetTagsByCurrentUserUseCase } from '../../../Domain/UseCase/Tag/GetTagsByCurrentUser';
import { GetAllTagsUseCase } from '../../../Domain/UseCase/Tag/GetAllTags';
import { GetFlashcardsByCurrentUserUseCase } from '../../../Domain/UseCase/Flashcard/GetFlashcardsByCurrentUser';
import { GetFlashcardsByCurrentUserAndTagsUseCase } from '../../../Domain/UseCase/Flashcard/GetFlashcardsByCurrentUserAndTags';
import { GetFlashcardsByTagsUseCase } from '../../../Domain/UseCase/Flashcard/GetFlashcardsByTags';

export default function ViewFlashcardsViewModel() {
    const [flashcards, setFlashcards] = useState<Array<DocumentData>>();
    const [tags, setTags] = useState<Array<TagDatabase>>();
    const [selectedTags, setSelectedTags] = useState<Array<string>>();
    const [showOnlyCurrentUser, setShowOnlyCurrentUser] = useState(true);
    const [initialValues, setInitialValue] = useState<FilterFlashcardData>({
        showOnlyCurrentUser: true,
        selected: []
    });

    async function displayFlashcards() {
        try {
            if (auth.currentUser) {
                const result = await GetFlashcardsByCurrentUserUseCase(auth.currentUser.uid);
                console.log(result.docs);
                // result.forEach((doc) => {
                //     setFlashcards(doc.data());
                // })

                return result;
            }
            
        } catch(error: any) {
            console.log(error);
        }
    }
    async function displayTags() {
        try {
            if (auth.currentUser) {
                const result = await GetTagsByCurrentUserUseCase(auth.currentUser.uid);
                console.log(result.docs);
            }
        } catch (error: any) {
            console.log(error);
        }
    }

    function getFlashcards() {

        try {

        } catch (error: any) {

        }
    }

    async function onClickHandleFilters(data: FilterFlashcardData) {
        setShowOnlyCurrentUser(data.showOnlyCurrentUser);
        
        if (data.showOnlyCurrentUser) {
            try {
                if (auth.currentUser) {
                    const result = await GetFlashcardsByCurrentUserAndTagsUseCase(auth.currentUser.uid, data.selected);
                    return result;
                }
            } catch (error: any) {
                console.log(error);
            }
        } else {
            try {
                const result = await GetFlashcardsByTagsUseCase(data.selected);
            } catch (error: any) {
                console.log(error);
            }
        }
    }

    return {
        flashcards,
        tags,
        setFlashcards,
        setTags,
        initialValues,
        onClickHandleFilters,
        displayFlashcards
    }
}