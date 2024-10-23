// src/components/Profile.js

import React, { useState, useEffect, useContext } from 'react';
import { FileText, ChevronDown } from 'lucide-react';
import { FaCheckCircle } from 'react-icons/fa';
import { 
    getProfile, 
    updateProfile, 
    downloadPDF, 
    updateBio, 
    checkPDF, 
    updateCustomFields, 
    deleteCustomField, 
    deletePDF 
} from './API';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, setUser } = useContext(AuthContext);
    const [selectedFile, setSelectedFile] = useState(null);
    const [bio, setBio] = useState('');
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [messageOpacity, setMessageOpacity] = useState(0);
    const [uploadedFileName, setUploadedFileName] = useState('');
    const [dropdownValue, setDropdownValue] = useState('');
    const [customFields, setCustomFields] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [uploadSuccessful, setUploadSuccessful] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                console.log("Fetching profile data...");
                if (!user) {
                    const userData = await getProfile();
                    setUser(userData);
                    setBio(userData.bio || '');
                    setCustomFields(userData.custom_fields || []);
                } else {
                    setBio(user.bio || '');
                    setCustomFields(user.custom_fields || []);
                }

                const pdfCheck = await checkPDF();
                if (pdfCheck.has_pdf) {
                    setUploadedFileName(pdfCheck.pdf_filename);
                    setUploadSuccessful(true);
                }

                console.log("Profile data fetched successfully.");
            } catch (error) {
                console.error('Error fetching profile data:', error);
                setMessage('Error fetching profile data.');
                navigate('/login');
            }
        };

        fetchProfileData();
    }, [user, setUser, navigate]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            setSelectedFile(file);
            setUploadedFileName(file.name);
            handleFileUpload(file);
        } else {
            alert('Please upload a valid PDF file.');
        }
    };

    const handleFileUpload = async (file) => {
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:8000/upload_pdf', {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            const result = await response.json();
            if (response.ok) {
                setMessage('PDF uploaded successfully.');
                setUploadSuccessful(true);
                console.log("PDF uploaded successfully.");
            } else {
                console.error('Failed to upload PDF:', result);
                setMessage(result.detail || 'Failed to upload PDF.');
                setUploadSuccessful(false);
            }
        } catch (error) {
            console.error('Error uploading PDF:', error);
            setMessage('Error uploading PDF.');
            setUploadSuccessful(false);
        }
    };

    const handleDeletePDF = async () => {
        try {
            const result = await deletePDF();
            setUploadedFileName('');
            setUploadSuccessful(false);
            setMessage(result.message || 'PDF deleted successfully.');
        } catch (error) {
            setMessage(error.message || 'Failed to delete PDF.');
            console.error(error);
        }
    };

    const handleDeleteFile = () => {
        setSelectedFile(null);
        setUploadedFileName('');
        setUploadSuccessful(false);
        handleDeletePDF();
    };

    const handlePDFDownload = async () => {
        try {
            console.log("Initiating PDF download...");
            await downloadPDF();
            setMessage('PDF downloaded successfully.');
        } catch (error) {
            console.error('Error downloading PDF:', error);
            setMessage('Failed to download PDF.');
        }
    };

    const handleBioUpdate = async () => {
        try {
            const result = await updateBio(bio);
            setMessage('Bio updated successfully.');
            setShowMessage(true);
            setMessageOpacity(1);

            setTimeout(() => {
                setMessageOpacity(0);
                setTimeout(() => setShowMessage(false), 500);
            }, 3000);
        } catch (error) {
            console.error('Failed to update bio:', error);
            setMessage(error.message || 'Failed to update bio.');
            setShowMessage(true);
            setMessageOpacity(1);

            setTimeout(() => {
                setMessageOpacity(0);
                setTimeout(() => setShowMessage(false), 500);
            }, 3000);
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    const handleAddField = () => {
        const title = dropdownValue === 'Custom' ? 'Enter title for your information' : dropdownValue;
        if (title === 'Custom') {
            alert('Please select a valid information type or choose a different option.');
            return;
        }
        setCustomFields([...customFields, { title, text: '', isPublic: true }]);
        setDropdownValue('');
    };

    const handleFieldChange = (index, key, value) => {
        const updatedFields = customFields.map((field, i) =>
            i === index ? { ...field, [key]: value } : field
        );
        setCustomFields(updatedFields);
    };

    const handleSaveCustomFields = async () => {
        try {
            await updateCustomFields(customFields);
            setMessage('Custom fields saved successfully.');
            setShowMessage(true);
            setMessageOpacity(1);

            setTimeout(() => {
                setMessageOpacity(0);
                setTimeout(() => setShowMessage(false), 500);
            }, 3000);
        } catch (error) {
            console.error('Failed to update custom fields:', error);
            setMessage(error.message || 'Failed to save custom fields.');
            setShowMessage(true);
            setMessageOpacity(1);

            setTimeout(() => {
                setMessageOpacity(0);
                setTimeout(() => setShowMessage(false), 500);
            }, 3000);
        }
    };

    const handleDeleteField = async (index, title) => {
        try {
            await deleteCustomField(title);
            setCustomFields(customFields.filter((_, i) => i !== index));
            setMessage('Custom field deleted successfully.');
            setShowMessage(true);
            setMessageOpacity(1);

            setTimeout(() => {
                setMessageOpacity(0);
                setTimeout(() => setShowMessage(false), 500);
            }, 3000);
        } catch (error) {
            console.error('Failed to delete field:', error);
            setMessage(error.message || 'Failed to delete custom field.');
            setShowMessage(true);
            setMessageOpacity(1);

            setTimeout(() => {
                setMessageOpacity(0);
                setTimeout(() => setShowMessage(false), 500);
            }, 3000);
        }
    };

    const handleToggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleDropdownSelect = (option) => {
        setDropdownValue(option);
        setIsDropdownOpen(false);
    };

    return (
        <div className="mx-auto items-start w-[60%]">
            <div className="container px-4 py-8 flex flex-col items-start h-auto min-h-[100px]">
                <div className="flex justify-center w-full">
                    <h1 className="text-3xl font-bold mb-4 text-center">Your Profile</h1>
                </div>

                {/* User Information Section */}
                <div className="rounded-3xl w-full bg-gray-500/20 p-6 mt-5">
                    <h2 className="text-2xl font-semibold mb-4">User Information</h2>
                    <p className="text-base mb-2"><strong>Username:</strong> {user.username}</p>
                    <p className="text-base mb-2"><strong>Email:</strong> {user.email}</p>
                    <p className="text-base mb-2"><strong>Size of 1st Network:</strong> {user.firstnetworkSize || 'N/A'}</p>
                    <p className="text-base mb-2"><strong>Size of 2nd Network:</strong> {user.secondnetworkSize || 'N/A'}</p>
                </div>

                {/* Bio Section */}
                <div className="rounded-3xl w-full bg-gray-500/20 p-6 mt-10">
                    <div className="rounded-lg w-full">
                        <h2 className="text-2xl font-semibold mb-2">Bio:</h2> 
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            className="w-full rounded-xl bg-white/70 p-4 placeholder-gray-500 text-black resize-y hover:bg-white transition-all duration-300 ease-in-out"
                            rows={1}
                            placeholder="Write something about yourself..."
                            style={{ minHeight: '100px', maxHeight: '300px' }}
                        />
                        <button onClick={handleBioUpdate} className="bg-blue-500 text-white text-sm px-3 py-1 rounded-full mt-2 hover:bg-blue-600 hover:scale-105 transition-all duration-300 ease-in-out">
                            Update Bio
                        </button>
                    </div>

                    {showMessage && (
                        <p
                            className={`text-green-500 mt-2 transition-opacity duration-500 ease-in-out`}
                            style={{ opacity: messageOpacity }}
                        >
                            {message}
                        </p>
                    )}
                </div>

                {/* CV Section */}
                <div className="rounded-3xl w-full bg-gray-500/30 p-6 mt-10">
                    <div className="text-left w-52 h-auto">
                        <h2 className="text-2xl font-semibold mb-4">Your CV</h2>  

                        <label className="relative cursor-pointer">
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <div className="flex flex-col items-center gap-2 p-4 border-2 border-dashed border-gray-500 rounded-lg transition-transform transform hover:scale-105 hover:border-blue-500 hover:text-blue-500 transition-all duration-300 ease-in-out group">
                                <div className="flex items-center gap-1">
                                    <FileText
                                        size={24}
                                        className="text-gray-500 group-hover:text-blue-500 transition-all duration-300 ease-in-out"
                                    />
                                    {uploadedFileName && (
                                        <span className="text-gray-600">{uploadedFileName}</span>
                                    )}
                                    {uploadSuccessful && (
                                        <FaCheckCircle size={20} className="text-green-500" />
                                    )}
                                </div>
                                <span className="text-sm font-medium text-gray-600 group-hover:text-blue-500 transition-all duration-300 ease-in-out">
                                    {uploadedFileName ? (
                                        `Click to replace: ${uploadedFileName}`
                                    ) : (
                                        'Click to upload PDF'
                                    )}
                                </span>
                                {uploadedFileName && (
                                    <button 
                                        onClick={handleDeleteFile} 
                                        className="mt-2 bg-red-500/20 border-red-500 border-[2px] hover:bg-red-500/80 text-white px-3 py-1 rounded-xl transition-all duration-300 ease-in-out"
                                    >
                                        Delete File
                                    </button>
                                )}
                            </div>
                        </label>
                    </div>
                </div>

                {/* Custom Fields Section */}
                <div className="rounded-3xl w-full bg-gray-500/30 p-6 mt-10 mb-40">
                    <div className="relative">
                        <h2 className="text-2xl font-semibold mb-4">Additional Info</h2>

                        {customFields.map((field, index) => (
                            <div key={index} className="mt-10 w-full">
                                <div className="flex justify-between items-center">
                                    <input
                                        type="text"
                                        value={field.title}
                                        onChange={(e) => handleFieldChange(index, 'title', e.target.value)}
                                        className="w-4/5 p-2 mb-2 rounded-xl bg-white/50 text-black hover:bg-white transition-all duration-300 ease-in-out"
                                    />
                                    <div className="flex space-x-2 mb-2">
                                        <div
                                            onClick={() => handleFieldChange(index, 'isPublic', !field.isPublic)}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: field.isPublic ? 'flex-end' : 'flex-start',
                                                width: '90px',
                                                backgroundColor: field.isPublic ? '#22c55e' : '#ef4444',
                                                borderRadius: '30px',
                                                cursor: 'pointer',
                                                border: field.isPublic ? '2px solid #22c55e' : '2px solid #ef4444',
                                                position: 'relative',
                                                transition: 'all 0.3s ease-in-out',
                                            }}
                                        >
                                            <span
                                                style={{
                                                    fontSize: '12px',
                                                    color: 'black',
                                                    padding: '0 10px',
                                                    position: 'absolute',
                                                    right: field.isPublic ? '25px' : 'auto',
                                                    left: field.isPublic ? 'auto' : '25px',
                                                }}
                                            >
                                                {field.isPublic ? 'Public' : 'Hidden'}
                                            </span>

                                            <div
                                                style={{
                                                    height: '30px',
                                                    width: '30px',
                                                    backgroundColor: 'white',
                                                    borderRadius: '50%',
                                                    transition: 'all 0.3s ease-in-out',
                                                    transform: field.isPublic ? 'translateX(0px)' : 'translateX(0)',
                                                }}
                                            />
                                        </div>

                                        <button
                                            className="p-1 rounded-lg bg-red-500/20 border-red-500 border-[2px] hover:bg-red-500/80 transition-all duration-300 ease-in-out"
                                            onClick={() => handleDeleteField(index, field.title)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                <textarea
                                    value={field.text}
                                    onChange={(e) => handleFieldChange(index, 'text', e.target.value)}
                                    className="w-full p-2 mb-2 rounded-xl bg-white/50 text-black hover:bg-white transition-all duration-300 ease-in-out"
                                    rows={2}
                                    placeholder="Enter details here..."
                                />
                            </div>
                        ))}

                        {/* Dropdown & Add Button */}
                        <div className="p-2 bg-white/50 text-black rounded-xl cursor-pointer flex items-center justify-between hover:bg-white transition-all duration-300 ease-in-out mt-14" onClick={handleToggleDropdown}>
                            <span className="font-semibold px-2 truncate">{dropdownValue || 'Select Information Type'}</span>
                            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </div>

                        {isDropdownOpen && (
                            <ul className="mt-2 bg-white/50 text-black rounded-xl shadow-lg max-h-60 overflow-y-auto">
                                {[
                                    "List of 10 things you are looking (for help) with",
                                    "List of things you can offer other help with",
                                    "Your essay",
                                    "Books you have read",
                                    "Your explained CV",
                                    "List of things you want to have achieved in the next 6 months",
                                    "Where you have lived",
                                    "Your network of people",
                                    "Your fav philosopher",
                                    "Your fav book",
                                    "Your fav music artist",
                                    "Your fav artist",
                                    "Your fav visual artist",
                                    "Your fav movie",
                                    "Your hobbies",
                                    "Your lectures you have taken",
                                    "Coding experiences",
                                    "Languages you speak",
                                    "Languages you can code in and libraries you have used",
                                    "Custom"
                                ].map((option, index) => (
                                    <li key={index} className="px-4 py-2 cursor-pointer hover:bg-white transition-all duration-200" onClick={() => handleDropdownSelect(option)}>
                                        {option}
                                    </li>
                                ))}
                            </ul>
                        )}

                        <div className="space-x-4">
                            <button onClick={handleAddField} className="bg-white/50 text-black text-sm px-3 py-1 rounded-xl mt-4 hover:bg-white hover:scale-105 transition-all duration-300 ease-in-out">
                                Add this info
                            </button>
                            <button 
                                onClick={handleSaveCustomFields} 
                                className="bg-green-500/30 border-green-500 border-[2px] hover:bg-green-500 text-white text-sm px-3 py-1 rounded-xl mt-4 hover:scale-105 transition-all duration-300 ease-in-out"
                                style={{ boxSizing: 'border-box' }}
                            >
                                Save Information
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
