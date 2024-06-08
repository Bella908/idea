import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useRole from '../../../Hooks/useRole';

const Profile = () => {
 
    const {user} = useAuth()
    const [role] = useRole()





    return (

        <div className=' bg-[#7091E6] mt-20'>
            <div>
                <h4 className='text-center text-3xl pt-9 font-bold text-yellow-300'>Profile</h4>
            </div>
            <div className='lg:mx-96 lg:mt-5 lg:pb-10'>

                

            <div className="flex flex-col items-center justify-center max-w-xs p-6 shadow-md rounded-xl sm:max-w-sm md:max-w-md sm:p-8 md:p-10 bg-white dark:bg-gray-800 dark:text-gray-200 mx-auto">
	<img src={user?.photoURL} alt="User Avatar" className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full shadow-md object-cover" />
	<div className="space-y-4 text-center mt-4">
		<div className="my-2 space-y-1">
			<h2 className="text-lg font-semibold sm:text-xl md:text-2xl">{user?.displayName}</h2>
			<p className="px-4 sm:px-5 text-xs sm:text-base text-gray-500 dark:text-gray-400 ">{user?.email}</p>
			<p className="px-4 sm:px-5 text-xs sm:text-base dark:text-gray-400 bg-yellow-300 font-bold rounded text-[#7091E6]">{role.toUpperCase()}</p>
		</div>
	</div>
</div>


            </div>
        </div>
    );
};

export default Profile;