import { useState } from "react";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password:""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   const{firstName,lastName,password}=formData;
   if(!firstName || !lastName || !password){
    return;
   }
   try{
    const url = 'http://localhost:8080/auth/signup'
    const response = await fetch(url,
         {
          method:'POST',
          headers:{
            'content-Type':'application/json'
          },
          body:JSON.stringify(formData)
         }
    )
    const result = await response.json()
     console.log(result)
   } catch(error){
      console.log("signup error :",error)
   }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">Create an account</h2>
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
            type="text" 
            name="firstName" 
            placeholder="Legal first name" 
            value={formData.firstName} 
            onChange={handleChange} 
            className="w-1/2 p-2 border rounded mb-2" 
            required
          />
          <input 
            type="text" 
            name="lastName" 
            placeholder="Legal last name" 
            value={formData.lastName} 
            onChange={handleChange} 
            className="w-1/2 p-2 border rounded mb-2" 
            required
          />

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
