import {  useState } from "react";
export const ChangeDel = (productId,option) =>{
    const [userDatas,setUserData] = useState({});
    const [loadings,setLoading] = useState(false);
    const [errors,setError] = useState();

    
        console.log('Fetching data');
        const controller = new AbortController();
        const asyncFetch =async() =>{
            try{
                const response =await fetch(`http://localhost:7004/api/v1/changedel/677d11f3fbb51c2146710501/${productId}/${option}`, {
                    signal: controller.signal,
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
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
                console.log(`There is an error: ${error.message}`)
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
    
    return {userDatas,loadings,errors};
}