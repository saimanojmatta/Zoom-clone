'use client'
import { useRouter } from "next/navigation"
import HomeCard from "./HomeCard"
import { ChangeEventHandler, useState } from "react"
import MeetingModal from "./MeetingModal"
import { useUser } from "@clerk/nextjs"
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useToast } from "./ui/use-toast"
import { Textarea } from "./ui/textarea"
import ReactDatePicker from 'react-datepicker';
import Loader from "./Loader"
import { Input } from "./ui/input"
type Props = {}
const initialValues={
  dateTime:new Date(),
  description:'',
  link:''
}
const MeetingTypeList = (props: Props) => {
  const router=useRouter()
  const[meetingState,setMeetingState]=useState<'isScheduleMeeting'|"isJoiningMeeting"|"isInstantMeeting"|undefined>(undefined)
  const[values,setValues]=useState(initialValues)
  const[callDetail,setCallDetail]=useState<Call>()
  const{user}=useUser()
  const client=useStreamVideoClient()
  const{toast}=useToast()
  // console.log(callDetail)
  // const[scheduleMeetingError,setScheduleMeetingError]=useState(true)

  const createMeeting=async()=>{
    if(!client || !user)return ;
    try{
      if(!values.dateTime){
        toast({title:'Please Select Date&Time'})
        return;
      }
      const id=crypto.randomUUID()
      const call=client.call('default',id)
      if(!call) throw new Error('failed to create Meeting')
      const startAt=values.dateTime.toISOString()||new Date(Date.now()).toISOString()
      const description=values.description||'Instant Meeting'
      await call .getOrCreate({
        data:{
          starts_at:startAt,
          custom:{
            description,
          }
        },
      })
      setCallDetail(call)
      // Looks stupid move👁️
      if(!values.description){
        router.push(`/meeting/${call.id}`)
      }
      toast({title:'Meeting Created'})
    }
    catch(err){
      console.log(err)
      toast({title:"Failed to create Meeting!"})
    }
   }
   if(!client ||!user) return <Loader/>
   const meetingLink=`${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetail?.id}`
 
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard img="/icons/add-meeting.svg" title
      ="new Meeting" description="Start an instant meeting"  handleClick={()=>setMeetingState('isInstantMeeting')}/>
      <HomeCard img="/icons/join-meeting.svg" title
      ="Join Meeting" description="via invitation Link" className="bg-blue-1" handleClick={()=>setMeetingState('isJoiningMeeting')} />
      <HomeCard img="/icons/schedule.svg" title
      ="Schedule Meeting" description="Plan your meeting" className="bg-purple-1" handleClick={()=>setMeetingState('isScheduleMeeting')} />
      <HomeCard img="/icons/recordings.svg" title
      ="View Recordings" description="Meeting Recordings" className="bg-yellow-1" handleClick={()=>router.push('/recordings')} />

      {!callDetail?(
        <MeetingModal isOpen={meetingState==="isScheduleMeeting"} 
        onClose={()=>setMeetingState(undefined)} title="Create Meeting" handleClick={createMeeting}>
          <div className="flex flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
            Add a description*
            </label>
              <Textarea  className="border-none bg-gray-200 dark:bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"  onChange={(e)=>setValues({...values,description:e.target.value})}
            />
          </div>
          <div  className="flex w-full flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] ">
              Select Date and Time
            </label>
            <ReactDatePicker selected={values.dateTime} onChange={(date)=>setValues({...values,dateTime:date!})} showTimeSelect timeFormat="HH:mm" timeIntervals={15} timeCaption="time" dateFormat="MMMM d, yyyy h:mm aa" className="w-full rounded-lg bg-gray-200 dark:bg-dark-3 p-2 focus:outline-none"/>
          </div>
        </MeetingModal>
      ):(
        <MeetingModal isOpen={meetingState==="isScheduleMeeting"} 
      onClose={()=>setMeetingState(undefined)} title=" Meeting Created" 
      handleClick={()=>{
        navigator.clipboard.writeText(meetingLink)
        toast({title:"Link Copied"})
      }} image="/icons/checked.svg" buttonIcon="/icons/copy.svg" className="text-center" buttonText="Copy Meeting Link"/>
      )
    }
      {/* //create Instant Meeting */}
      <MeetingModal isOpen={meetingState==="isInstantMeeting"} 
      onClose={()=>setMeetingState(undefined)} title="Create Meeting" handleClick={createMeeting} />
      {/* joining Meeting */}
      <MeetingModal isOpen={meetingState==="isJoiningMeeting"} onClose={()=>setMeetingState(undefined)} title="Type the link here" className="text-center" buttonText="Join Meeting" handleClick={()=>router.push(values.link)}>
        <Input placeholder="Meeting link" onChange={(e)=>setValues({...values,link:e.target.value})} className="border-none bg-gray-200  dark:bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"/>
        </MeetingModal>
    </section>
  )
}
export default MeetingTypeList