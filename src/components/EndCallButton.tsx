'use client'

import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"

type Props = {}
const EndCallButton = (props: Props) => {
    const call=useCall()
    const{useLocalParticipant}=useCallStateHooks()
    const LocalParticipant=useLocalParticipant()
    const isMeetingOwner= LocalParticipant && 
    call?.state.createdBy &&
    LocalParticipant.userId===call.state.createdBy.id
    if(!isMeetingOwner)return null;
    const router=useRouter()
    const endCall=async()=>{
        await call?.endCall
        router.push('/')
    }
  return (
    <Button  onClick={endCall}className="bg-red-500"> 
        End Call for Everyone
    </Button>
  )
}
export default EndCallButton