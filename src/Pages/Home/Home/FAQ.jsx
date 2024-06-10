import React from 'react';

const FAQ = () => {
    return (
        <div className='mx-10 mt-16'>
            <div className=''>
                <p className='text-5xl '>FAQs</p>
                <p className='text-xl py-7'>Find answers to common questions about using IDEA and our services</p>
            </div>
            <div className='my-10'>
                <div className="collapse collapse-arrow bg-base-200">
                    <input type="radio" name="my-accordion-2" defaultChecked /> 
                    <div className="collapse-title text-xl font-medium">
                        How do I enroll in a course?
                    </div>
                    <div className="collapse-content"> 
                        <p>Enrolling in a course is easy! Simply browse our course catalog, select the course you're interested in, and follow the enrollment instructions.</p>
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-base-200">
                    <input type="radio" name="my-accordion-2" /> 
                    <div className="collapse-title text-xl font-medium">
                        What payment methods do you accept?
                    </div>
                    <div className="collapse-content"> 
                        <p>We accept various payment methods including credit/debit cards, PayPal, and bank transfers. You can choose your preferred payment option at checkout.</p>
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-base-200">
                    <input type="radio" name="my-accordion-2" /> 
                    <div className="collapse-title text-xl font-medium">
                        Can I get a refund if I cancel my enrollment?
                    </div>
                    <div className="collapse-content"> 
                        <p>Our refund policy allows for cancellations and refunds within a specified period. Please check our refund policy for detailed information on eligibility and procedures.</p>
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-base-200">
                    <input type="radio" name="my-accordion-2" /> 
                    <div className="collapse-title text-xl font-medium">
                        How can I contact customer support?
                    </div>
                    <div className="collapse-content"> 
                        <p>You can contact our customer support team via email, phone, or live chat. Visit our Contact Us page for more details and support hours.</p>
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-base-200">
                    <input type="radio" name="my-accordion-2" /> 
                    <div className="collapse-title text-xl font-medium">
                        Are there any prerequisites for the courses?
                    </div>
                    <div className="collapse-content"> 
                        <p>Some courses may have prerequisites. You can find the prerequisite details in the course description. If you have any questions, feel free to reach out to our support team.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
