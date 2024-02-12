import React, { useState } from 'react';
import axios from 'axios';

const CreateAstrologer = () => {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        phone_number: '',
        specialization: '',
        YearsOfExperience: 0,
        Rating: '',
        bio: '',
        images: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(
                'http://ec2-13-233-152-110.ap-south-1.compute.amazonaws.com:5000/auth/register/astrologer/createAstrologer',
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            // Handle the response
            console.log('API Response:', response.data);

            // Reset form after successful submission if needed
            setFormData({
                email: '',
                name: '',
                phone_number: '',
                specialization: '',
                YearsOfExperience: 0,
                Rating: '',
                bio: '',
                images: '',
            });

        } catch (error) {
            // Handle errors
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('API Error - Response:', error.response.data);
                console.error('Status Code:', error.response.status);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('API Error - No response received:', error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('API Error - Request setup:', error.message);
            }
        }
    };

    return (
        <div className="p-4 mt-13 sm:mt-0">
            <h2 className="text-xl font-bold mb-4">Create Astrologer</h2>
            <form onSubmit={handleSubmit}>
                {/* Input fields */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border rounded-md w-full py-2 px-3"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border rounded-md w-full py-2 px-3"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone_number">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        id="phone_number"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        className="border rounded-md w-full py-2 px-3"
                        maxLength={10}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bio">
                        Bio
                    </label>
                    <input
                        type="text"
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        className="border rounded-md w-full py-2 px-3"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="specialization">
                        Specialization
                    </label>
                    <input
                        type="text"
                        id="specialization"
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleChange}
                        className="border rounded-md w-full py-2 px-3"
                        required
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="YearsOfExperience">
                            Years of Experience
                        </label>
                        <input
                            type="number"
                            id="YearsOfExperience"
                            name="YearsOfExperience"
                            value={formData.YearsOfExperience}
                            onChange={handleChange}
                            className="border rounded-md w-full py-2 px-3"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Rating">
                            Rating
                        </label>
                        <input
                            type="text"
                            id="Rating"
                            name="Rating"
                            value={formData.Rating}
                            onChange={handleChange}
                            className="border rounded-md w-full py-2 px-3"
                            required
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="images">
                        Images
                    </label>
                    <input
                        type="text"
                        id="images"
                        name="images"
                        value={formData.images}
                        onChange={handleChange}
                        className="border rounded-md w-full py-2 px-3"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Create Astrologer
                </button>
            </form>
        </div>
    );
};

export default CreateAstrologer;
