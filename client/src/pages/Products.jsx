import React, { useEffect, useState } from 'react'
import { useAppcontext } from '../context/appcontext'
import Productcard from '../components/Productcard'
function Products() {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const { searchquery, products } = useAppcontext();
    useEffect(() => {
        if (searchquery.length > 0) {
            setFilteredProducts(products.filter(
                product => product.name.toLowerCase().includes(searchquery.toLowerCase())));
        }
        else {
            setFilteredProducts(products);
        }
    }, [products, searchquery])
    return (
        <div className='mt-16 flex flex-col'>
            <div className='flex flex-col items-end w-max'>
                <p className='text-2xl font medium'>ALL PRODUCTS</p>
                <div className='w-16 h-0.5 bg-primary rounded-full'></div>
            </div>


            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 lg:grid-cols-5 mt-6'>
                {filteredProducts.filter(product => product.inStock).map((product, index) => (
                    <Productcard key={index} product={product} />
                ))}
            </div>
        </div>
    )
}

export default Products
