'use client'
import { DeviceSettings, VideoPreview, useCall, useCallStateHooks } from "@stream-io/video-react-sdk"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import Alert from "./Alert"

type Props = {
    setIsSetupComplete:(value:boolean)=>void
}
const MeetingSetup = ({setIsSetupComplete}: Props) => {
    const [ISMicCamToggled, setISMicCamToggled] = useState(false)
    const call=useCall()
    if(!call)throw new Error('UseStreamCall must be used within a streamCall component')
    const{useCallEndedAt,useCallStartedAt}=useCallStateHooks()
    const callStartsAt=useCallStartedAt()
    const callEndedAt=useCallEndedAt()
    // console.log(callStarsAt,useCallEndedAt)
    const callTimeNotArrived=callStartsAt&& new Date(callStartsAt) > new Date()
    const callHasEnded=!!callEndedAt
    useEffect(()=>{
        if(ISMicCamToggled){
            call?.camera.disable()
            call?.microphone.disable()
        }else{
            call?.camera.enable()
            call?.microphone.enable()
        }
    },[ISMicCamToggled,call?.camera,call?.microphone])
    
    if (callTimeNotArrived)
        return (
          <Alert
            title={`Your Meeting has not started yet. It is scheduled for ${callStartsAt.toLocaleString()}`}
          />
        );
    if (callHasEnded)
        return (
            <Alert
            title="The call has been ended by the host"
            iconUrl="/icons/call-ended.svg"
            />
        );
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 ">
        <h1 className="text-center text-2xl font-bold">Setup</h1>
        <VideoPreview/>
        <div className="flex h-16 items-center justify-center gap-3">
            <label className="flex items-center justify-center gap-2 font-medium">
                <input type="checkbox" checked={ISMicCamToggled} onChange={(e)=>setISMicCamToggled(e.target.checked)}  />
                Join with mic and camera off
            </label>
            <DeviceSettings/>
        </div>
        <Button className="rounded-md bg-green-500 px-4 py-2.5" onClick={()=>{
            call.join()
            setIsSetupComplete(true)
        }}>
            Join meeting
        </Button>
    </div>
  )
}
export default MeetingSetup