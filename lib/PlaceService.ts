import axios from "axios";

const API_URL = "http://192.168.1.161:3000"; // Same as AuthService

interface CreatePlaceDto {
  title: string;
  type: string;
  address: string;
  photos: string[];
  // Add other fields as needed
}

interface UpdatePlaceDto {
  title?: string;
  type?: string;
  address?: string;
  photos?: string[];
  // Add other optional fields as needed
}

interface Place {
  _id: string;
  title: string;
  type: string;
  address: string;
  photos: string[];
  isConfirmed: boolean;
  userId: {
    fullName: string;
    email: string;
  };
  // Add other fields as needed
}

const PlaceService = {
  create: async (placeData: CreatePlaceDto) => {
    try {
      const response = await axios.post(`${API_URL}/places`, placeData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: Error | any) {
      throw error.response
        ? error.response.data
        : new Error("An error occurred while creating the place");
    }
  },

  findAll: async () => {
    try {
      const response = await axios.get<Place[]>(`${API_URL}/places`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: Error | any) {
      throw error.response
        ? error.response.data
        : new Error("An error occurred while fetching places");
    }
  },

  findOne: async (id: string) => {
    try {
      const response = await axios.get<Place>(`${API_URL}/places/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: Error | any) {
      throw error.response
        ? error.response.data
        : new Error("An error occurred while fetching the place");
    }
  },

  update: async (id: string, updateData: UpdatePlaceDto) => {
    try {
      const response = await axios.patch<Place>(
        `${API_URL}/places/${id}`,
        updateData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: Error | any) {
      throw error.response
        ? error.response.data
        : new Error("An error occurred while updating the place");
    }
  },

  remove: async (id: string) => {
    try {
      const response = await axios.delete(`${API_URL}/places/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: Error | any) {
      throw error.response
        ? error.response.data
        : new Error("An error occurred while deleting the place");
    }
  },
};

export default PlaceService;
