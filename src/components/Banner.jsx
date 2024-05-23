import React from "react";

const Banner = () => {
    return (
<div class="relative h-[300px] font-[sans-serif]">
    <img src="https://cdn.pixabay.com/photo/2018/10/04/07/04/trees-3723070_1280.jpg" alt="Banner Image" class="w-full h-full object-cover" />
    <div class="absolute inset-0 bg-black opacity-50"></div>
    <div class="absolute inset-0 flex flex-col justify-center items-center text-white  px-6">
        <h2 class="text-4xl font-bold mb-4">Welcome to Wildfire Management</h2>
        <p class="text-lg text-center mb-6">Protecting our environment for a sustainable future.</p>
        <a href="javascript:void(0)"
            class="bg-transparent text-white font-semibold py-2 border-2 border-white px-6 rounded hover:bg-white hover:text-black transition duration-300 ease-in-out">
            Register Now
        </a>
    </div>
</div>
    );
};

export default Banner;
