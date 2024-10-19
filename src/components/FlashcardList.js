import React, { useEffect, useState } from 'react';
import { getFlashcards, getFlashcardById, deleteFlashcard } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import Flashcard from './Flashcard';
import FlashcardForm from './FlashcardForm';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const FlashcardList = () => {
    const { token } = useAuth();
    const [flashcards, setFlashcards] = useState([]);
    const [editCard, setEditCard] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const fetchFlashcards = async () => {
        try {
            const data = await getFlashcards(token);
            setFlashcards(data || []);
        } catch (error) {
            toast.error('Error fetching flashcards: ' + error.message);
        } 
    };

    useEffect(() => {
        fetchFlashcards();
    }, [token]);

    const handleDelete = async (id) => {
        try {
            await deleteFlashcard(id, token);
            setFlashcards(flashcards.filter((card) => card._id !== id));
            toast.success('Flashcard deleted successfully!');
        } catch (error) {
            toast.error('Error deleting flashcard: ' + error.message);
        }
    };

    const handleEdit = async (id) => {
        try {
            const data = await getFlashcardById(id, token);
            setEditCard(data);
            setShowModal(true);
        } catch (error) {
            toast.error('Error fetching flashcard: ' + error.message);
        }
    };
  
    const handleUpdate = async (updatedFlashcard) => {
        await fetchFlashcards();
        setEditCard(null);
        setShowModal(false);
        toast.success('Flashcard updated successfully!');
    };

    const handleAddNew = () => {
        setEditCard(null);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditCard(null);
    };



    return (
        <div className="mt-4">
            <Button variant="primary" onClick={handleAddNew}>
                Add Flashcard
            </Button>
            <div className="row mt-3">
                {flashcards.length > 0 ? (
                    flashcards.map((card) => (
                        <div className="col-md-4" key={card._id}>
                            <Flashcard 
                                flashcard={card} 
                                onEdit={() => handleEdit(card._id)} 
                                onDelete={handleDelete} 
                             />
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center">No flashcards available.</div>
                )}
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{editCard ? 'Edit Flashcard' : 'Add Flashcard'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FlashcardForm 
                        editCard={editCard} 
                        onUpdate={handleUpdate} 
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default FlashcardList;
