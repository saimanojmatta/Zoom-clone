import MeetingTypeList from "@/components/MeetingTypeList"
import { StickyScrollRevealDemo } from "@/components/Scroll-card"
type Props = {}
const Home = (props: Props) => {
  const now=new Date()
  const time=now.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'})
  const date= (new Intl.DateTimeFormat('en-US',{dateStyle:"full"})).format(now)
  const newDate=new Date().toDateString()
  return (
    <section  className="flex size-full flex-col gap-5 ">
      <div className="h-[303px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className="glassmorphism max-w-[273px] rounded py-2 text-center text-base font-normal">
            Upcoming Meeting at:12.30
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl" >{newDate}</p>
          </div>
        </div>
      </div>
      <MeetingTypeList/>
      <StickyScrollRevealDemo/>
      
    </section>
  )
}
export default Home