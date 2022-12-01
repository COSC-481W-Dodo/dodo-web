import useViewModel from './ViewFlashcardsViewModel';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "../../../Data/DataSource/firebase";
import Carousel from 'react-bootstrap/Carousel';
import Card from '@mui/material/Card';

import './view-flashcards.css';

function ViewFlashcards() {

    const { 
        flashcards,
        tags,
        initialValues,
        validationSchema,
        currentTagNames,
        checkboxInputs,
        carouselIndex,
        onSelectNextCard,
        onClickToggleSelectTag,
        onClickFilterTags,
        onClickHandleFilters,
        onLoadInitializeFlashcardsAndTags
    } = useViewModel();

    // Carousel Function
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
        <div className='container'>
            <div className='row border'>
                <div className='col border'>
                    {/* Tag Filters */}
                    {/* TODO make into it's own component */}
                    <h1>Filters</h1>
                    <Formik
                        enableReinitialize={true}
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onClickHandleFilters}
                    >
                        {({ values }) => (
                            <Form>
                                <label>
                                    <Field type='checkbox' name='showOnlyCurrentUser' onClick={(e: any) => onClickFilterTags(e, values)} />
                                    <span> Only my cards</span>
                                </label>
                                <hr />

                                <div id='select-tags-group'>Tags</div>
                                <div ref={checkboxInputs} role='group' aria-labelledby='select-tags-group'>
                                    {
                                        tags.map((tag, index) => {
                                            return (
                                                <div key={tag.id}>
                                                    <label>
                                                        <Field id={tag.id} type='checkbox' name='selected' value={tag.id} onClick={(e: any) => onClickToggleSelectTag(e, tag)} />
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
                                    <ErrorMessage name='selected' render={message => <div className='text-danger'>{message}</div>} />
                                </div>
                            </Form>
                        )}
                        
                    </Formik>

                </div>
                <div className='col border'>

                    <div className='row border'>
                        <div className='col border'>
                            {/* TODO make into its own component */}
                            <h1>Categories</h1>
                            {
                                currentTagNames.current.map((currentTagName, index) => {
                                    return (
                                        <span key={index} className='current-tag'> { currentTagName } </span>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className='row border'>
                        <div className='col border'>
                            {/* TODO make into its own componenet */}
                            {/* Flashcard carousel */}
                            <Carousel indicators={false} interval={null} activeIndex={carouselIndex} onSelect={onSelectNextCard}>
                                {
                                    // display each flashcard
                                    flashcards.map((flashcard, index) => {
                                        return (
                                            <Carousel.Item>
                                                <Card className='view-cards flashcard-carousel'>
                                                    <div className='flashcard-carousel-text'> 
                                                        <p>{ flashcard.question }</p>
                                                        {/* <h3>{ flashcard.answer }</h3> */}
                                                    </div>
                                                </Card>
                                            </Carousel.Item>
                                            
                                        );
                                    })
                                }
                            </Carousel>
                        </div>
                    </div>

                    {/* Array mapping of all the flashcards */}
                    <div className='row border'>
                        <div className='col border'>
                            {/* Flashcard */}
                            {/* TODO make into its own component */}
                            <h1>Start of flashcards</h1>
                            {
                                flashcards.map((flashcard, index) => {
                                    return (
                                        <Card className='m-2 row view-cards' key={flashcard.id}>
                                            <p className='p-3 col-5 question-section'>{ flashcard.question }</p>
                                            <p className='p-3 col-7 answer-section'>{ flashcard.answer }</p>
                                        </Card>
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