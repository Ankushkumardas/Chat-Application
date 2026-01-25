import { useAuthStore } from '../store/useAuthStore'

const Home = () => {
  const {authUser}=useAuthStore();
  console.log(authUser)
  return (
    <div className=' container mx-auto'>
        <div className=' max-w-full h-screen p-4'>
                <div className=' flex items-center justify-center '>
                    <p className=' tracking-tighter text-5xl bg-gradient-to-r from-purple-600 to-blue-700 bg-clip-text text-transparent mt-70'>Chat Application</p>
                </div>
        </div>
    </div>
  )
}

export default Home
