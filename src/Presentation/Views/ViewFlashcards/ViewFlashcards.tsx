import useViewModel from './ViewFlashcardsViewModel';
import { useEffect } from 'react';
import { Formik, Form } from 'formik';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "../../../Data/DataSource/firebase";

function ViewFlashcards() {

    const { 
        flashcards, 
        tags, 
        setFlashcards, 
        setTags,
        onClickHandleFilters,
        initialValues,
        displayFlashcards
    } = useViewModel();

    useEffect(() => {
        onAuthStateChanged(auth, () =>  {
            displayFlashcards();
        });
    }, []); 

    return (
        <div>
            <div className='row border'>
                <div className='col border'>
                    {/* Tag Filters */}
                    <h1>Tag Filters Section</h1>
                    {/* <Formik
                        enableReinitialize={true}
                        initialValues={initialValues}
                        onSubmit={onClickHandleFilters}
                    >
                        <Form>

                        </Form>
                    </Formik> */}

                </div>
                <div className='col border'>

                    <div className='row border'>
                        <div className='col border'>
                            {/* Selected Tags */}
                            <h1>Selected Tags</h1>
                        </div>
                    </div>

                    <div className='row border'>
                        <div className='col border'>
                            {/* Flashcard carousel */}
                            <h1>Flashcard carousel</h1>
                        </div>
                    </div>

                    {/* Array mapping of all the flashcards */}
                    <div className='row border'>
                        <div className='col border'>
                            {/* Flashcard */}
                            <h1>Start of flashcards</h1>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ViewFlashcards;