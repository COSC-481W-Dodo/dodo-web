import { useEffect, useState, useRef } from 'react';
import { FlashcardDatabase, TagDatabase, TagsFormData } from '../../../Common/interfaces';
import { auth } from '../../../Data/DataSource/firebase';
import { DocumentData } from 'firebase/firestore';

import { GetTagsByCurrentUserUseCase } from '../../../Domain/UseCase/Tag/GetTagsByCurrentUser';
import { GetAllTagsUseCase } from '../../../Domain/UseCase/Tag/GetAllTags';
import { GetFlashcardsByCurrentUserUseCase } from '../../../Domain/UseCase/Flashcard/GetFlashcardsByCurrentUser';
import { GetFlashcardsByCurrentUserAndTagsUseCase } from '../../../Domain/UseCase/Flashcard/GetFlashcardsByCurrentUserAndTags';
import { GetFlashcardsByTagsUseCase } from '../../../Domain/UseCase/Flashcard/GetFlashcardsByTags';

import * as Yup from 'yup';


export default function ViewFlashcardsViewModel() {
    const [flashcards, setFlashcards] = useState<Array<FlashcardDatabase>>([]);
    const [tags, setTags] = useState<Array<TagDatabase>>([]);
    const showOnlyUser = useRef(true);
    const selectedTags = useRef<Array<string>>([]);
    const [initialValues, setInitialValues] = useState<TagsFormData>({
        showOnlyCurrentUser: true,
        selected: []
    });

    async function onLoadInitializeFlashcardsAndTags() {

        if (auth.currentUser) {
            setFlashcards([]);

            if (localStorage.getItem("showOnlyCurrentUser") !== null) {
                
                // local storage can only store strings
                const rawValue = localStorage.getItem("showOnlyCurrentUser");

                if (rawValue === "true") {
                    showOnlyUser.current = true;
                }
                
                if (rawValue === "false") {
                    showOnlyUser.current = false;
                }

                setInitialValues(previousState => {
                    return { ...previousState, showOnlyCurrentUser: showOnlyUser.current }
                });
                
            }

            let storageTags: any = localStorage.getItem("selectedTags");
            if (storageTags !== null) {
                
                // local storage can only store strings
                storageTags = JSON.parse(storageTags);
                selectedTags.current = storageTags;
                console.log(selectedTags.current);
                setInitialValues(previousState => {
                    return { ...previousState, selected: selectedTags.current }
                })
            }

            // Retrieving initial flashcards

            if (selectedTags.current.length > 0 && showOnlyUser.current) {
                console.log("get flashcards by current user with selected tags");
                try {
                    await GetFlashcardsByCurrentUserAndTagsUseCase(auth.currentUser.uid, selectedTags.current).then((response) => {
                        console.log(response);
                        response.forEach((doc: DocumentData) => {
                            // console.log(doc.data());
                            setFlashcards(prevFlashcards => [
                                ...prevFlashcards,
                                { id: doc.id, ...doc.data() }
                            ]);
                        });
                    });
                    
                } catch (error: any) {
                    console.log(error);
                }
            } else if (selectedTags.current.length > 0 && !showOnlyUser.current) {
                console.log("Get flash cards by anyone with the selected tags")
                try {
                    await GetFlashcardsByTagsUseCase(selectedTags.current).then((response) => {
                        console.log(response);
                        response.forEach((doc: DocumentData) => {
                            // console.log(doc.data());
                            setFlashcards(prevFlashcards => [
                                ...prevFlashcards,
                                { id: doc.id, ...doc.data() }
                            ]);
                        });
                    });
                    
                } catch (error: any) {
                    console.log(error);
                }
            } else if (selectedTags.current.length === 0 && showOnlyUser.current) {
                console.log("get all flashcards by the current user");
                try {
                    await GetFlashcardsByCurrentUserUseCase(auth.currentUser.uid).then((response) => {
                        console.log(response);
                        response.forEach((doc: DocumentData) => {
                            // console.log(doc.data());
                            setFlashcards(prevFlashcards => [
                                ...prevFlashcards,
                                { id: doc.id, ...doc.data() }
                            ]);
                        });
                    });
                    
                } catch (error: any) {
                    console.log(error);
                }
            }
            

            // Retrieving initial tags
            if (showOnlyUser.current) {
                try {
                    await GetTagsByCurrentUserUseCase(auth.currentUser.uid).then((response) => {
                        console.log(response);
                        response.forEach((doc: DocumentData) => {
                            // console.log(doc.data());
                            setTags(prevTags => [
                                ...prevTags,
                                { id: doc.id, ...doc.data() }
                            ]);
                        });
                    });
                    
                } catch (error: any) {
                    console.log(error);
                }
            } else {
                try {
                    await GetAllTagsUseCase().then((response) => {
                        console.log(response);
                        response.forEach((doc: DocumentData) => {
                            // console.log(doc.data());
                            setTags(prevTags => [
                                ...prevTags,
                                { id: doc.id, ...doc.data() }
                            ]);
                        });
                    });
                    
                } catch (error: any) {
                    console.log(error);
                }
            }
            
        }
    }

    const validationSchema = Yup.object().shape({
        showOnlyCurrentUser: Yup.boolean(),
        selected: Yup.array().of(
            Yup.boolean()
        ).ensure().when('showOnlyCurrentUser', {
            is: false,
            then: Yup.array().min(1, "Please ")
        }).compact().max(10, "You can only select up to 10 tags")
    });


    // async function displayTags() {
    //     try {
    //         if (auth.currentUser) {
    //             const result = await GetTagsByCurrentUserUseCase(auth.currentUser.uid);
    //             console.log(result.docs);
    //         }
    //     } catch (error: any) {
    //         console.log(error);
    //     }
    // }

    // function getFlashcards() {

    //     try {

    //     } catch (error: any) {

    //     }
    // }

    async function onClickHandleFilters(data: TagsFormData) {
        localStorage.setItem("showOnlyCurrentUser", JSON.stringify(data.showOnlyCurrentUser));
        localStorage.setItem("selectedTags", JSON.stringify(data.selected));
        
        console.log(data);
        showOnlyUser.current = data.showOnlyCurrentUser;
        selectedTags.current = data.selected;
        
        if (auth.currentUser) {
            setFlashcards([]);
            if (showOnlyUser.current && selectedTags.current.length > 0) {
                try {
                    await GetFlashcardsByCurrentUserAndTagsUseCase(auth.currentUser.uid, selectedTags.current).then((response) => {
                        response.forEach((doc: DocumentData) => {
                        // console.log(doc.data());
                        setFlashcards(prevFlashcards => [
                            ...prevFlashcards,
                            { id: doc.id, ...doc.data() }
                        ]);
                    });
                    });
                } catch (error: any) {
                    console.log(error);
                }
            } else if (!showOnlyUser.current && selectedTags.current.length > 0) {
                
                try {
                    await GetFlashcardsByTagsUseCase(data.selected).then((response) => {
                        response.forEach((doc: DocumentData) => {
                            // console.log(doc.data());
                            setFlashcards(prevFlashcards => [
                                ...prevFlashcards,
                                { id: doc.id, ...doc.data() }
                            ]);
                        });
                    });
                } catch (error: any) {
                    console.log(error);
                }
            } else if (showOnlyUser.current && selectedTags.current.length === 0) {
                console.log("get all flashcards by the current user");
                try {
                    await GetFlashcardsByCurrentUserUseCase(auth.currentUser.uid).then((response) => {
                        console.log(response);
                        response.forEach((doc: DocumentData) => {
                            // console.log(doc.data());
                            setFlashcards(prevFlashcards => [
                                ...prevFlashcards,
                                { id: doc.id, ...doc.data() }
                            ]);
                        });
                    });
                    
                } catch (error: any) {
                    console.log(error);
                }
            }
        }
        
    }

    return {
        flashcards,
        tags,
        initialValues,
        selectedTags,
        showOnlyCurrentUser: showOnlyUser,
        onClickHandleFilters,
        onLoadInitializeFlashcardsAndTags
    }
}