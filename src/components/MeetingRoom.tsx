
import { cn } from "@/lib/utils"
import { CallControls, CallParticipantsList, CallStatsButton, CallingState, NoiseCancellationProvider, PaginatedGridLayout, SpeakerLayout, useCallStateHooks, useNoiseCancellation } from "@stream-io/video-react-sdk"
import { useRouter, useSearchParams } from "next/navigation"
import { useMemo, useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { AudioLines, LayoutList, Users } from "lucide-react"
import EndCallButton from "./EndCallButton"
import Loader from "./Loader"
import { NoiseCancellation } from "@stream-io/audio-filters-web"

type Props = {}
type CallLayoutTypes='grid'|'speaker-left'|'speaker-right'
const MeetingRoom = (props: Props) => {
  const noiseCancellation = useMemo(() => new NoiseCancellation(), []);
  const router=useRouter()
  const searchParams=useSearchParams()
  const isPersonalRoom=!!searchParams.get('personal')
  const [showParticipants, setShowParticipants] = useState(false)
  const [layout, setLayout] = useState<CallLayoutTypes>('speaker-left')
  const{useCallCallingState}=useCallStateHooks()
  const callingState=useCallCallingState()
  if(callingState!== CallingState.JOINED)return <Loader/>
  const CallLayout=()=>{
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout/>
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition={"left"}/>
      default:
        return <SpeakerLayout participantsBarPosition={"right"}/>
    }
  }
  const MyToggleNoiseCancellationButton = () => {
    const { isSupported, isEnabled, setEnabled } = useNoiseCancellation();
    return (
      <button
      disabled={!isSupported}
        type="button"
        onClick={() => setEnabled(!isEnabled)}
        className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b] focus:bg-blue-800  "
      >
      <AudioLines/>
      </button>
    );
  };
  return (
   <section className="relative h-screen w-full overflow-hidden pt-4 ">
    <div className="relative flex size-full items-center justify-center" >
      <div className=" flex size-full max-w-[1000px] items-center" >
        <CallLayout/>
      </div>
      <div className={cn('h-[calc(100vh-86px)] hidden ml-2',{'show-block':showParticipants})}>
        <CallParticipantsList onClose={()=>setShowParticipants(false)}/>
      </div>
    </div>
    {/* video layout and call controls */}
    <div className="fixed bottom-0 flex w-full items-center justify-center gap-5">
      <CallControls onLeave={()=>router.push('/')}/>
      <DropdownMenu>
        <div className="flex items-center">
          <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]  ">
            <LayoutList size={20}className="text-white" />
          </DropdownMenuTrigger>
        </div>
        <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
          {['Grid','Speaker-Left',"Speaker-Right"].map((item,index)=>(
          <div key={index}>
            <DropdownMenuItem onClick={()=>setLayout(item.toLowerCase() as CallLayoutTypes)}>
              {item}
            </DropdownMenuItem>
            <DropdownMenuSeparator className="border-dark-1" />
          </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <CallStatsButton/>
      {/* //NoiseCancellation */}
      <NoiseCancellationProvider noiseCancellation={noiseCancellation}>
        <MyToggleNoiseCancellationButton/>
      </NoiseCancellationProvider>

      <button onClick={()=>setShowParticipants((prev)=>!prev)}>
        <div className=" cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]  ">
          <Users size={20} className="text-white"/>
        </div>
      </button>
      {!isPersonalRoom && <EndCallButton/>}
    </div>
   </section>
  )
}
export default MeetingRoom