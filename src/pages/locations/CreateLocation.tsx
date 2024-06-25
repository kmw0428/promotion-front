import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createLocation, uploadLocationImage } from '../../services/api';

const CreateLocation: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [locationId, setLocationId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  // Location 생성 핸들러
  const handleLocationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const locationData = await createLocation({ name, description });
      setLocationId(locationData.id);
      alert('Location created successfully! Now upload an image.');
    } catch (error) {
      console.error('Failed to create location:', error);
    } finally {
      setLoading(false);
    }
  };

  // 이미지 업로드 핸들러
  const handleImageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image || !locationId) {
      alert('No image or location ID provided');
      return;
    }
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('image', image);

      await uploadLocationImage(locationId, formData);
      alert('Image uploaded successfully!');
      navigate('/locations');
    } catch (error) {
      console.error('Failed to upload image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleLocationSubmit}>
        <h2>Create Location</h2>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Location'}
        </button>
      </form>
      {locationId && (
        <form onSubmit={handleImageSubmit}>
          <h2>Upload Image</h2>
          <div>
            <label htmlFor="image">Image</label>
            <input
              type="file"
              id="image"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Uploading...' : 'Upload Image'}
          </button>
        </form>
      )}
    </>
  );
};

export default CreateLocation;
