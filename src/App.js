// frontend/src/App.js
import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthForm from './components/AuthForm';
import FlashcardList from './components/FlashcardList';
import FlashcardForm from './components/FlashcardForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppContent = () => {
    const { user } = useAuth(); // Get user state from AuthContext
    const [isRegistering, setIsRegistering] = useState(false); // Toggle between login and register

    return (
        <div className="container mt-4">
            <h1 className="text-center">Flashcards</h1>
            {!user ? (
                <div>
                    <h2>{isRegistering ? 'Register' : 'Login'}</h2>
                    <AuthForm isLogin={!isRegistering} />
                    <button 
                        className="btn btn-link" 
                        onClick={() => setIsRegistering(!isRegistering)}
                    >
                        {isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
                    </button>
                </div>
            ) : (
                <div>
                    {/* <FlashcardForm onAdd={() => {}} />  Pass a function if needed to refresh */}
                    <FlashcardList />
                </div>
            )}
            {/* Toast Notifications */}
            <ToastContainer 
                position="top-right" 
                autoClose={3000} 
                hideProgressBar={false} 
                closeOnClick 
                pauseOnHover 
                draggable 
                pauseOnFocusLoss 
            />
        </div>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
};

export default App;
