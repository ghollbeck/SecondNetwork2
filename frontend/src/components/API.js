// src/components/API.js

const base = 'http://localhost:8000'; // Ensure this matches your backend URL

// Register User
const registerUser = async (username, email, password, bio) => {
    const response = await fetch(`${base}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password, bio }),
    });
    const data = await response.json();
  
    if (!response.ok) {
      console.error('Error data:', data); // Log the error data for debugging
      let errorMessage = 'Registration failed';
      if (data.detail) {
        if (Array.isArray(data.detail)) {
          // Extract messages from the array
          errorMessage = data.detail.map((err) => `${err.msg}`).join(', ');
        } else if (typeof data.detail === 'string') {
          errorMessage = data.detail;
        }
      }
      throw new Error(errorMessage);
    }
    return data;
  };

// Login User
const loginUser = async (email, password) => {
    const response = await fetch(`${base}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
  
    if (!response.ok) {
      console.error('Error data:', data); // Log the error data for debugging
      let errorMessage = 'Login failed';
      if (data.detail) {
        if (Array.isArray(data.detail)) {
          errorMessage = data.detail.map((err) => `${err.msg}`).join(', ');
        } else if (typeof data.detail === 'string') {
          errorMessage = data.detail;
        }
      }
      throw new Error(errorMessage);
    }
    localStorage.setItem('token', data.access_token);
    return data;
  };

// Get Profile
const getProfile = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${base}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || 'Failed to fetch profile');
  }
  return data;
};

// Update Profile
const updateProfile = async (updates) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${base}/profile`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || 'Failed to update profile');
  }
  return data;
};

// Download PDF
const downloadPDF = async () => {
    const token = localStorage.getItem('token');
    try {
        console.log("Attempting to download PDF...");
        const response = await fetch(`${base}/download_pdf`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        if (!response.ok) {
            throw new Error('Failed to download PDF');
        }

        // Create a Blob from the response
        const blob = await response.blob();
        console.log("PDF Blob received.");

        // Create a link element, hide it, direct it towards the Blob, and trigger a click
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;

        // Get the filename from the response headers, or use a default name
        const contentDisposition = response.headers.get('Content-Disposition');
        let filename = 'downloaded.pdf';
        if (contentDisposition) {
            const match = contentDisposition.match(/filename="(.+)"/);
            if (match && match.length > 1) {
                filename = match[1];
            }
        }
        console.log(`PDF filename: ${filename}`);

        link.setAttribute('download', filename);  // Set the file name
        document.body.appendChild(link);
        link.click();  // Trigger the download
        document.body.removeChild(link);  // Clean up

        // Release the object URL
        window.URL.revokeObjectURL(url);
        console.log("PDF download triggered successfully.");
    } catch (error) {
        console.error('Error downloading PDF:', error);
        throw new Error('Error downloading PDF');
    }
};

// Update Bio
const updateBio = async (bio) => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${base}/update_bio`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ bio }),  // Send the bio as a JSON object
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.detail || 'Failed to update bio.');
        }

        console.log("Bio updated successfully.");
        return result;
    } catch (error) {
        console.error('Error updating bio:', error);
        throw new Error('Error updating bio.');
    }
};

// Check PDF
const checkPDF = async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${base}/check_pdf`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.detail || 'Failed to check for PDF.');
        }

        return result;  // result will have { has_pdf: true/false, pdf_filename: '' }
    } catch (error) {
        console.error('Error checking PDF:', error);
        throw new Error('Error checking PDF.');
    }
};

// Delete PDF
const deletePDF = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${base}/delete_pdf`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete PDF.');
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error deleting PDF:', error);
      throw error;
    }
  };

// Update Custom Fields
const updateCustomFields = async (customFields) => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${base}/update_custom_fields`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ custom_fields: customFields }),
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.detail || 'Failed to update custom fields.');
        }

        console.log("Custom fields updated successfully.");
        return result;
    } catch (error) {
        console.error('Error updating custom fields:', error);
        throw new Error('Error updating custom fields.');
    }
};

// Delete Custom Field
const deleteCustomField = async (fieldTitle) => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${base}/delete_custom_field/${encodeURIComponent(fieldTitle)}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.detail || 'Failed to delete custom field.');
        }

        console.log(`Custom field '${fieldTitle}' deleted successfully.`);
        return result;
    } catch (error) {
        console.error('Error deleting custom field:', error);
        throw new Error('Error deleting custom field.');
    }
};

export { registerUser, loginUser, getProfile, updateProfile, downloadPDF, updateBio, checkPDF, deletePDF, updateCustomFields, deleteCustomField };
