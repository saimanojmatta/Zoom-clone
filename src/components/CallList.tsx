'use client'
import { useGetCalls } from "@/hooks/useGetcalls"
import { Call, CallRecording } from "@stream-io/video-react-sdk"
import { useEffect, useState } from "react"
import MeetingCard from "./MeetingCard"
import { useRouter } from "next/navigation"
import Loader from "./Loader"

type Props = {
    type:'ended'|"upcoming"|"recordings"
}
const CallList = ({type}: Props) => {
    const router=useRouter()
    const{endedCalls,upcomingCalls,callRecordings,isLoading}=useGetCalls()
    const[recordings,setRecordings]=useState<CallRecording[]>([])
    // console.log(recordings)
    const getCalls=()=>{
        switch(type){
            case "ended":
                return endedCalls
            case "upcoming":
                return upcomingCalls
            case "recordings":
                return recordings
            default:
                return []
        }   
    }
    const getNOCallsMessage=()=>{
        switch(type){
            case "ended":
                return "No previous Calls"
            case "upcoming":
                return "No upcoming Calls"
            case "recordings":
                return "No Recordings"
            default:
                return ""
        }   
    }
    useEffect(()=>{
        const fetchRecordings=async()=>{
                const callData=await Promise.all(
                    callRecordings?.map((meeting)=>meeting.queryRecordings())??[],
                );
                const recordings=callData
                .filter((call)=>call.recordings.length>0)
                .flatMap((call)=>call.recordings)
                setRecordings(recordings)
        }
        if(type==='recordings'){
            fetchRecordings()
        }
    },[type,callRecordings])
    const calls=getCalls()
    // console.log((calls[0] as CallRecording)?.start_time)
    const noCallMessage=getNOCallsMessage()
    if(isLoading) return <Loader/>
  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {calls && calls.length>0?(
            calls.map((meeting:Call|CallRecording)=>{
                console.log((meeting as CallRecording).start_time)
                // console.log((meeting as Call).state?.startsAt)
                return(
                    <MeetingCard key={(meeting as Call).id} icon={
                        type==="ended"
                        ?'/icons/previous.svg'
                        :type==='upcoming'
                        ?'/icons/upcoming.svg'
                        :'/icons/recordings.svg'
                        } 
                    title={
                        (meeting as Call).state?.custom.description||(meeting as CallRecording).filename?.substring(0,20)||"Personal Room"
                    }
                    date={
                        (meeting as Call).state?.startsAt?.toLocaleString() ||
                        (meeting as CallRecording)?. start_time.toLocaleString().split('T')[0]
                    }
                    isPreviousMeeting={type === 'ended'}
                    link={
                        type === 'recordings'
                          ? (meeting as CallRecording).url
                          : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`
                        }
                    buttonIcon1={type === 'recordings' ? '/icons/play.svg' : undefined}
                    buttonText={type === 'recordings' ? 'Play' : 'Start'}
                    handleClick={
                        type === 'recordings'
                        ? () => router.push(`${(meeting as CallRecording).url}`)
                        : () => router.push(`/meeting/${(meeting as Call).id}`)
                    }
                    />
                )}
                
                )
        ):(
            <h1 className="text-2xl font-bold " >{noCallMessage}</h1>
        )
    }
    </div>
  )
}
export default CallList