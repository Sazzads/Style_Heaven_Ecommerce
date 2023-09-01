
import { useEffect, useState } from 'react';
import UseAcceptProducts from '../../hooks/UseAcceptProducts';
import CategoryCard from '../Home/Home/Category/CategoryCard';

const AllProducts = () => {
    const [allProducts, setAllProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(0);
    const [acceptProducts] = UseAcceptProducts();
    // console.log(acceptProducts);
    const itemsPerPage = 20;
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`https://style-haven-server.vercel.app/productsapproved?page=${currentPage}&limit=${itemsPerPage}`);
            const data = await response.json();
            setAllProducts(data);
        }
        fetchData();
    }, [currentPage, itemsPerPage]);
    const acceptProductss = acceptProducts.length
    const totalPages = Math.ceil(acceptProductss / itemsPerPage)
    const pageNumbers = [...Array(totalPages).keys()];
    return (
        <div className='max-w-screen-xl mx-auto my-10'>
            <div>
                <h3 className="text-5xl text-center my-5">All Products</h3>
            </div>
            <div className='grid md:grid-cols-4 sm:grid-cols-2 gap-10 mb-5 justify-center'>
                {allProducts.map(item => {
                    return (
                        <div key={item._id} >
                            <CategoryCard item={item}></CategoryCard>
                        </div>
                    )
                })}
            </div>
            <div className='pagination text-center mb-14'>
                Page :
                {
                    pageNumbers.map(number => <button className={currentPage === number ? 'bg-gray-500 mx-1 py-1 my-3 px-5 rounded-md ' : 'mx-1 py-1 px-5 my-3 rounded-md '} key={number} onClick={() => setCurrentPage(number)}>{number + 1}</button>)
                }


            </div>
        </div>
    );
};

export default AllProducts;