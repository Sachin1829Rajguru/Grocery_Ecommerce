import React, { useEffect, useState } from 'react';
import image from '../assets/add_address_image.svg';
import { useAppcontext } from '../context/appcontext';
import toast from 'react-hot-toast';

function Address() {
  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });
  const { axios, navigate, user } = useAppcontext();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onsubmithandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/address/add', { address });
      if (data.success) {
        toast.success(data.message);
        navigate('/cart');
      }
      else
        toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (!user)
      navigate('/cart');
  }, [])
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left - Form */}
        <div className="bg-white shadow-xl rounded-2xl p-10 -mt-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-10">
            Add Shipping <span className="text-primary-dull">Address</span>
          </h2>
          <form className="space-y-6" onSubmit={onsubmithandler}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                value={address.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="input"
                required
              />
              <input
                type="text"
                name="lastName"
                value={address.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="input"
                required
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={address.email}
                onChange={handleChange}
                placeholder="Email address"
                className="input"
                required
              />
            </div>
            <input
              type="text"
              name="street"
              value={address.street}
              onChange={handleChange}
              placeholder="Street"
              className="input"
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="city"
                value={address.city}
                onChange={handleChange}
                placeholder="City"
                className="input"
                required
              />
              <input
                type="text"
                name="state"
                value={address.state}
                onChange={handleChange}
                placeholder="State"
                className="input"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="zipcode"
                value={address.zipcode}
                onChange={handleChange}
                placeholder="Zip code"
                className="input"
                required
              />
              <input
                type="text"
                name="country"
                value={address.country}
                onChange={handleChange}
                placeholder="Country"
                className="input"
                required
              />
            </div>
            <input
              type="tel"
              name="phone"
              value={address.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="input"
              required
            />
            <button
              type="submit"
              className="w-full py-3 px-6 bg-primary text-white font-semibold rounded-xl shadow hover:bg-primary-dull transition duration-200"
            >
              SAVE ADDRESS
            </button>
          </form>
        </div>

        {/* Right - Image */}
        <div className="hidden md:flex justify-center">
          <img
            src={image}
            alt="Shipping Illustration"
            className="w-[80%] max-h-[500px] object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default Address;
