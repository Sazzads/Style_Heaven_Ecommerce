import { useQuery } from "@tanstack/react-query";
import CategoryCard from "../Home/Home/Category/CategoryCard";
import { Link } from "react-router-dom";



const New = () => {
    const { refetch, data: newProducts = [] } = useQuery({
        queryKey: ['newProducts'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/productsapproved/approved`)
            return res.json()
        }
    })
    // console.log(newProducts);
    const newProductsSlice = newProducts.slice(0, 20)
    // console.log(newProductsSlice);
    return (
        <div className='max-w-screen-xl mx-auto my-10'>
            <div>
                <h3 className="text-5xl text-center my-5">New Products</h3>
            </div>
            <div className='grid md:grid-cols-4 gap-10 mb-5'>
                {
                    newProductsSlice.map((newproduct) => {
                        return (
                            <div key={newproduct._id} >
                                <CategoryCard item={newproduct}></CategoryCard>
                            </div>
                        )
                    })
                }
            </div>
            <div className='flex items-center flex-col'>
                <Link className='btn btn-outline border-0 border-b-4 mt-4 bg-pink-600 px-10' to='/allproducts'> <span className='text-white'>see All Products</span> </Link>
            </div>
        </div>
    );
};

export default New;