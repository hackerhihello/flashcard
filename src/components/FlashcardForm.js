import React, { useEffect, useState } from 'react';
import { createFlashcard, updateFlashcard } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FlashcardForm = ({ editCard, onUpdate }) => {
    const { token } = useAuth();
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [date, setDate] = useState(new Date());
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (editCard) {
            setQuestion(editCard.question);
            setAnswer(editCard.answer);
            setDate(new Date(editCard.createdAt));
        } else {
            setQuestion('');
            setAnswer('');
            setDate(new Date());
        }
    }, [editCard]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let response;

            const formattedCreatedAt = date.toISOString();
            const formattedUpdatedAt = new Date().toISOString();
            
            if (editCard) {
                const updatedCard = { 
                    ...editCard, 
                    question, 
                    answer, 
                    createdAt: formattedCreatedAt,
                    updatedAt: formattedUpdatedAt
                };
                response = await updateFlashcard(updatedCard, token);
            } else {
                const newFlashcard = { 
                    question, 
                    answer, 
                    createdAt: formattedCreatedAt,
                    updatedAt: formattedUpdatedAt
                };
                response = await createFlashcard(newFlashcard, token);
            }

            if (response) {
                toast.success(`${editCard ? 'Flashcard updated' : 'Flashcard created'} successfully!`);
                onUpdate(response);
                setQuestion('');
                setAnswer('');
                setDate(new Date());
            } else {
                throw new Error('Unexpected response format');
            }
        } catch (error) {
            toast.error(error.message || 'An error occurred while saving the flashcard');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mb-4">
            <h2>{editCard ? 'Edit Flashcard' : 'Add Flashcard'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Question</label>
                    <textarea 
                        className="form-control" 
                        value={question} 
                        onChange={(e) => setQuestion(e.target.value)} 
                        required 
                        rows="4" // Set the number of rows for the textarea
                    />
                </div>
                <div className="form-group">
                    <label>Answer</label>
                    <textarea 
                        className="form-control" 
                        value={answer} 
                        onChange={(e) => setAnswer(e.target.value)} 
                        required 
                        rows="4" // Set the number of rows for the textarea
                    />
                </div>
                <div className="form-group">
                    <label>Date</label>
                    <DatePicker
                        selected={date}
                        onChange={(date) => setDate(date)}
                        minDate={new Date()}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="Pp"
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {editCard ? 'Update Flashcard' : 'Add Flashcard'}
                </button>
            </form>
        </div>
    );
};

export default FlashcardForm;
