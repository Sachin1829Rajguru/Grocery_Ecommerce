import React from 'react'
import { useAppcontext } from '../context/appcontext'
import { categories } from '../assets/assets';
import { useParams } from 'react-router-dom';
import Productcard from '../components/Productcard';
function Productcategory() {
    const { products } = useAppcontext();
    const { category } = useParams();
    const searchcategory = categories.find(item => item.path.toLowerCase() === category.toLowerCase());
    const filteredProducts = products.filter(product => product.category.toLowerCase() === category.toLowerCase());
    return (
        <div className='mt-16'>
            {searchcategory && (
                <div className='flex flex-col items-end w-max'>
                    <p className='text-2xl font-medium'>
                        {searchcategory.text.toUpperCase()}
                    </p>
                    <div className="w-16 h-0.5 bg-primary rounded-full"></div>
                </div>
            )}
            {filteredProducts.length > 0 ? (
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 lg:grid-cols-5 mt-6'>
                    {filteredProducts.map((product, index) => (
                        <Productcard key={index} product={product} />
                    ))}
                </div>
            ) : (
                <div className='flex items-center justify-center h-[60vh]'>
                    <p className='text-2xl font-medium text-primary'>
                        No products found in this category.
                    </p>
                </div>

            )
            }
        </div>
    )
}

export default Productcategory
