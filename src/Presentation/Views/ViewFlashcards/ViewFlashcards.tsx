import useViewModel from './ViewFlashcardsViewModel';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "../../../Data/DataSource/firebase";

import Card from '@mui/material/Card';
import TuneIcon from '@mui/icons-material/Tune';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Carousel from 'react-bootstrap/Carousel';
import OffCanvas from 'react-bootstrap/Offcanvas';
import Modal from 'react-bootstrap/Modal';

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
        showFilterSettings,
        onClickEnterEditCardMode,
        showDeleteModal,
        handleShowDeleteModal,
        handleCloseDeleteModal,
        onClickDeleteFlashcard,
        onClickHandleShowFilterSettings,
        onClickHandleCloseFilterSettings,
        onSelectNextCard,
        onClickToggleSelectTag,
        onClickFilterTags,
        onClickHandleFilters,
        onLoadInitializeFlashcardsAndTags
    } = useViewModel();

    // Carousel Function
    const authFlag = useRef(true); 

    //Flip Function
    const [flip, setFlip] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) =>  {
            if (currentUser !== null && authFlag.current) {
                onLoadInitializeFlashcardsAndTags();
                authFlag.current = false;
            }

            // Redirects to the log in page if not logged in
            if (currentUser === null && currentUser !== undefined) {
                navigate("/login");
            }
            
        });
    }, []); 

    return (
        <>
        <div className='container'>
            <div className='row'>
                {/* Tag Filters */}
                {/* TODO make into it's own component */}
                <OffCanvas show={showFilterSettings} onHide={onClickHandleCloseFilterSettings}>
                    <OffCanvas.Header closeButton>
                        <OffCanvas.Title>
                            <h1>Filters</h1>
                        </OffCanvas.Title>
                    </OffCanvas.Header>
                    <OffCanvas.Body>
                        <Formik
                            enableReinitialize={true}
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={onClickHandleFilters}
                        >
                            {({ values, resetForm }) => (
                                <Form className='container'>
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

                                    <div className='text-center mb-3'>
                                        <button type='submit' className='btn btn-success' onClick={onClickHandleCloseFilterSettings}>Apply Filters</button>
                                        <ErrorMessage name='selected' render={message => <div className='text-danger'>{message}</div>} />
                                    </div>
                                </Form>
                            )}
                            
                        </Formik>
                    </OffCanvas.Body>
                </OffCanvas>
                <div className='col'>
                    <div className='row'>
                        <div className='col'>
                            {/* TODO make into its own component */}
                            <div className='mb-2 mt-4'>
                                <span className='m-2 pt-3 view-cards-title'>Tags</span>
                                <div className='filter-button'>
                                    <button  onClick={onClickHandleShowFilterSettings}><TuneIcon /> Filter</button>
                                </div>
                            </div>
                            <div className='container mb-1'>
                                {
                                    currentTagNames.current.length > 0 ?
                                    currentTagNames.current.map((currentTagName, index) => {
                                        return (
                                            <span key={index} className='current-tag'> { currentTagName } </span>
                                        )
                                    }) :
                                    <span className='current-tag'>All tags</span>
                                }
                                
                            </div>
                            
                        </div>
                    </div>

                    <hr />

                    <div className='row'>
                        <div className='col'>
                            {/* TODO make into its own componenet */}
                            {/* Flashcard carousel */}
                            <Carousel indicators={false} interval={null} activeIndex={carouselIndex} onSelect={onSelectNextCard}>
                                {
                                    flashcards.length === 0 &&
                                    <Carousel.Item>
                                        <div className='flashcard-view view-cards'>
                                            <p>There are no flashcards in this set.</p>
                                        </div>
                                    </Carousel.Item>
                                }

                                {
                                    // display each flashcard
                                    flashcards.map((flashcard, index) => {
                                        return (
                                            <Carousel.Item>
                                                <div className={`flashcard-view view-cards ${flip ? 'flip' : ''}`} onClick={() => setFlip(!flip)}>
                                                    <div className="front">
                                                        <p className='text-center'>{flashcard.question}</p>
                                                    </div>
                                                    <div className="back">
                                                        <p className='text-center'>{flashcard.answer}</p>
                                                    </div>
                                                    {/* <p>{flip ? flashcard.answer : flashcard.question}</p> */}
                                                    {/* <h3>{ flashcard.answer }</h3> */}
                                                </div>
                                                
                                            </Carousel.Item>
                                            
                                        );
                                    })
                                }
                                
                            </Carousel>
                        </div>
                    </div>

                    <hr />

                    {/* Array mapping of all the flashcards */}
                    <div className='row'>
                        <div className='col'>
                            {/* Flashcard */}
                            {/* TODO make into its own component */}
                            {
                                flashcards.length > 0 &&
                                <>
                                    <p className='m-2 view-cards-title'>Cards in this set</p>
                                    {
                                        flashcards.map((flashcard, index) => {
                                            if (flashcard.userId === auth.currentUser?.uid) {
                                                return (
                                                    <div className='m-2 row view-cards' key={flashcard.id}>
                                                        <p className='p-3 col-5 question-section'>{ flashcard.question }</p>
                                                        <p className='p-3 col-5 answer-section'>{ flashcard.answer }</p>
                                                        <p className='p-3 col-1 edit-icon' onClick={onClickEnterEditCardMode}><EditIcon /></p>
                                                        <p className='p-3 col-1 delete-card-icon' onClick={() => handleShowDeleteModal(flashcard.id)}><DeleteIcon /></p>
                                                    </div>
                                                );
                                            } else {
                                                return (
                                                    <div className='m-2 row view-cards' key={flashcard.id}>
                                                        <p className='p-3 col-5 question-section'>{ flashcard.question }</p>
                                                        <p className='p-3 col-7 answer-section'>{ flashcard.answer }</p>
                                                    </div>
                                                );
                                            }
                                        })
                                    }
                                </>
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Modal
            show={showDeleteModal}
            onHide={handleCloseDeleteModal}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Delete this flashcard?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to delete this card?</p>
            </Modal.Body>
            <Modal.Footer>
                <button className='btn btn-secondary' onClick={handleCloseDeleteModal}>Cancel</button>
                <button className='btn btn-danger' onClick={onClickDeleteFlashcard}>Confirm</button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default ViewFlashcards;