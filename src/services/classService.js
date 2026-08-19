import axios from "axios";

const API_URL_COURSES = "http://localhost:9000/courses";
export const fetchClassesAPI = async () => {
  try {
    const response = await axios.get(API_URL_COURSES);
    if (
      response.data &&
      Array.isArray(response.data) &&
      response.data.length > 0
    ) {
      return response.data;
    }
  } catch (err) {
    console.warn(
      "API json-server fetch failed, attempting local public / database fetch fallback.",
    );
  }

  try {
    const localRes = await axios.get("/database.json");
    if (localRes.data && localRes.data.courses) {
      return localRes.data.courses;
    }
  } catch (err) {
    console.warn("Local database fetch failed.");
  }

  return [];
};


export const addClassesAPI = async (newCourse) => {
  try {
    const response = await axios.post(API_URL_COURSES, newCourse);
    return response.data;
  } catch (err) {
    return { ...newCourse, id: String(Date.now()) };
  }
};

export const updateClassAPI = async (id, updateCourse) => {
  try {
    const response = await axios.put(`${API_URL_COURSES}/${id}`, updateCourse);
    return response.data;
  } catch (err) {
    return { ...updateCourse, id };
  }
};

export const deleteClassAPI = async (id) => {
  try {
    await axios.delete(`${API_URL_COURSES}/${id}`);
  } catch (err) {
    console.warn("API delete failed");
  }
  return id;
};
