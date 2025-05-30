import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../assets/assets';
import { useAppcontext } from '../context/appcontext';


function Categories() {
  const { navigate } = useAppcontext();
  return (
    <div className="px-0 py-10">
      <h2 className="text-3xl font-semibold mb-8">Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm"
            style={{ backgroundColor: category.bgColor }}
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              scrollTo(0, 0);
            }}
          >
            <img
              src={category.image}
              alt={category.text}
              className="h-24 object-contain mb-4"
            />
            <Link
              to={`/products/${category.text.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-')}`}
              className="text-base font-medium text-gray-800 hover:underline"
            >
              {category.text}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
