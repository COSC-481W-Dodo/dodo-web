import * as Yup from 'yup';
import { FullCardSet } from './Interfaces';

export default function CreateFlashcardsViewModel() {

    function onClickCreateCards(data: FullCardSet) {
        console.log(data);
    }

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
    })
    
    return {
        onClickCreateCards,
        initialValues,
        validationSchema
    }
}   