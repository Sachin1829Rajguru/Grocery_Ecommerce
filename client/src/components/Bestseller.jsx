import React from 'react'
import Productcard from './Productcard'
import { ToastContainer } from 'react-toastify';
import { useAppcontext } from '../context/appcontext';
function Bestseller() {
  const { products } = useAppcontext();
  return (
    <div className="mt 16">
      <p className="text-2xl md:text-3xl font-medium">Best Sellers</p>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 lg:grid-cols-5 mt-6'>
        {products.filter(product => product.inStock).slice(0, 5).map((product, index) => (
          <Productcard key={index} product={product} />
        ))}
      </div>
    </div>
  )
}

export default Bestseller
