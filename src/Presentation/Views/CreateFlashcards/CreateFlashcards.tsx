import React from 'react';
import { Formik, Form, FieldArray, Field, ErrorMessage } from 'formik';
import useViewModel from './CreateFlashcardsViewModel';
import { Card, Tag } from './Interfaces';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';


import './create-flashcards.css';

function CreateFlashcards() {

    const { 
        onClickCreateCards, 
        initialValues, 
        validationSchema
    } = useViewModel();

    return (
        <div>
            <Formik
                onSubmit={onClickCreateCards}
                initialValues={initialValues}
                validationSchema={validationSchema}
            >
                {({ values, setFieldValue }) => (
                    <Form className='m-auto flashcards-form'>

                        {/* TAGS */}
                        <h1>Create A New Study Set ON THIS TOTALLY NOT REAL WEBSITE</h1>
                        <FieldArray
                            name='tags'
                            render={ arrayHelpers => {
                                const tags = values.tags
                                return (
                                    <div>
                                        {(tags && tags.length > 0) && 
                                            <div> 
                                                {  tags.map((tag: Tag, index: number) => (
                                                    <div key={index}>
                                                        {/* <Field
                                                            name={`tags.[${index}].tagName`}
                                                            className='form-control'
                                                        /> */}

                                                        <p><strong>Tags:</strong></p>
                                                        <span className="m-3 tag-input" role="textbox" contentEditable aria-multiline="false"></span>

                                                         
                                                        <button className='remove-tag' disabled={ tags.length > 1 ? false : true } onClick={() => arrayHelpers.remove(index)}>
                                                            <RemoveCircleIcon />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        }

                                    </div>
                                )
                            }}

                        />

                        <br />
                        {/* FLASHCARDS */}
                        <FieldArray 
                            name='flashcards'
                            render={ arrayHelpers => {
                                const flashcards = values.flashcards;
                                return (
                                    <div >
                                        {(flashcards && flashcards.length > 0) && (
                                            flashcards.map((flashcard: Card, index: number) => (
                                                <div className='flashcard m-2' key={index}>
                                                    <div className='row'>
                                                        <div className='col'>
                                                            <span className='m-3 flashcard-input flashcard-question' role="textbox" contentEditable onInput={(e) => setFieldValue(`flashcards[${index}].question`, e.currentTarget.innerText)}></span>
                                                            <p className='ms-3'>QUESTION</p>
                                                        </div>
                                                        
                                                        <div className='col'>
                                                            <span className='m-3 flashcard-input flashcard-answer' role="textbox" contentEditable onInput={(e) => setFieldValue(`flashcards[${index}].answer`, e.currentTarget.innerText)}></span>
                                                            <p className='ms-3'>ANSWER</p>
                                                        </div>
                                                    </div>

                                                    <div className='container text-center'>
                                                    <button disabled={ flashcards.length > 1 ? false : true } type="button" className='btn btn-danger' onClick={() => arrayHelpers.remove(index)}>
                                                        <DeleteIcon className='trashcan'/> remove card 
                                                    </button>
                                                    
                                                    </div>
                                                      
                                                </div>
                                            )))
                                        }
                                        <br />
                                        <div className='container text-center'>
                                            <button type='button' className='btn btn-success'  onClick={() => arrayHelpers.push({ question: "", answer: "" })} ><AddIcon className='plus-sign' /> Add Card </button>
                                        </div>
                                    </div>
                                )
                            }}
                        /> 
                        
                        <br />
                        <div className='container text-center'>
                            <button type='submit' className='btn btn-success'>Create</button>
                        </div>
                    </Form>
                )}
                
            </Formik>
        </div>
    );
}

export default CreateFlashcards;