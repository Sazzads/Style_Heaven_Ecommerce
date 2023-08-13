import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const UseCustomer = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { data: isCustomer, isLoading: isCustomerLoading } = useQuery({
        queryKey: ['isCustomer', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/customer/${user?.email}`);
            // console.log('is Student response', res);
            return res.data.customer
        }
    })
    return [isCustomer, isCustomerLoading]
}

export default UseCustomer;