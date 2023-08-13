import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useSeller = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const {data:isSeller,isLoading:isSellerLoading } = useQuery({
        queryKey: ['isSeller', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/seller/${user?.email}`);
            // console.log('is instructor response', res);
            return res.data.seller
        }
    })
    return[isSeller,isSellerLoading]
}

export default useSeller;