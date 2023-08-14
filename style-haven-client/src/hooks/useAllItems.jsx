import { useQuery } from "@tanstack/react-query"
// import { useEffect, useState } from "react"

const useAllItems = () => {
    // const [allItems, setAllItems] = useState([])
    // const [loading, setLoading] = useState(true)
    // useEffect(() => {
    //     fetch('http://localhost:5000/products')
    //         .then(res => res.json())
    //         .then(data => {
    //             setAllItems(data)
    //             setLoading(false)
    //         })
    // }, [])
    const { data: allItems = [], isLoading: loading } = useQuery({
        queryKey: ['allItems'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/products');
            return res.json();
        }
    })

    return [allItems, loading]
}

export default useAllItems