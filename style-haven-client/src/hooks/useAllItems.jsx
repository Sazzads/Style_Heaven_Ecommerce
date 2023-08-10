import { useEffect, useState } from "react"

const useAllItems = () => {
    const [allItems, setAllItems] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetch('menu.json')
            .then(res => res.json())
            .then(data => {
                setAllItems(data)
                setLoading(false)
            })
    }, [])
    return [allItems, loading]
}

export default useAllItems