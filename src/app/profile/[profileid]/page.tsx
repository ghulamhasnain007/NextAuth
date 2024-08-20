
export default function page({params}: any) {
  return (
    <div className="flex flex-col items-start justify-center min-h-screen py-2">
        <h1>Profile ID</h1>
        <h2 className="text-2xl bg-green-500 font-bold p-3">{params.profileid}</h2>
    </div>
  )
}
