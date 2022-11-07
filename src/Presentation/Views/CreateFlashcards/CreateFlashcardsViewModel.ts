import { KeyboardEvent } from 'react';
import * as Yup from 'yup';
import { FullCardSet } from '../../../Common/interfaces';
import { CreateFlashcardUseCase } from '../../../Domain/UseCase/Flashcard/CreateFlashcard';
import { CreateTagUseCase } from '../../../Domain/UseCase/Tag/CreateTag';
import { v4 as uuidv4 } from 'uuid';

export default function CreateFlashcardsViewModel() {

    const initialValues = {
        tags: [{ id: uuidv4(), tagName: ""}],
        flashcards: [{ id: uuidv4(), question: "", answer: ""}]
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
        console.log(data);

        const tags = data.tags;
        let tagNames = Array<string>();
        tags.forEach(tag => {
            tagNames.push(tag.tagName);
        });

        const flashcards = data.flashcards;

        tagNames.forEach(async (tagName) => {
            try {
                await CreateTagUseCase(tagName);
            } catch(error: any) {
                console.log(error);
            }
        });

        flashcards.forEach(async (flashcard) => {
            try {
                await CreateFlashcardUseCase(flashcard, tagNames);
            } catch(error: any) {
                console.log(error);
            }   
        });
        
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
        initialValues,
        validationSchema,
        onClickCreateCardSet,
        onKeyDownPreventEnter
    }
}   