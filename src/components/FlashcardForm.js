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
            setDate(new Date(editCard.createdAt)); // Set date from editCard
        } else {
            setQuestion('');
            setAnswer('');
            setDate(new Date()); // Default to today
        }
    }, [editCard]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let response;

            // Get the ISO string for the selected date (createdAt)
            const formattedCreatedAt = date.toISOString(); // The date picked by the user
            const formattedUpdatedAt = new Date().toISOString(); // Current time for updatedAt
            
            console.log('Formatted Created At:', formattedCreatedAt); // Debug log

            if (editCard) {
                // Update the existing flashcard
                const updatedCard = { 
                    ...editCard, 
                    question, 
                    answer, 
                    createdAt: formattedCreatedAt, // Use the selected date for createdAt
                    updatedAt: formattedUpdatedAt // Set updatedAt to current time
                };
                response = await updateFlashcard(updatedCard, token);
            } else {
                // Create a new flashcard
                const newFlashcard = { 
                    question, 
                    answer, 
                    createdAt: formattedCreatedAt, // Use the selected date for createdAt
                    updatedAt: formattedUpdatedAt // Set updatedAt to current time
                };
                response = await createFlashcard(newFlashcard, token);
            }

            if (response) {
                toast.success(`${editCard ? 'Flashcard updated' : 'Flashcard created'} successfully!`);
                onUpdate(response);
                setQuestion('');
                setAnswer('');
                setDate(new Date()); // Reset date to today
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
                    <input 
                        type="text" 
                        className="form-control" 
                        value={question} 
                        onChange={(e) => setQuestion(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Answer</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={answer} 
                        onChange={(e) => setAnswer(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Date</label>
                    <DatePicker
                        selected={date}
                        onChange={(date) => setDate(date)}
                        minDate={new Date()} // Disable past dates
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
