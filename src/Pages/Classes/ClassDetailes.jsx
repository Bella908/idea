import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../Shared/LoadingSpnner";
import useAuth from "../../Hooks/useAuth";

const ClassDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [paymentDetails, setPaymentDetails] = useState({ classId: id, email: '' }); // Initialize email state
    const { user } = useAuth();
    const { data: classDetails = {}, isLoading, isError } = useQuery({
        queryKey: ["classDetails", id],
        queryFn: async () => {
            try {
                const response = await fetch(`canvas-server-pi.vercel.app/class/${id}`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            } catch (error) {
                console.error("Error fetching classes:", error);
                throw new Error("Failed to fetch classes");
            }
        },
    });

    const handleModalClose = () => {
        setIsOpen(false);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPaymentDetails({ ...paymentDetails, [name]: value });
    };

    const handleConfirmPayment = async (event) => {
        event.preventDefault();
        const { title, image, postedBy, price } = classDetails;
        const paymentData = {
            title,
            image,
            postedBy,
            price,
            classId: id,
            email: user.email, // Include email in payment data
        };

        try {
            const response = await fetch('canvas-server-pi.vercel.app/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentData),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            console.log('Payment confirmed:', result);
            setIsOpen(false);
            navigate('/dashboard/enrollClass'); // Navigate to the enrollclass route after successful payment
        } catch (error) {
            console.error('Error posting payment details:', error);
        }
    };

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <div>Error fetching classes</div>;
    return (
        <div>
            <div className="bg-[#2D2F31] h-[400px] flex items-center justify-center">
                <div className="flex items-center space-x-20 px-10">
                    <h4 className="font-Briem text-white text-7xl">{classDetails.title}</h4>
                    <img
                        className="h-[300px] w-[400px] object-cover rounded-lg shadow-lg mt-40"
                        src={classDetails.image}
                        alt={classDetails.title}
                    />
                </div>
            </div>
            <div className="px-10 py-20 bg-white">
                <div className="max-w-4xl mx-auto space-y-5">
                    <h4 className="font-Briem text-black text-4xl">{classDetails.title}</h4>
                    <p className="font-Briem text-gray-700 text-2xl">{classDetails.shortDescription}</p>
                    <p className="font-Briem text-gray-600 text-xl">Posted by: {classDetails.postedBy}</p>
                    <p className="font-Briem text-red-600 text-xl">Price: ${classDetails.price}</p>
                    <button className="btn bg-blue-100 text-blue-500" onClick={() => setIsOpen(true)}>
                        <MdOutlinePayment /> Pay
                    </button>
                    {isOpen && (
                        <div className="fixed inset-0 z-10 overflow-y-auto">
                            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                                    &#8203;
                                </span>
                                <div className="relative inline-block p-4 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl sm:max-w-sm rounded-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:p-6">
                                    <div className="mt-5 text-center">
                                        <h3 className="text-lg font-medium text-gray-800 dark:text-white" id="modal-title">
                                            Payment Details
                                        </h3>
                                    </div>
                                    <form onSubmit={handleConfirmPayment}>
                                        <div className="flex items-center justify-center mx-auto">
                                            <img className="h-full rounded-lg" src={classDetails.image} alt="" />
                                        </div>
                                        <div className="mt-5">
                                            <p>Title: {classDetails.title}</p>
                                            <p>Posted by: {classDetails.postedBy}</p>
                                            <p>Price: ${classDetails.price}</p>
                                        </div>
                                        <div className="mt-4 flex justify-between">
                                            <button
                                                type="button"
                                                onClick={handleModalClose}
                                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg"
                                            >
                                                Close
                                            </button>
                                            <button
                                                type="submit"
                                                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                                            >
                                                Confirm Payment
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClassDetails;
