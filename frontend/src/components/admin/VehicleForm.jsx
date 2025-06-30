import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Upload } from 'lucide-react';

const VehicleForm = ({ onSubmit, initialData, onCancel }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const onSubmitHandler = (data) => {
    const formData = new FormData();
    
    // Append image file if selected
    if (selectedImage) {
      formData.append('images', selectedImage);
    }
    
    // Append other fields
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Brand</label>
          <input
            {...register('brand', { required: 'Brand is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.brand && <span className="text-red-500 text-sm">{errors.brand.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Vehicle Name</label>
          <input
            {...register('name', { required: 'Name is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select
            {...register('type', { required: 'Type is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select type</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Convertible">Convertible</option>
          </select>
          {errors.type && <span className="text-red-500 text-sm">{errors.type.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Price per Day ($)</label>
          <input
            type="number"
            {...register('pricePerDay', { 
              required: 'Price is required',
              min: { value: 1, message: 'Price must be at least $1' }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.pricePerDay && <span className="text-red-500 text-sm">{errors.pricePerDay.message}</span>}
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            {...register('description', { required: 'Description is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows="3"
          />
          {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Availability</label>
          <select
            {...register('available', { required: 'Availability is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value={true}>Available</option>
            <option value={false}>Not Available</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Vehicle Image</label>
          <div className="mt-1 flex items-center">
            <label className="flex cursor-pointer items-center space-x-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
              <Upload size={16} />
              <span>{selectedImage ? selectedImage.name : 'Upload Image'}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
        >
          {initialData ? 'Update Vehicle' : 'Create Vehicle'}
        </button>
      </div>
    </form>
  );
};

export default VehicleForm;