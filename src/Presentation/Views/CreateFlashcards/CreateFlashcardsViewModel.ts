import { KeyboardEvent, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { FullCardSet, Tag } from '../../../Common/interfaces';
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
        let uniqueTagNames = Array<string>(); // keeps track of unique strings
        let uniqueTagIds = Array<string>();
        let newTags = Array<Tag>();

        // Filtering out tags to remove duplicates in the form
        tags.forEach(tag => {
            let name = tag.tagName.trim().replace(/[\s\.\[\]\*`]+/g, " ").trim();
            console.log(name);
            console.log(name.length);
            
            // Verify that name isn't a duplicate AND verify that name isn't only spaces or blank after regex and trimming
            if (uniqueTagNames.indexOf(name) === -1 && (name.search(/^\s+/g) !== 0 && name.length !== 0)) {
                
                // Call function to convert the given tag name to a readable id
                let newId = generateReadableId(name);

                console.log(newId);
                
                // If generated ID is empty
                if (newId.length > 0 && uniqueTagIds.indexOf(newId) == -1) {
                    uniqueTagNames.push(name);
                    uniqueTagIds.push(newId);
                    newTags.push({ id: newId, tagName: name });
                }
            } else {
                console.log("skipped tags")
            }
        });
        
        console.log("Tag Names:");
        console.log(uniqueTagNames);
        console.log("Tag IDs:");
        console.log(uniqueTagIds);
        console.log("New Tags:");
        console.log(newTags);
        

        // Initializing remaining tags and flashcards
        setRemainingTags(newTags.length);
        setRemainingFlashcards(flashcards.length);
        // setIsLoading(true);

        // if (user !== null && user !== undefined) {
        //     newTags.forEach(async (newTag) => {
        //         try {
        //             await CreateTagUseCase(newTag, user.uid).then(() => {
        //                 setRemainingTags((remainingTags) => remainingTags - 1);
        //             });
        //         } catch(error: any) {
        //             console.log(error);
        //         }
        //     });
    
        //     flashcards.forEach(async (flashcard) => {
        //         try {
        //             await CreateFlashcardUseCase(flashcard, tagNames, user.uid).then(() => {
        //                 setRemainingFlashcards((remainingFlashcards) => remainingFlashcards -1);
        //             });
        //         } catch(error: any) {
        //             console.log(error);
        //         }   
        //     });
        // }
    }

    function generateReadableId(name: string) {

        // Regex to remove the Firebase restricted characters from the new document ID
        let id = name.replace(/[\s\.\[\]\*`\/\\]+/g, "-").toLowerCase();

        // Verifies that the end of string to make sure there are no trailing dashes
        if (id.charAt(id.length - 1) === '-') {
            id = id.substring(0, id.length - 1);
        }

        return id;
    }

    function onKeyDownPreventEnter(event: KeyboardEvent<Element>) {
        
        // Prevents the enter key from creating a new line in the tag field
        if (event.key === "Enter") {
            event.preventDefault();
            return true;
        }

        // Quick fix to prevent invalid characters from being uploaded to tag ids
        // if (event.key === "/" || 
        //     event.key === "." || 
        //     event.key === "[" || 
        //     event.key === "]" ||
        //     event.key === "*" ||
        //     event.key === "`") {
        //     event.preventDefault();
        // }

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