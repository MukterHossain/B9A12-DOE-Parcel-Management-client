import { useEffect, useState } from "react";


const useFeatureMenu = () => {
    const [features, setFeatures] = useState();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('https://y-red-five.vercel.app/features')
        .then(res => res.json())
        .then(data => {
            setFeatures(data)
            setLoading(false)
        })
    }, [])
    // console.log(features)
    return [features, loading]
};

export default useFeatureMenu;