import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, FieldArray, ErrorMessage, getIn } from 'formik';
import useViewModel from './CreateFlashcardsViewModel';
import { Card, Tag } from '../../../Common/interfaces';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { v4 as uuidv4 } from 'uuid';
import { auth } from '../../../Data/DataSource/firebase';

import './create-flashcards.css';
import { AuthContext } from '../../../Common/AuthContext';

function CreateFlashcards() {

    const { user } = useContext(AuthContext);
    // const navigate = useNavigate();

    const { 
        initialValues,
        validationSchema,
        onClickCreateCardSet,
        onKeyDownPreventEnter
    } = useViewModel();

    // TODO fix redirecting, 
    useEffect(() => {
        // if (auth.currentUser === null) {
        //     navigate("/");
        // }
    }, [user]);

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onClickCreateCardSet}
            >
                {({ values, setFieldValue, errors }) => (
                    <Form className='m-auto flashcards-form'>

                        {/* TAGS */}
                        <p className='container p-0 mt-4'><strong>Create a new study set</strong></p>
                        <FieldArray
                            name='tags'
                            render={ arrayHelpers => {
                                const tags = values.tags
                                return (
                                    <div className='container p-0 tag-section'>
                                        {(tags && tags.length > 0) && 
                                            <div className='justify-content-start'> 
                                            <p><strong>Tags:</strong></p>
                                                {  tags.map((tag: Tag, index: number) => (
                                                    <div className='tag-input-area' key={tag.id}>
                                                        <span 
                                                            id={`${tag.id}`}
                                                            contentEditable
                                                            className={ getIn(errors, `tags.[${index}]`) ? "m-3 tag-input tag-error" : "m-3 tag-input" }
                                                            role="textbox"
                                                            onKeyDown={onKeyDownPreventEnter}
                                                            onInput={(e) => setFieldValue(`tags.[${index}].tagName`, e.currentTarget.innerText)}
                                                        ></span>

                                                        <button className='remove-tag' disabled={ tags.length > 1 ? false : true } onClick={() => arrayHelpers.remove(index)}>
                                                            <RemoveCircleIcon />
                                                        </button>
                                                        
                                                        
                                                    </div>
                                                ))}
                                                <div className='add-tag-area'>
                                                    <button className='add-tag' onClick={() => arrayHelpers.push({ id: uuidv4(), tagName: "" })}>
                                                        <AddCircleIcon />
                                                    </button>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                )
                            }}

                        />

                        {/* FLASHCARDS */}
                        <FieldArray 
                            name='flashcards'
                            render={ arrayHelpers => {
                                const flashcards = values.flashcards;
                                return (
                                    <div className='flashcard-section'>
                                        {(flashcards && flashcards.length > 0) && (
                                            flashcards.map((flashcard: Card, index: number) => (
                                                <div className='flashcard container mx-auto' key={flashcard.id}>

                                                    {/* Card Options */}
                                                    <div className='row top-card-options ms-2 me-2'>
                                                        <div className='col'>
                                                            <div className='text-end'>
                                                                <button 
                                                                    disabled={ flashcards.length > 1 ? false : true } 
                                                                    type="button" className='btn btn-danger btn-remove-tag'
                                                                    onClick={() => arrayHelpers.remove(index)}
                                                                >
                                                                    <DeleteIcon className='trashcan' />
                                                                </button>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className='row mt-3'>

                                                        {/* Field for the question */}
                                                        <div className='col'>
                                                            <span
                                                                contentEditable
                                                                className='m-3 flashcard-input flashcard-question' 
                                                                role="textbox"  
                                                                onInput={(e) => setFieldValue(`flashcards[${index}].question`, e.currentTarget.innerText)}
                                                            ></span>
                                                            <p className='ms-3'>QUESTION</p>
                                                            <ErrorMessage name={`flashcards[${index}].question`} render={message => <div className='ms-3  text-danger'>{message}</div>} />
                                                        </div>
                                                        
                                                        {/* Field for the answer */}
                                                        <div className='col'>
                                                            <span
                                                                contentEditable
                                                                className='m-3 flashcard-input flashcard-answer' 
                                                                role="textbox"  
                                                                onInput={(e) => setFieldValue(`flashcards[${index}].answer`, e.currentTarget.innerText)}
                                                            ></span>
                                                            <p className='ms-3'>ANSWER</p>
                                                            <ErrorMessage name={`flashcards[${index}].answer`} render={message => <div className='ms-3 text-danger'>{message}</div>} />
                                                        </div>
                                                    </div>    
                                                </div>
                                            )))
                                        }
                                        <br />
                                        <div className='container text-center'>
                                            <button 
                                                type='button' 
                                                className='btn btn-success' 
                                                onClick={() => arrayHelpers.push({ id: uuidv4(), question: "", answer: "" })}
                                            >
                                                <span><AddIcon className='plus-sign' /> Add Card </span>
                                            </button>
                                        </div>
                                    </div>
                                )
                            }}
                        /> 
                        
                        <br />
                        <div className='container text-center mb-3'>
                            <button type='submit' className='btn btn-success'>Create Set</button>
                        </div>
                    </Form>
                )}
                
            </Formik>
        </div>
    );
}

export default CreateFlashcards;