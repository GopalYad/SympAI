import { useState } from "react";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    email: "",
    password:""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData)
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
  
    if (!email || !password) {
      console.log("Email and password are required");
      return;
    }
  
    try {
      const url = "http://localhost:8080/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      // Detect response type
      const contentType = response.headers.get("content-type");
      let result;
      
      if (contentType && contentType.includes("application/json")) {
        result = await response.json();
      } else {
        result = await response.text(); // Handle plain text response
      }
  
      console.log(result);
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={formData.email} 
          onChange={handleChange} 
          className="w-full p-2 border rounded mb-2" 
          required
        />
        <div className="flex space-x-2">
        
<input 
          type="password" 
          name="password" 
          placeholder="password" 
          value={formData.password} 
          onChange={handleChange} 
          className="w-full p-2 border rounded mb-2" 
          required
        />
        </div>
 
        <button 
          type="submit" 
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-white py-2 rounded"
        >
          Continue
        </button>
        <div className="text-center my-2">or</div>
        <button 
          type="button" 
          className="w-full flex justify-center items-center border py-2 rounded mb-2"
        >
          Continue with Google
        </button>
        <button 
          type="button" 
          className="w-full flex justify-center items-center border py-2 rounded"
        >
          Continue with Apple
        </button>
        <p className="text-center mt-4 text-sm">
          Already have an account? <a href="#" className="text-blue-500">Log in</a>
        </p>
      </form>
    </div>
  );
}
