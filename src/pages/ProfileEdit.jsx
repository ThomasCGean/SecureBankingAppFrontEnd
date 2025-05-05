// src/pages/ProfileEdit.jsx
import { Amplify } from 'aws-amplify';
import { API } from 'aws-amplify/api';
import awsExports from '../aws-exports';
Amplify.configure(awsExports);


export default function ProfileEdit({ user }) {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  const userId = user?.attributes?.sub;

  useEffect(() => {
    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  async function fetchProfile() {
    try {
      const response = await API.get('SecureBankingAPI', '/profile', {
        queryStringParameters: { user_id: userId }
      });
      setProfile(response);
      setFormData(response);
      setLoading(false);
    } catch (err) {
      console.error('Failed to load profile:', err);
      setMessage('Error loading profile.');
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await API.put('SecureBankingAPI', '/profile', {
        body: formData
      });
      setMessage('Profile updated successfully.');
    } catch (err) {
      console.error('Failed to update profile:', err);
      setMessage('Error updating profile.');
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  if (loading) return <div>Loading profile...</div>;

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
