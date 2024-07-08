import React from 'react'
import ReactDOM from 'react-dom/client'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import ARComponent from './AR/ARComponent';
import AdminComponent from './Admin/AdminComponent';
import HomeComponent from './Home/HomeComponent';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
        <React.StrictMode>
            <Routes>
                <Route path="/" element={<HomeComponent />} />
                <Route path="/ar" element={<ARComponent />} />
                <Route path="/admin" element={<AdminComponent />} />
                <Route path="*" element={<p>There is nothing here: 404!</p>} />
            </Routes>
        </React.StrictMode>
    </Router>
);