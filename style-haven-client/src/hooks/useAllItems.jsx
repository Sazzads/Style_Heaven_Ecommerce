import { useQuery } from "@tanstack/react-query"
// import { useEffect, useState } from "react"
 
const useAllItems = () => {
    // const [allItems, setAllItems] = useState([])
    // const [loading, setLoading] = useState(true)
    // useEffect(() => {
    //     fetch('https://style-haven-server.vercel.app/products')
    //         .then(res => res.json())
    //         .then(data => {
    //             setAllItems(data)
    //             setLoading(false)
    //         })
    // }, [])
    const {refetch, data: allItems = [], isLoading: loading } = useQuery({
        queryKey: ['allItems'],
        queryFn: async () => {
            const res = await fetch('https://style-haven-server.vercel.app/products');
            return res.json();
        }
    })

    return [allItems,refetch,, loading]
}

export default useAllItems