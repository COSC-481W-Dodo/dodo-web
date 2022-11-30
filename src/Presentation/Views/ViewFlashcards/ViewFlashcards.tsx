import useViewModel from './ViewFlashcardsViewModel';
import { useEffect, useRef } from 'react';
import { Formik, Form, Field } from 'formik';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "../../../Data/DataSource/firebase";

function ViewFlashcards() {

    const { 
        flashcards,
        tags,
        initialValues,
        selectedTags,
        showOnlyCurrentUser,
        onClickHandleFilters,
        onLoadInitializeFlashcardsAndTags
    } = useViewModel();

    const authFlag = useRef(true); 

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) =>  {
            if (currentUser !== null && authFlag.current) {
                onLoadInitializeFlashcardsAndTags();
                authFlag.current = false;
            }
        });
    }, []); 

    return (
        <div>
            <div className='row border'>
                <div className='col border'>
                    {/* Tag Filters */}
                    <h1>Filters</h1>
                    <Formik
                        enableReinitialize={true}
                        initialValues={initialValues}
                        onSubmit={onClickHandleFilters}
                    >
                        {({ values }) => (
                            <Form>
                                <label>
                                    <Field type='checkbox' name='showOnlyCurrentUser'/>
                                    <span>Only my cards</span>
                                </label>
                                <hr />

                                <div id='select-tags-group'>Tags</div>
                                <div role='group' aria-labelledby='select-tags-group'>
                                    {
                                        tags.map((tag, index) => {
                                            return (
                                                <div key={tag.id}>
                                                    <label >
                                                        <Field type='checkbox' name='selected' value={tag.id} />
                                                        <span> { tag.name } </span>
                                                    </label>
                                                </div>
                                                
                                            );
                                        })
                                    }
                                </div>
                                
                                <label>

                                </label>

                                <div className='container text-center mb-3'>
                                <button type='submit' className='btn btn-success'>Apply Filters</button>
                            </div>
                            </Form>
                        )}
                        
                    </Formik>

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
                            {
                                flashcards.map((flashcard, index) => {
                                    return (
                                        <div className='border' key={flashcard.id}>
                                            <p>{ flashcard.question }</p>
                                            <p>{ flashcard.answer }</p>
                                            <p>{ flashcard.tags }</p>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ViewFlashcards;