import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useUserInfo = () => {
    const { user, loading } = useAuth()
    const [axiosSecure] = useAxiosSecure();

    const { refetch, data: userInfo = []} = useQuery({
        queryKey: ['userInfo', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure(`/users/userInfo/${user?.email}`)
            return res.data;
        },
    })
    return [userInfo, refetch]
}

export default useUserInfo;