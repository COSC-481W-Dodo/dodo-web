import { useEffect, useState, useRef, MouseEvent } from 'react';
import { Card, Tag, FilterForm } from '../../../Common/interfaces';
import { auth } from '../../../Data/DataSource/firebase';
import { DocumentData } from 'firebase/firestore';

import { GetTagsByCurrentUserUseCase } from '../../../Domain/UseCase/Tag/GetTagsByCurrentUser';
import { GetAllTagsUseCase } from '../../../Domain/UseCase/Tag/GetAllTags';
import { GetFlashcardsByCurrentUserUseCase } from '../../../Domain/UseCase/Flashcard/GetFlashcardsByCurrentUser';
import { GetFlashcardsByCurrentUserAndTagsUseCase } from '../../../Domain/UseCase/Flashcard/GetFlashcardsByCurrentUserAndTags';
import { GetFlashcardsByTagsUseCase } from '../../../Domain/UseCase/Flashcard/GetFlashcardsByTags';

import * as Yup from 'yup';

export default function ViewFlashcardsViewModel() {
    const [flashcards, setFlashcards] = useState<Array<Card>>([]);
    const [tags, setTags] = useState<Array<Tag>>([]);
    const [allTags, setAllTags] = useState<Array<Tag>>([]);
    const [userTags, setUserTags] = useState<Array<Tag>>([]);
    const showOnlyUser = useRef(true);
    const selectedTagIds = useRef<Array<string>>([]);   // Keeps track of the tag ids selected in the filter section
    const selectedTagNames = useRef<Array<string>>([]); // Keeps track of tag names selected in the filter section
    const currentTagNames = useRef<Array<string>>([]);  // Keeps track of tag names before new selections
    const [initialValues, setInitialValues] = useState<FilterForm>({
        showOnlyCurrentUser: true,
        selected: []
    });
    const checkboxInputs = useRef<Array<HTMLInputElement>>([]);

    const validationSchema = Yup.object().shape({
        showOnlyCurrentUser: Yup.boolean(),
        selected: Yup.array().of(
            Yup.string()
        ).ensure().when('showOnlyCurrentUser', {
            is: false,
            then: Yup.array().min(1, "Please select at least one tag")
        }).compact().max(10, "You can only select up to 10 tags")
    });

    async function onLoadInitializeFlashcardsAndTags() {

        if (auth.currentUser) {
            setFlashcards([]);

            if (sessionStorage.getItem("showOnlyCurrentUser") !== null) {
                
                // session storage can only store strings
                const rawValue = sessionStorage.getItem("showOnlyCurrentUser");

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

            if (sessionStorage.getItem("currentTagNames") !== null) {
                let storageTagNames: any = sessionStorage.getItem("currentTagNames");
                if (storageTagNames !== null) {
                    
                    // local storage can only store strings
                    let storageSelectedTags = JSON.parse(storageTagNames);
                    let storageCurrentTags = JSON.parse(storageTagNames)
                    selectedTagNames.current = storageSelectedTags;
                    console.log("On load set current tag names")
                    currentTagNames.current = storageCurrentTags;
                }
            }

            let storageTags: any = sessionStorage.getItem("selectedTags");
            if (storageTags !== null) {
                
                // local storage can only store strings
                storageTags = JSON.parse(storageTags);
                selectedTagIds.current = storageTags;
                console.log(selectedTagIds.current);
                setInitialValues(previousState => {
                    return { ...previousState, selected: selectedTagIds.current }
                })
            }

            // Retrieving initial flashcards
            if (selectedTagIds.current.length > 0 && showOnlyUser.current) {
                console.log("get flashcards by current user with selected tags");
                getFlashcardsByCurrentUserAndTags();
            } else if (selectedTagIds.current.length > 0 && !showOnlyUser.current) {
                console.log("Get flash cards by anyone with the selected tags")
                getFlashcardsByTags();
            } else if (selectedTagIds.current.length === 0 && showOnlyUser.current) {
                console.log("get all flashcards by the current user");
                getFlashcardsByCurrentUser();
            }
            

            // Retrieving initial tags
            initializeUserTags();
            initializeAllTags();
        }
    }

    async function initializeUserTags() {
        if (auth.currentUser) {
            try {
                await GetTagsByCurrentUserUseCase(auth.currentUser.uid).then((response) => {
                    console.log(response);
                    response.forEach((doc: DocumentData) => {
                        // console.log(doc.data());
                        setUserTags(prevTags => [
                            ...prevTags,
                            { id: doc.id, ...doc.data() }
                        ]);
    
                        if (showOnlyUser.current) {
                            setTags(prevTags => [
                                ...prevTags,
                                { id: doc.id, ...doc.data() }
                            ]);
                        }
                    });
                }); 
            } catch (error: any) {
                console.log(error);
            }
        }
    }

    async function initializeAllTags() {
        try {
            await GetAllTagsUseCase().then((response) => {
                console.log(response);
                response.forEach((doc: DocumentData) => {
                    setAllTags(prevTags => [
                        ...prevTags,
                        { id: doc.id, ...doc.data() }
                    ]);

                    if (!showOnlyUser.current) {
                        setTags(prevTags => [
                            ...prevTags,
                            { id: doc.id, ...doc.data() }
                        ]);
                    }
                });
            });
            
        } catch (error: any) {
            console.log(error);
        }
    }

    function containsTag(tag: Tag) {
        for (var i = 0; i < userTags.length; i++) {
            if (JSON.stringify(userTags[i]) === JSON.stringify(tag)) {
                return true;
            }
        }

        return false;
    }

    function onClickFilterTags(event: MouseEvent<HTMLInputElement>) {
        console.log(currentTagNames.current);
        if (event.currentTarget.checked) {
            console.log(selectedTagIds.current);
            tags.map((tag, index) => {
                if (!containsTag(tag)) {
                    selectedTagNames.current = selectedTagNames.current.filter((selectedTag) => selectedTag !== tag.name)
                    selectedTagIds.current = selectedTagIds.current.filter((selectedTag) => selectedTag !== tag.id)
                }
            });
            console.log(selectedTagIds.current);
            showOnlyUser.current = true;
            setTags(userTags);
            // TODO: unselect tags not used by the current user
        } else {
            showOnlyUser.current = false;
            
            setTags(allTags);
        }
        setInitialValues({showOnlyCurrentUser: showOnlyUser.current, selected: selectedTagIds.current});
        console.log(currentTagNames.current);
    }

    function onClickToggleSelectTag(event: MouseEvent<HTMLInputElement>, tag: Tag) {
        console.log(currentTagNames.current);
        console.log(selectedTagNames.current);
        if (event.currentTarget.checked) {
            console.log("I am checked");
            if (!selectedTagNames.current.includes(tag.name)) {
                selectedTagNames.current.push(tag.name);
            }

            if (!selectedTagIds.current.includes(tag.id)) {
                selectedTagIds.current.push(tag.id);
            }
            
        } else {
            console.log("I am UNchecked");
            selectedTagNames.current = selectedTagNames.current.filter((selectedTag) => selectedTag !== tag.name);
            selectedTagIds.current = selectedTagIds.current.filter((selectedTag) => selectedTag !== tag.id);
            
        }

        setInitialValues(previousState => {
            return { ...previousState, selected: selectedTagIds.current }
        })
        console.log(selectedTagNames.current);
        console.log(currentTagNames.current);
    }

    function onClickHandleFilters(data: FilterForm) {
        console.log("I am in the on click handle filters");
        showOnlyUser.current = data.showOnlyCurrentUser;
        selectedTagIds.current = data.selected;
        sessionStorage.setItem("showOnlyCurrentUser", JSON.stringify(showOnlyUser.current));
        sessionStorage.setItem("selectedTags", JSON.stringify(selectedTagIds.current));
        sessionStorage.setItem("currentTagNames", JSON.stringify(selectedTagNames.current));

        console.log("handle filters set current tag names")
        currentTagNames.current = [...selectedTagNames.current];
        
        if (auth.currentUser) {
            setFlashcards([]);
            if (showOnlyUser.current && selectedTagIds.current.length > 0) {
                getFlashcardsByCurrentUserAndTags();
            } else if (!showOnlyUser.current && selectedTagIds.current.length > 0) {
                getFlashcardsByTags();
            } else if (showOnlyUser.current && selectedTagIds.current.length === 0) {
                getFlashcardsByCurrentUser();
            }
        }
    }

    async function getFlashcardsByCurrentUserAndTags() {
        if (auth.currentUser) {
            try {
                await GetFlashcardsByCurrentUserAndTagsUseCase(auth.currentUser.uid, selectedTagIds.current).then((response) => {
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

    async function getFlashcardsByTags() {
        try {
            await GetFlashcardsByTagsUseCase(selectedTagIds.current).then((response) => {
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

    async function getFlashcardsByCurrentUser() {
        if (auth.currentUser) {
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

    return {
        flashcards,
        tags,
        initialValues,
        validationSchema,
        currentTagNames,
        checkboxInputs,
        onClickToggleSelectTag,
        onClickFilterTags,
        onClickHandleFilters,
        onLoadInitializeFlashcardsAndTags
    }
}