import React from 'react';

const AddClass = () => {
    return (
        <div>
           <div class="min-h-screen p-6 bg-[#ADBBDA] flex items-center justify-center">
  <div class="container max-w-screen-lg mx-auto">
    <div>
      <h2 class="font-semibold text-xl text-white">Add a Class</h2>
      <p class="text-gray-500 mb-6">Fill-up this form to add a class</p>

      <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
        <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
          <div class="text-gray-600">
            <p class="font-medium text-lg">Details about the class</p>
            <p>Please fill out all the fields.</p>
          </div>

          <div class="lg:col-span-2">
            <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
              <div class="md:col-span-5">
                <label for="title">Title</label>
                <input type="text" name="title" id="title" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" />
              </div>
              <div class="md:col-span-5">
                <label for="full_name">Name</label>
                <input type="text" name="full_name" id="full_name" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" />
              </div>

              <div class="md:col-span-5">
                <label for="email">Email Address</label>
                <input type="text" name="email" id="email" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" placeholder="email@domain.com" />
              </div>

              <div class="md:col-span-3">
                <label for="price">Price</label>
                <input type="text" name="price" id="price" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" placeholder="" />
              </div>

              <div class="md:col-span-2">
                <label for="city">Image</label>
                <input type="text" name="city" id="city" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" placeholder="" />
              </div>
             
              <div class="md:col-span-2">
                <label for="description">Description</label>
                <input type="text" name="city" id="city" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" placeholder="" />
              </div>

             

              <div class="md:col-span-5 text-right">
                <div class="inline-flex items-end">
                  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

    
  </div>
</div>
        </div>
    );
};

export default AddClass;