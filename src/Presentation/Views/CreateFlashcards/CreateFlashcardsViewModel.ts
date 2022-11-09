import { KeyboardEvent, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { FullCardSet } from '../../../Common/interfaces';
import { CreateFlashcardUseCase } from '../../../Domain/UseCase/Flashcard/CreateFlashcard';
import { CreateTagUseCase } from '../../../Domain/UseCase/Tag/CreateTag';
import { v4 as uuidv4 } from 'uuid';
import { User } from 'firebase/auth';

export default function CreateFlashcardsViewModel() {
    const [user, setUser] = useState<User | null>();
    const [isLoading, setIsLoading] = useState(true);
    const [remainingTags, setRemainingTags] = useState<number>(-1);
    const [remainingFlashcards, setRemainingFlashcards] = useState<number>(-1);

    // Keeping track of how many tags and cards are left to be submitted
    useEffect(() => {
        if (remainingTags === 0 && remainingFlashcards === 0) {
            setIsLoading(false);
            alert("Card set has been saved");
            window.location.reload();
        }
    }, [remainingTags, remainingFlashcards]);

    const initialValues = {
        tags: [{ id: uuidv4(), tagName: ""}],
        flashcards: [{ id: uuidv4(), question: "", answer: "" }]
    }

    const validationSchema = Yup.object().shape({
        tags: Yup.array().of(
            Yup.object().shape({
                tagName: Yup.string().required("Add a tag")
            })
        ).min(1, "Please provide at least one tag"),
        flashcards: Yup.array().of(
            Yup.object().shape({
                question: Yup.string().required("Please provide a question"),
                answer: Yup.string().required("Please provide an answer")
            })
        ).min(1, "Please add at least one card to this set")
    });

    function onClickCreateCardSet(data: FullCardSet) {

        const tags = data.tags;
        const flashcards = data.flashcards;
        let tagNames = Array<string>();

        // Filtering out tags to remove duplicates in the form
        tags.forEach(tag => {
            if (tagNames.indexOf(tag.tagName) === -1) {
                tagNames.push(tag.tagName);
            }
        });

        // Initializing remaining tags and flashcards
        setRemainingTags(tagNames.length);
        setRemainingFlashcards(flashcards.length);
        setIsLoading(true);

        if (user !== null && user !== undefined) {
            tagNames.forEach(async (tagName) => {
                try {
                    await CreateTagUseCase(tagName).then(() => {
                        setRemainingTags((remainingTags) => remainingTags - 1);
                    });
                } catch(error: any) {
                    console.log(error);
                }
            });
    
            flashcards.forEach(async (flashcard) => {
                try {
                    await CreateFlashcardUseCase(flashcard, tagNames, user.uid).then(() => {
                        setRemainingFlashcards((remainingFlashcards) => remainingFlashcards -1);
                    });
                } catch(error: any) {
                    console.log(error);
                }   
            });
        }
    }

    function onKeyDownPreventEnter(event: KeyboardEvent<Element>) {
        
        // Prevents the enter key from creating a new line in the tag field
        if (event.key === "Enter") {
            event.preventDefault();
            return true;
        }

        return false;
    }
    
    return {
        user,
        isLoading,
        initialValues,
        validationSchema,
        onClickCreateCardSet,
        onKeyDownPreventEnter,
        setUser,
        setIsLoading
    }
}   