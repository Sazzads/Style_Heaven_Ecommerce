
import UseAcceptProducts from '../../hooks/UseAcceptProducts';
import CategoryCard from '../Home/Home/Category/CategoryCard';

const AllProducts = () => {
    const [acceptProducts] = UseAcceptProducts();
    // console.log(acceptProducts);

    return (
        <div className='max-w-screen-xl mx-auto my-10'>
            <div>
                <h3 className="text-5xl text-center my-5">All Products</h3>
            </div>
            <div className='grid md:grid-cols-3 gap-10 mb-5'>
                {acceptProducts.map(item => {
                    return (
                        <div key={item._id} >
                            <CategoryCard  item={item}></CategoryCard>

                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default AllProducts;