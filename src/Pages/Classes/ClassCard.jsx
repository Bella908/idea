import { Container } from 'postcss';
import React from 'react';
import { Link } from 'react-router-dom';

const ClassCard = ({ classData }) => {

    const { 
        _id,
        title, 
        postedBy, 
        image, 
        price, 
        shortDescription, 
        totalEnrollment
    } = classData;

    return (
        <div className="flex justify-center mt-10">
        <div className="card w-[580px] bg-white shadow-lg ring-1 ring-slate-400 rounded-lg overflow-hidden transform transition duration-300 hover:scale-105">
          <figure className="px-10 pt-10">
            <img src={image} alt={title} className="rounded-lg object-cover h-48 w-full" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title text-2xl font-semibold text-gray-800">{title}</h2>
            <p className="text-lg text-gray-600 mt-2">Price: ${price}</p>
            <p className="text-gray-600 mt-2">{shortDescription}</p>
            <p className="text-gray-500 mt-4">Posted by: {postedBy}</p>
            <p className="text-gray-500 mt-2">Total Enrollment: {totalEnrollment}</p>
            <Link to={`/class/${_id}`} className="mt-6">
              <div className="card-actions">
                <button className="btn bg-amber-400 text-white font-semibold py-2 px-4 rounded-lg hover:bg-amber-500 transition duration-300">
                  Enroll Now
                </button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
};

export default ClassCard;
