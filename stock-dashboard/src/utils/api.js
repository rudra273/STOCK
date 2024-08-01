// src/utils/api.js

export const getToken = () => {
    return localStorage.getItem('access_token');
  };
  
  export const fetchWithAuth = async (url) => {
    const token = getToken();
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
  
    if (response.status === 401) {
      // Handle unauthorized error, e.g., refresh token or redirect to login
      console.error('Unauthorized access - handle token refresh or login');
      return;
    }
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    return response.json();
  };
  