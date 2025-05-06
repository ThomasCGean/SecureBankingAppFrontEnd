// SecureBankingAppFrontEnd/src/pages/ProfileEdit.jsx
import { useState, useEffect } from 'react';
import { get, put } from 'aws-amplify/api';
import { useUser } from '../context/UserContext';
import awsExports from '../aws-exports';

export default function ProfileEdit() {
  const { user, loadingUser } = useUser();
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  const userId = user?.username;

  useEffect(() => {
    console.log("[ProfileEdit] useEffect fired");
    console.log("  - loadingUser:", loadingUser);
    console.log("  - userId (from user.username):", userId);

    if (!loadingUser && userId) {
      fetchProfile();
    }
  }, [loadingUser, userId]);

  async function fetchProfile() {
    try {
      console.log("[ProfileEdit] Fetching profile for userId:", userId);

      const restOperation = get({
        apiName: 'FinalhttpAPILambda',
        path: '/profile',
      });

      const response = await restOperation.response;
      const data = await response.body.json();

      console.log("[ProfileEdit] API Response Data:", data);

      setProfile(data);
      setFormData(data);
      setLoading(false);
    } catch (err) {
      console.error("[ProfileEdit] Failed to load profile:", err);
      setMessage('Error loading profile.');
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log("[ProfileEdit] Submitting updated profile data:", formData);

      const restOperation = put({
        apiName: 'FinalhttpAPILambda',
        path: '/profile',
        options: {
          body: formData
        }
      });

      await restOperation.response;
      setMessage('Profile updated successfully.');
    } catch (err) {
      console.error("[ProfileEdit] Failed to update profile:", err);
      setMessage('Error updating profile.');
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  if (loadingUser || loading) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
      {message && <p className="mb-2 text-blue-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input name="FirstName" value={formData.FirstName || ''} onChange={handleChange} placeholder="First Name" className="w-full border p-2 rounded" />
        <input name="LastName" value={formData.LastName || ''} onChange={handleChange} placeholder="Last Name" className="w-full border p-2 rounded" />
        <input name="Email" value={formData.Email || ''} onChange={handleChange} placeholder="Email" className="w-full border p-2 rounded" />
        <input name="PhoneNumber" value={formData.PhoneNumber || ''} onChange={handleChange} placeholder="Phone Number" className="w-full border p-2 rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update Profile</button>
      </form>
    </div>
  );
}
