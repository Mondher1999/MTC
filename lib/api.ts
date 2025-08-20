const API_BASE =
  process.env.NODE_ENV === "production"
    ? "/api" // production → nginx forwards to backend
    : "http://localhost:4002"; // local dev → direct backend
    
      export async function fetchAPI(
        endpoint: string,
        options: RequestInit = {} // Allow all properties of RequestInit (method, headers, body, etc.)
      ) {
        const url = `${API_BASE}${endpoint}`;

        const response = await fetch(url, options); // Use the passed options

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Assuming the response is JSON
        return response.json();
      }
