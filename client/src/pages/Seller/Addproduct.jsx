import React from 'react'
import image from "../../assets/upload_area.png"
import { categories } from '../../assets/assets';
import { useAppcontext } from '../../context/appcontext';
import toast from 'react-hot-toast';
function Addproduct() {
    const [files, setfiles] = React.useState([]);
    const [name, setname] = React.useState("");
    const [description, setdescription] = React.useState("");
    const [category, setcategory] = React.useState("");
    const [price, setprice] = React.useState(0);
    const [offerPrice, setofferPrice] = React.useState(0);
    const { axios } = useAppcontext();
    const submithandler = async (event) => {
        try {
            event.preventDefault();
            const productdata = {
                name,
                category,
                price,
                offerPrice,
                description: description.split('\n')
            }
            const formdata = new FormData();
            formdata.append('productdata', JSON.stringify(productdata));
            for (let i = 0; i < files.length; i++)
                formdata.append('images', files[i]);
            const { data } = await axios.post('/api/product/add', formdata);
            if (data.success) {
                toast.success(data.message);
                setcategory('');
                setdescription('');
                setprice('');
                setofferPrice('');
                setname('');
                setfiles([]);
            }
            else
                toast.error(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    }
    return (
        <div className="no-scrollbar flex flex-col justify-between flex-1 h-[95vh] overflow-y-scroll">
            <form onSubmit={submithandler} className="md:p-10 p-4 space-y-5 max-w-lg">
                <div>
                    <p className="text-base font-medium">Product Image</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                        {Array(4).fill('').map((_, index) => (
                            <label key={index} htmlFor={`image${index}`}>
                                <input onChange={(e) => {
                                    const updatedFiles = [...files];
                                    updatedFiles[index] = e.target.files[0];
                                    setfiles(updatedFiles);
                                }}
                                    type="file" id={`image${index}`} hidden />
                                <img className="max-w-24 cursor-pointer" src={files[index] ? URL.createObjectURL(files[index]) : image} alt="uploadArea" width={100} height={100} />
                            </label>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-name">Product Name</label>
                    <input
                        onChange={(e) => setname(e.target.value)} value={name}
                        id="product-name" type="text" placeholder="Type here" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                </div>
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-description">Product Description</label>
                    <textarea
                        onChange={(e) => setdescription(e.target.value)} value={description}
                        id="product-description" rows={4} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none" placeholder="Type here"></textarea>
                </div>
                <div className="w-full flex flex-col gap-1">
                    <label className="text-base font-medium" htmlFor="category">Category</label>
                    <select
                        onChange={(e) => setcategory(e.target.value)} value={category}
                        id="category" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40">
                        <option value="">Select Category</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category.path}>{category.path}</option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center gap-5 flex-wrap">
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="product-price">Product Price</label>
                        <input
                            onChange={(e) => setprice(e.target.value)} value={price}
                            id="product-price" type="number" placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                    </div>
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="offer-price">Offer Price</label>
                        <input
                            onChange={(e) => setofferPrice(e.target.value)} value={offerPrice}
                            id="offer-price" type="number" placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                    </div>
                </div>
                <button className="px-8 py-2.5 bg-primary cursor-pointer hover:bg-primary-dull text-white font-medium rounded">ADD</button>
            </form>
        </div>
    );
}

export default Addproduct
