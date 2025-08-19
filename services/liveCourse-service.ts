import { RideSchedule } from "../types/RideSchedule";
import { fetchAPI } from "../lib/api";
import { Clients, Users } from "../types/Clients";
import { NewRide } from "@/types/RideSchedule";
import { Courses } from "@/types/Courses";

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

export const fetchUsers = async (): Promise<Users[]> => {
  try {
    const data: Users[] = await fetchAPI("/users/users");
    return data;
  } catch (error) {
    console.error("Error fetching Users:", error);
    return []; // Return an empty array to maintain the function's contract
  }
};

export const fetchUserById = async (id: string): Promise<Users> => {
  try {
    const user: Users = await fetchAPI(
      `/users/users/${encodeURIComponent(id)}`
    );
    return user;
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    throw error;
  }
};

export const deleteUserByEmail = async (email: string): Promise<void> => {
  try {
    const response = await fetch("https://api-slwdtp5cqq-uc.a.run.app/users/delete-driver", {
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



export const fetchUserByEmail = async (email: string): Promise<Users> => {
  try {
    const user: Users = await fetchAPI(
      `/users/usersByEmail/${encodeURIComponent(email)}`
    );
    return user;
  } catch (error) {
    console.error(`Error fetching user  ${email}:`, error);
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

export const createRecordedCourse = async (courseData: Courses): Promise<Courses> => {
    try {
      const data = await fetchAPI("/courses/courses", {   // ✅ your backend expects POST /courses
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
      const createdCourse: Courses = data.course || data;
  
      if (!createdCourse || !createdCourse.id) {
        throw new Error("The backend did not return a valid object or missing ID for the created course.");
      }
  
      return createdCourse;   // ✅ return the object, not the function
    } catch (error) {
      console.error("Error creating new course:", error);
      throw error;
    }
  };


  export const createLiveCourse = async (courseData: Courses): Promise<Courses> => {
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
      const createdCourse: Courses = data.course || data;
  
      if (!createdCourse || !createdCourse.id) {
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
