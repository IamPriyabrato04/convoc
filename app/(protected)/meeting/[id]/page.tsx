
const Meeting = ({params}:{params:{id:string}}) => {
  return (
    <main className="h-screen w-full">Meeting id: {params.id}</main>
  )
}

export default Meeting