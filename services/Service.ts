import { RideSchedule } from "../types/RideSchedule";
import { fetchAPI } from "../lib/api";
import { Clients, Userss } from "../types/Clients";
import { NewRide } from "@/types/RideSchedule";

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

// 1️⃣ Get verified students
export const fetchStudentsVerified = async (): Promise<Userss[]> => {
  try {
    const data = await fetchAPI("/auth/students-verified", {
      method: "GET",
    });
    return data.students || [];
  } catch (error) {
    console.error("Error fetching verified students:", error);
    return [];
  }
};




// 2️⃣ Get all teachers
export const fetchTeachers = async (): Promise<Userss[]> => {
  try {
    const data = await fetchAPI("/auth/teachers", {
      method: "GET",
    });
    return data.teachers || [];
  } catch (error) {
    console.error("Error fetching teachers:", error);
    return [];
  }
};

// 3️⃣ Validate a Userss (admin only)
export const validateUserss = async (UserssId: string): Promise<Userss | null> => {
  try {
    const data = await fetchAPI(`/auth/validate-Users/${UserssId}`, {
      method: "PATCH",
    });
    return data.Userss || null;
  } catch (error) {
    console.error(`Error validating Userss ${UserssId}:`, error);
    return null;
  }
};

export const fetchUsers = async (): Promise<Userss[]> => {
  try {
    const data: Userss[] = await fetchAPI("/Usersss/Usersss");
    return data;
  } catch (error) {
    console.error("Error fetching Usersss:", error);
    return []; // Return an empty array to maintain the function's contract
  }
};

export const fetchUserssById = async (id: string): Promise<Userss> => {
  try {
    const Userss: Userss = await fetchAPI(
      `/Usersss/Usersss/${encodeURIComponent(id)}`
    );
    return Userss;
  } catch (error) {
    console.error(`Error fetching Userss with ID ${id}:`, error);
    throw error;
  }
};

export const deleteUserssByEmail = async (email: string): Promise<void> => {
  try {
    const response = await fetch("https://api-slwdtp5cqq-uc.a.run.app/Usersss/delete-driver", {
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
      `/Usersss/UsersssByEmail/${encodeURIComponent(email)}`
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

const translateError = (message: string) => {
  switch (message) {
    case "firstName, lastName and email are required":
      return "Le prénom, le nom et l'email sont obligatoires.";
    case "Email already in use":
      return "Cet email est déjà utilisé.";
    case "Registration failed":
      return "Échec de la création du compte. Veuillez réessayer.";
    default:
      return message; // si le backend renvoie déjà un message personnalisé
  }
};


export const createUser = async (UserssData: Userss): Promise<Userss> => {
  try {
    const data = await fetchAPI("/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(UserssData),
    });

    return data.Userss || data;
  } catch (err: any) {
    const translated = translateError(err.message);
    console.error("Erreur création utilisateur:", translated);
    throw new Error(translated);
  }
};



export const DeleteUserss = async (UserssId: string): Promise<void> => {
  try {
    await fetchAPI(`/Usersss/Usersss/${encodeURIComponent(UserssId)}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': `Bearer ${yourAuthToken}`, // Uncomment if needed
      },
    });
  } catch (error) {
    console.error(`Error deleting Userss with ID ${UserssId}:`, error);
    throw new Error("Failed to delete the Userss.");
  }
};

// In your Service.js or Service.ts file
export const updateClient = async (id: string, updatedClientData: Clients) => {
  try {
    const response = await fetchAPI(`/customer/customers/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedClientData),
    });

    return response; // Assuming the API returns the created Driver object as JSON
  } catch (error) {
    console.error("Error creating new driver:", error);
    throw error; // Rethrow the error to handle it in the calling component
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
