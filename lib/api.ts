const API_URL = "https://api-slwdtp5cqq-uc.a.run.app"; // Ensure this URL is correct
      export async function fetchAPI(
        endpoint: string,
        options: RequestInit = {} // Allow all properties of RequestInit (method, headers, body, etc.)
      ) {
        const url = `${API_URL}${endpoint}`;

        const response = await fetch(url, options); // Use the passed options

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Assuming the response is JSON
        return response.json();
      }
