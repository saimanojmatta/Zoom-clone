'use client'
import Alert from "@/components/Alert"
import Loader from "@/components/Loader"
import MeetingRoom from "@/components/MeetingRoom"
import MeetingSetup from "@/components/MeetingSetup"
import { useGetCallById } from "@/hooks/GetCallbyId"
import { useUser } from "@clerk/nextjs"
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk"
import { useParams } from "next/navigation"
import { useState } from "react"
type Props = {}
const MeetingPage = ({params:{id}}: {params:{id:string}}) => {
  // const { id } = useParams();
  const{user,isLoaded}=useUser()
  const [IsSetupComplete, setIsSetupComplete] = useState(false)
  const{call,isCallLoading}=useGetCallById(id)
  if(!isCallLoading||!call)return <Loader/> ;
  if (!call) return (
    <p className="text-center text-3xl font-bold text-white">
      Call Not Found
    </p>
  );
  const notAllowed = call.type === 'invited' && (!user || !call.state.members.find((m) => m.user.id === user.id));
  if (notAllowed) return <Alert title="You are not allowed to join this meeting" />;

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