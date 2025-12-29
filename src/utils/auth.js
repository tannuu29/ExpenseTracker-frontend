/**
 * Global authentication fetch helper
 * Provides a standardized way to make authenticated API calls
 * Automatically handles 401/403 responses by logging out and redirecting
 * 
 * @param {string} url - The API endpoint URL
 * @param {object} options - Fetch options (method, body, headers, etc.)
 * @returns {Promise<Response>} - Fetch response promise
 */
export const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem("token")?.trim();

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Always add Authorization header if token exists
  if (token) {
    headers['Authorization'] = `Bearer ${localStorage.getItem("token")?.trim()}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // Handle expired/invalid tokens globally
  if (response.status === 401 || response.status === 403) {
    // Clear authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    
    // Show alert and redirect
    alert('Session expired. Please login again.');
    window.location.href = '/';
    
    // Return the response so calling code can handle it if needed
    return response;
  }

  return response;
};

/**
 * Base API URL constant
 */
export const API_BASE_URL = 'http://localhost:80';
