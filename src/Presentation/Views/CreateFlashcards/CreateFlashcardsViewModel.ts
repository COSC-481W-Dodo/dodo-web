import { KeyboardEvent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { FullCardSet } from '../../../Common/interfaces';
import { CreateFlashcardUseCase } from '../../../Domain/UseCase/Flashcard/CreateFlashcard';
import { CreateTagUseCase } from '../../../Domain/UseCase/Tag/CreateTag';
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from '../../../Common/AuthContext';

export default function CreateFlashcardsViewModel() {

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

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
        console.log(data);

        const tags = data.tags;
        let tagNames = Array<string>();
        tags.forEach(tag => {
            // Ensures no duplicate tags get added to the database
            if (tagNames.indexOf(tag.tagName) === -1) {
                tagNames.push(tag.tagName);
            }
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
                await CreateFlashcardUseCase(flashcard, tagNames, user.uid);
            } catch(error: any) {
                console.log(error);
            }   
        });

        alert("Card set has been saved");
        window.location.reload();
        
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