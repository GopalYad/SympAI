// src/components/PatientForm.jsx
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

export default function PatientForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    gender: '',
    maritalStatus: '',
    email: '',
    contactNumber: '',
    emergencyContact: '',
    address: '',
    occupation: '',

    reasonForVisit: '',
    symptoms: '',
    durationOfSymptoms: '',
    medicalHistory: '',
    surgicalHistory: '',
    allergies: '',
    currentMedications: '',

    idType: '',
    idNumber: '',
    insuranceProvider: '',
    insuranceNumber: '',
    referringDoctor: '',
    preferredPharmacy: '',

    consentGiven: false,
    privacyPolicyAccepted: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted! Check console for data.");
    console.log(formData);
  };

  const Section = ({ title, children }) => (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
      <h3 className="text-lg font-semibold mb-4 text-blue-700">{title}</h3>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">{children}</div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <Card className="w-full max-w-5xl shadow-xl rounded-2xl">
        <CardContent className="p-8 space-y-8">
          <h2 className="text-3xl font-bold text-center text-blue-900">Patient Registration Form 🏥</h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <Section title="Personal Information">
              <Input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" required />
              <Input name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} placeholder="Date of Birth" required />
              <Input name="gender" value={formData.gender} onChange={handleChange} placeholder="Gender" required />
              <Input name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} placeholder="Marital Status" />
              <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email Address" />
              <Input name="contactNumber" value={formData.contactNumber} onChange={handleChange} placeholder="Contact Number" required />
              <Input name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} placeholder="Emergency Contact" />
              <Input name="occupation" value={formData.occupation} onChange={handleChange} placeholder="Occupation" />
              <Textarea name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="col-span-2" required />
            </Section>

            {/* Medical Information */}
            <Section title="Medical Information">
              <Textarea name="reasonForVisit" value={formData.reasonForVisit} onChange={handleChange} placeholder="Reason for Visit" className="col-span-2" required />
              <Textarea name="symptoms" value={formData.symptoms} onChange={handleChange} placeholder="Describe your symptoms" className="col-span-2" />
              <Input name="durationOfSymptoms" value={formData.durationOfSymptoms} onChange={handleChange} placeholder="Duration of Symptoms (e.g., 3 days)" />
              <Textarea name="medicalHistory" value={formData.medicalHistory} onChange={handleChange} placeholder="Past Medical History" className="col-span-2" />
              <Textarea name="surgicalHistory" value={formData.surgicalHistory} onChange={handleChange} placeholder="Surgical History" className="col-span-2" />
              <Input name="allergies" value={formData.allergies} onChange={handleChange} placeholder="Known Allergies" />
              <Input name="currentMedications" value={formData.currentMedications} onChange={handleChange} placeholder="Current Medications" />
            </Section>

            {/* Identification / Verification */}
            <Section title="Identification / Verification">
              <Input name="idType" value={formData.idType} onChange={handleChange} placeholder="ID Type (e.g., Aadhar, PAN)" />
              <Input name="idNumber" value={formData.idNumber} onChange={handleChange} placeholder="ID Number" />
              <Input name="insuranceProvider" value={formData.insuranceProvider} onChange={handleChange} placeholder="Insurance Provider (if any)" />
              <Input name="insuranceNumber" value={formData.insuranceNumber} onChange={handleChange} placeholder="Insurance Number" />
              <Input name="referringDoctor" value={formData.referringDoctor} onChange={handleChange} placeholder="Referring Doctor (if any)" />
              <Input name="preferredPharmacy" value={formData.preferredPharmacy} onChange={handleChange} placeholder="Preferred Pharmacy" />
            </Section>

            {/* Consents and Privacy */}
            <Section title="Consent and Privacy">
              <label className="flex items-center space-x-3 col-span-2">
                <input type="checkbox" name="consentGiven" checked={formData.consentGiven} onChange={handleChange} />
                <span>I consent to receive medical treatment.</span>
              </label>
              <label className="flex items-center space-x-3 col-span-2">
                <input type="checkbox" name="privacyPolicyAccepted" checked={formData.privacyPolicyAccepted} onChange={handleChange} />
                <span>I agree to the privacy policy.</span>
              </label>
            </Section>

            <div className="text-center">
              <Button type="submit" className="px-10 py-3 text-lg rounded-xl">Submit</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
