import { useEffect, useState } from "react";

export const useAddToCart = (products) =>{
    const [userDatas,setUserData] = useState({});
    const [loadings,setLoading] = useState(false);
    const [errors,setError] = useState();
    const apiUrl = import.meta.env.VITE_API_URL

    useEffect(() =>{
        // console.log('Fetching data');
        const controller = new AbortController();
        const asyncFetch =async() =>{
            try{
                const response =await fetch(`${apiUrl}/api/v1/cart/677d11f3fbb51c2146710501`, {
                    signal: controller.signal,
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({products})
                })
                setLoading(true);
                const data = await response.json();
                setUserData(data);
                // console.log(userData)
                setError(undefined)
                setTimeout(()=>{
                    setLoading(false);
                },200)
            }catch(error){
                setLoading(true);
                // console.log(`There is an error: ${error.message}`)
                const data = {products:{message:'error',successful:false}};
                // console.log(data);
                setUserData(data);
                setError(error.message);
                setTimeout(()=>{
                    setLoading(false);
                },2000)
            }
        };
        asyncFetch();//Async Wrapper
        return ()=>{//This is a cleanup function
            setLoading(true);
            // console.log('Unmounting the custom useEffect Fetch');
            setTimeout(()=>{
                setLoading(false);
            },2000)
            controller.abort();
        }
    },[products]);
    return {userDatas,loadings,errors};
}