import React from 'react';
import { Link } from 'react-router-dom';

const Instroctor = () => {
    return (
        <div>
            <div className="hero h-[600px] my-12" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1558402989-4778474384c9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'}}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Become an Instructor and Share Your Knowledge</h1>
                        <p className="mb-5">Join our platform as an instructor and start sharing your expertise with millions of eager learners worldwide. Whether you're an expert in technology, arts, science, or any other field, there's an audience waiting to learn from you. Get started today!</p>
                        <Link to='/teach'>
                            <button className="btn btn-primary">Start Teaching Today</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Instroctor;
