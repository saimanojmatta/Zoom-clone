'use client'
import MeetingRoom from "@/components/MeetingRoom"
import MeetingSetup from "@/components/MeetingSetup"
import { useGetCallById } from "@/hooks/GetCallbyId"
import { useUser } from "@clerk/nextjs"
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk"
import { useState } from "react"
type Props = {}
const MeetingPage = ({params:{id}}: {params:{id:string}}) => {
  const{user,isLoaded}=useUser()
  const [IsSetupComplete, setIsSetupComplete] = useState(false)
  const{call,isCallLoading}=useGetCallById(id)
  if(!isCallLoading||!call)return ;
  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!IsSetupComplete?(
            <MeetingSetup setIsSetupComplete={setIsSetupComplete}/>
          ):(
            <MeetingRoom/>
          )
          
          }
        </StreamTheme>
      </StreamCall>

    </main>
  )
}
export default MeetingPage