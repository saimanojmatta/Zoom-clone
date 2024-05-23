import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useEffect, useState } from "react"

export const useGetCallById=(id:string|string[])=>{
    const [call, setCall] = useState<Call>()
    const[isCallLoading,setIsCallLoading]=useState(true)
    const client=useStreamVideoClient()
    // console.log(call)
    useEffect(()=>{
        if(!client) return ;
        const loadCall=async()=>{
            try{
                const {calls}=await client.queryCalls({
                    filter_conditions:{id},
                })
                if(calls.length>0)setCall(calls[0])
                setIsCallLoading(true)
            }catch(err){
                console.log(err)
                setIsCallLoading(false)
            }
        }
        loadCall()
    },[id,client])
    return{call,isCallLoading}
}