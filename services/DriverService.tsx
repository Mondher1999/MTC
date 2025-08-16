import { fetchAPI } from "../lib/api";
import { Drivers } from "../types/Drivers";

export const fetchDriver = async (): Promise<Drivers[]> => {
  try {
    const data: Drivers[] = await fetchAPI("/user/drivers");
    return data;
  } catch (error) {
    console.error("Error fetching driver schedules:", error);
    return []; // Return an empty array to maintain the function's contract
  }
};

export const fetchDriverById = async (id: string): Promise<Drivers> => {
  try {
    const driver: Drivers = await fetchAPI(
      `/user/drivers/${encodeURIComponent(id)}`
    );
    return driver;
  } catch (error) {
    console.error(`Error fetching driver with ID ${id}:`, error);
    throw error;
  }
};

export const updateDriver = async (id: string, updatedDriverData: Drivers) => {
  try {
    const response = await fetchAPI(`/user/drivers/${encodeURIComponent(id)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedDriverData),
    });

    return response; // Assuming the API returns the created Driver object as JSON
  } catch (error) {
    console.error("Error creating new driver:", error);
    throw error; // Rethrow the error to handle it in the calling component
  }
};

export const DeleteDriver = async (driverId: string): Promise<void> => {
  try {
    await fetchAPI(`/user/drivers/${encodeURIComponent(driverId)}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': `Bearer ${yourAuthToken}`, // Uncomment if needed
      },
    });
  } catch (error) {
    console.error(`Error deleting driver with ID ${driverId}:`, error);
    throw new Error("Failed to delete the driver.");
  }
};

export const createDriver = async (newDriver: Drivers): Promise<Drivers> => {
  try {
    // Assuming fetchAPI returns the parsed JSON data directly
    const data = await fetchAPI("/user/drivers/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDriver), // Convert the newDriver object to JSON string
    });

    // Check if data contains an error or if it's not returned as expected
    if (!data) {
      throw new Error("No response from server.");
    }

    if (data.error) {
      throw new Error(`Failed to create driver: ${data.error}`);
    }

    // Assuming the response data should include a driver object directly
    const createdDriver: Drivers = data.driver || data;

    if (!createdDriver || !createdDriver.id) {
      throw new Error(
        "The backend did not return a valid object or missing ID for the created driver."
      );
    }

    return createdDriver;
  } catch (error) {
    console.error("Error creating new driver:", error);
    throw error; // Rethrow the error to handle it in the calling component
  }
};
