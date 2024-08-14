// Function to get the access token from localStorage
export const getAccessToken = () => {
  return localStorage.getItem('access_token');
};

// Function to get the refresh token from localStorage
export const getRefreshToken = () => {
  return localStorage.getItem('refresh_token');
};

// Function to store tokens in localStorage
export const storeTokens = (access, refresh) => {
  localStorage.setItem('access_token', access);
  localStorage.setItem('refresh_token', refresh);
};

const lurl = 'http://localhost:8002'; 
const durl = process.env.NEXT_PUBLIC_API_URL; 

// Function to refresh the access token using the refresh token
export const refreshToken = async () => {
  const refreshToken = getRefreshToken();
  
  if (!refreshToken) {
    // Handle case where refresh token is missing
    window.location.href = '/login';
    return null;
  }

  try {
    const response = await fetch(`${durl}/users/token/refresh/`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error refreshing token:', errorData);
      window.location.href = '/login';
      return null;
    }

    const { access } = await response.json();
    storeTokens(access, refreshToken); // Update access token
    return access;
  } catch (error) {
    console.error('Error refreshing token:', error);
    window.location.href = '/login';
    return null;
  }
};

// Function to fetch data with automatic token refresh
export const fetchWithToken = async (url, options = {}) => {
  let token = getAccessToken();

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.status === 401) {
      // Token may be expired; attempt to refresh
      token = await refreshToken();

      if (!token) {
        // If refresh fails, redirect to login
        window.location.href = '/login';
        return null;
      }

      // Retry the request with the new token
      const retryResponse = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!retryResponse.ok) {
        const retryErrorData = await retryResponse.json();
        console.error('Error fetching data after token refresh:', retryErrorData);
        throw new Error(`HTTP error! status: ${retryResponse.status}`);
      }

      const data = await retryResponse.json();
      return data;
    }

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error fetching data:', errorData);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error.message); 
    throw error;
  }
};

