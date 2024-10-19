import React from 'react';
import { Button } from 'react-bootstrap';
import './Flashcard.css'; // Import the CSS file for custom styles

const Flashcard = ({ flashcard, onEdit, onDelete }) => {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="flashcard mb-3">
            <div className="card-body">
                <h5 className="card-title">{flashcard.question}</h5>
                <p className="card-text">{flashcard.answer}</p>
                <p className="card-text">
                    <small className="text-muted">Created at: {formatDate(flashcard.createdAt)}</small>
                </p>
                <p className="card-text">
                    <small className="text-muted">Updated at: {formatDate(flashcard.updatedAt)}</small>
                </p>
                <div className="button-group">
                    <Button variant="warning" onClick={onEdit}>Edit</Button>
                    <Button variant="danger" onClick={() => onDelete(flashcard._id)}>Delete</Button>
                </div>
            </div>
        </div>
    );
}; 

export default Flashcard;
