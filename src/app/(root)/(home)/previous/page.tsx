import CallList from "@/components/CallList"

type Props = {}
const PreviousPage = (props: Props) => {
  return (
    <section className="flex size w-full flex-col gap-10 text-white">
      <h1 className="text-3xl font-bold">
        Previous
      </h1>
      <CallList type="ended"/>
    </section>
  )
}
export default PreviousPage