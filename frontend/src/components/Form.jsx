import { useState } from "react";
import axios from "axios";

const Form = () => {
  
  const [formData, setFormData] = useState({
    Nitrogen: "",
    Phosphorus: "",
    Potassium: "",
    temperature: "",
    humidity: "",
    pH: "",
    rainfall: "",
  });

  const [prediction, setPrediction] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Making the POST request using Axios
      const response = await axios.post(
        `${import.meta.env.FLASK_API_URL}`,
        formData, // Passing the form data as the body
        {
          headers: {
            "Content-Type": "application/json", // Setting JSON headers
          },
        }
      );

      // Extracting prediction from the response
      if (response.data && response.data.prediction) {
        setPrediction(response.data.prediction);
      } else {
        setPrediction("No prediction received.");
      }
    } catch (error) {
      console.error("Error:", error);
      setPrediction("Error fetching prediction.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-green-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
          🌾 Crop Prediction 🌾
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nitrogen */}
          <div>
            <label
              htmlFor="Nitrogen"
              className="block text-lg font-medium text-gray-700"
            >
              Nitrogen (N<sub>2</sub>)
            </label>
            <input
              type="number"
              id="Nitrogen"
              name="Nitrogen"
              value={formData.Nitrogen}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Phosphorus */}
          <div>
            <label
              htmlFor="Phosphorus"
              className="block text-lg font-medium text-gray-700"
            >
              Phosphorus (Ph)
            </label>
            <input
              type="number"
              id="Phosphorus"
              name="Phosphorus"
              value={formData.Phosphorus}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Potassium */}
          <div>
            <label
              htmlFor="Potassium"
              className="block text-lg font-medium text-gray-700"
            >
              Potassium (K)
            </label>
            <input
              type="number"
              id="Potassium"
              name="Potassium"
              value={formData.Potassium}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Temperature */}
          <div>
            <label
              htmlFor="temperature"
              className="block text-lg font-medium text-gray-700"
            >
              Temperature (°C)
            </label>
            <input
              type="number"
              id="temperature"
              name="temperature"
              value={formData.temperature}
              onChange={handleChange}
              required
              step="0.1"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Humidity */}
          <div>
            <label
              htmlFor="humidity"
              className="block text-lg font-medium text-gray-700"
            >
              Humidity (%)
            </label>
            <input
              type="number"
              id="humidity"
              name="humidity"
              value={formData.humidity}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* pH */}
          <div>
            <label
              htmlFor="pH"
              className="block text-lg font-medium text-gray-700"
            >
              pH
            </label>
            <input
              type="number"
              id="pH"
              name="pH"
              value={formData.pH}
              onChange={handleChange}
              required
              step="0.1"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Rainfall */}
          <div>
            <label
              htmlFor="rainfall"
              className="block text-lg font-medium text-gray-700"
            >
              Rainfall (mm)
            </label>
            <input
              type="number"
              id="rainfall"
              name="rainfall"
              value={formData.rainfall}
              onChange={handleChange}
              required
              step="0.1"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition"
          >
            Predict
          </button>
        </form>
        {prediction && (
          <p className="text-center mt-6 text-lg text-green-700 font-semibold">
            Prediction: {prediction}
          </p>
        )}
      </div>
    </div>
  );
};

export default Form;
