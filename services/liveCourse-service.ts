import { RideSchedule } from "../types/RideSchedule";
import { fetchAPI } from "../lib/api";
import { Clients, Userss } from "../types/Clients";
import { NewRide } from "@/types/RideSchedule";
import { LiveCourses, NewRecordedCourse } from "@/types/Courses";


const API_BASE =
  process.env.NODE_ENV === "production"
    ? "/api" // production → nginx forwards to backend
    : "http://localhost:4002"; // local dev → direct backend

export const fetchRideSchedules = async (): Promise<RideSchedule[]> => {
  try {
    const data: RideSchedule[] = await fetchAPI("/ride/rides/");
    return data;
  } catch (error) {
    console.error("Error fetching driver schedules:", error);
    return []; // Return an empty array to maintain the function's contract
  }
};

export const fetchClient = async (): Promise<Clients[]> => {
  try {
    const data: Clients[] = await fetchAPI("/customer/customers");
    return data;
  } catch (error) {
    console.error("Error fetching Clients:", error);
    return []; // Return an empty array to maintain the function's contract
  }
};

export const fetchLiveCourses = async (): Promise<LiveCourses[]> => {
  try {
    const data: LiveCourses[] = await fetchAPI("/livecourses/livecourses");
    return data;
  } catch (error) {
    console.error("Error fetching Userss:", error);
    return []; // Return an empty array to maintain the function's contract
  }
};

export const fetchCourses = async (): Promise<NewRecordedCourse[]> => {
  try {
    const data: NewRecordedCourse[] = await fetchAPI("/courses/courses");
    return data;
  } catch (error) {
    console.error("Error fetching Userss:", error);
    return []; // Return an empty array to maintain the function's contract
  }
};

export const fetchUserssById = async (id: string): Promise<Userss> => {
  try {
    const Userss: Userss = await fetchAPI(
      `/Userss/Userss/${encodeURIComponent(id)}`
    );
    return Userss;
  } catch (error) {
    console.error(`Error fetching Userss with ID ${id}:`, error);
    throw error;
  }
};

export const deleteUserssByEmail = async (email: string): Promise<void> => {
  try {
    const response = await fetch("https://api-slwdtp5cqq-uc.a.run.app/Userss/delete-driver", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to delete driver");
    }

    console.log(`✅ Driver with email "${email}" deleted successfully.`);
  } catch (error) {
    console.error(`❌ Error deleting driver with email "${email}":`, error);
    throw error;
  }
};



export const fetchUserssByEmail = async (email: string): Promise<Userss> => {
  try {
    const Userss: Userss = await fetchAPI(
      `/Userss/UserssByEmail/${encodeURIComponent(email)}`
    );
    return Userss;
  } catch (error) {
    console.error(`Error fetching Userss  ${email}:`, error);
    throw error;
  }
};

export const fetchRidesForDriver = async (
  name: string
): Promise<RideSchedule[]> => {
  try {
    // Pass the driver name as part of the URL path (encoded)
    const data: RideSchedule[] = await fetchAPI(
      `/ride/rides/driver/${encodeURIComponent(name)}`
    );
    return data;
  } catch (error) {
    console.error("Error fetching driver schedules:", error);
    return []; // Return an empty array to maintain the function's contract
  }
};

// Example DELETE API call using fetch
export const DeleteRide = async (rideId: string): Promise<void> => {
  try {
    await fetchAPI(`/ride/rides/${encodeURIComponent(rideId)}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': `Bearer ${yourAuthToken}`, // Uncomment if auth is needed
      },
    });
  } catch (error) {
    console.error(`Error deleting ride with ID ${rideId}:`, error);
    throw new Error("Failed to delete the ride.");
  }
};

export const DeleteClient = async (clientId: string): Promise<void> => {
  try {
    await fetchAPI(`/customer/customers/${encodeURIComponent(clientId)}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': `Bearer ${yourAuthToken}`, // Uncomment if needed
      },
    });
  } catch (error) {
    console.error(`Error deleting client with ID ${clientId}:`, error);
    throw new Error("Failed to delete the client.");
  }
};

export const updateRide = async (
  rideId: string, // Pass the ID of the ride to update
  rideData: RideSchedule // The updated ride data
): Promise<RideSchedule> => {
  try {
    // Make an API call to update the ride by its ID
    const data = await fetchAPI(`/ride/rides/${rideId}`, {
      method: "PATCH", // Use PUT or PATCH for updating the ride
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rideData),
    });

    // Check if data contains an error or no response
    if (!data) {
      throw new Error("No response from server.");
    }

    if (data.error) {
      throw new Error(`Failed to update ride: ${data.error}`);
    }

    const updatedRide: RideSchedule = data.ride || data;

    if (!updatedRide || !updatedRide.id) {
      throw new Error(
        "The backend did not return a valid object or missing ID for the updated ride."
      );
    }

    return updatedRide; // Return the updated ride object
  } catch (error) {
    console.error("Error updating ride:", error);
    throw error; // Rethrow the error so it can be handled by the caller
  }
};

export const createRide = async (rideData: NewRide): Promise<RideSchedule> => {
  try {
    // Assuming fetchAPI returns the parsed JSON data directly
    const data = await fetchAPI("/ride/rides/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rideData),
    });

    // Check if data contains an error
    if (!data) {
      throw new Error("No response from server.");
    }

    if (data.error) {
      throw new Error(`Failed to create ride: ${data.error}`);
    }

    const createdRide: RideSchedule = data.ride || data;

    if (!createdRide || !createdRide.id) {
      throw new Error(
        "The backend did not return a valid object or missing ID for the created ride."
      );
    }

    return createdRide;
  } catch (error) {
    console.error("Error creating new ride:", error);
    throw error;
  }
};

// Option 1: Accept FormData directly (Recommended for file uploads)

export const createRecordedCourse = async (formData: FormData): Promise<NewRecordedCourse> => {
  try {
    // Debug: Log what we're sending
    console.log('🚀 Making request to create course...');
    console.log('FormData entries:');
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`  ${key}: File(${value.name}, ${value.size} bytes, ${value.type})`);
      } else {
        console.log(`  ${key}: ${value}`);
      }
    }

    // Use the correct endpoint based on your route structure
    // Since your route file has router.post('/courses', ...) and it's mounted at /courses
    // The full path should be /courses/courses
    const endpoint = `${API_BASE}/courses/courses`;

    console.log('📡 Calling endpoint:', endpoint);

    const res = await fetch(endpoint, {
      method: 'POST',
      body: formData,
      // Don't set Content-Type - let browser handle it for multipart/form-data
    });

    console.log('📥 Response received:', {
      status: res.status,
      statusText: res.statusText,
      url: res.url,
      headers: Object.fromEntries(res.headers.entries())
    });

    // Check if we got an error status
    if (res.status === 404) {
      throw new Error('Backend route not found. Check if your backend server is running and the route exists.');
    }

    if (res.status >= 500) {
      const errorText = await res.text();
      console.error('❌ Server error response:', errorText.substring(0, 500));
      throw new Error(`Server error (${res.status}): ${res.statusText}`);
    }

    // Check if response is JSON
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const textResponse = await res.text();
      console.error('❌ Non-JSON response:', textResponse.substring(0, 500));
      
      // If we got HTML, it's likely a 404 or error page
      if (textResponse.includes('<!DOCTYPE') || textResponse.includes('<html')) {
        throw new Error('Backend returned HTML instead of JSON. This usually means the route was not found or there was a server error.');
      }
      
      throw new Error(`Server returned non-JSON response (${res.status}): ${contentType}`);
    }

    const data = await res.json();
    console.log('✅ Parsed JSON response:', data);

    if (!res.ok) {
      const errorMessage = data.error || data.message || `HTTP Error: ${res.status}`;
      throw new Error(errorMessage);
    }

    return data as NewRecordedCourse;
  } catch (error) {
    console.error('❌ Error creating course:', error);
    
    // Provide more helpful error messages
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Cannot connect to server. Is the backend running on port 5000?');
    }
    
   

    throw error;
  }
};

  export const createLiveCourse = async (courseData: LiveCourses): Promise<LiveCourses> => {
    try {
      const data = await fetchAPI("/livecourses/livecourses", {   // ✅ your backend expects POST /courses
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      });
  
      console.log("Backend response for create course:", data);
  
      if (!data) {
        throw new Error("No response from server.");
      }
  
      if (data.error) {
        throw new Error(`Failed to create course: ${data.error}`);
      }
  
      // ✅ Your backend returns { course: {...} }
      const createdCourse: LiveCourses = data.course || data;
  
      if (!createdCourse ) {
        throw new Error("The backend did not return a valid object or missing ID for the created course.");
      }
  
      return createdCourse;   // ✅ return the object, not the function
    } catch (error) {
      console.error("Error creating new course:", error);
      throw error;
    }
  };
  



export const ConfirmeRide = async (
  id: string // Pass the ID of the ride to update
): Promise<RideSchedule> => {
  try {
    const response = await fetchAPI(`/ride/validate/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    });

    return response; // Assuming the API returns the created Driver object as JSON
  } catch (error) {
    console.error("Error confirme new Ride:", error);
    throw error; // Rethrow the error to handle it in the calling component
  }
};
