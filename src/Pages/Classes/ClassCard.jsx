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
        <div>
            <div>
                <div className="card w-[580px]  ring-1 ring-slate-400  lg:mx-20 mt-10 rounded-lg ">
                    <figure className="px-10 pt-10">
                        <img src={image} alt="Shoes" className="" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">{title}</h2>
                        <p>{price}</p>
                        <p>{shortDescription}</p>
                        <p>{postedBy}</p>
                        <p>{totalEnrollment}</p>
                        <Link to={`/class/${_id}`}>
                            <div className="card-actions">
                                <button className="btn  bg-amber-400 rounded-lg mt-8">Enroll Now</button>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassCard;
