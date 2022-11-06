import { KeyboardEvent } from 'react';
import * as Yup from 'yup';
import { FullCardSet } from './Interfaces';

export default function CreateFlashcardsViewModel() {

    const initialValues = {
        tags: [{ tagName: ""}],
        flashcards: [{question: "", answer: ""}]
    }

    const validationSchema = Yup.object().shape({
        tags: Yup.array().of(
            Yup.object().shape({
                tagName: Yup.string().required("Please add a tag")
            })
        ).min(1, "Please provide at least one tag"),
        flashcards: Yup.array().of(
            Yup.object().shape({
                question: Yup.string().required("Please add a question"),
                answer: Yup.string().required("Please provide an answer")
            })
        ).min(1, "Please add at least one card to this set")
    });

    function onClickCreateCards(data: FullCardSet) {
        console.log(data);
    }

    function onKeyDownPreventEnter(event: KeyboardEvent) {
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
        onClickCreateCards,
        onKeyDownPreventEnter
    }
}   