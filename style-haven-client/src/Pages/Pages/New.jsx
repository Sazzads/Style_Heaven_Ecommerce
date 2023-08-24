import { useQuery } from "@tanstack/react-query";
import CategoryCard from "../Home/Home/Category/CategoryCard";


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
            
        </div>
    );
};

export default New;