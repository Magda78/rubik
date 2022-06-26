import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Main({scramble}) {
    const { data: session, status } = useSession();
    const router = useRouter();
     const signInHandler = () => {
      if(status === 'authenticated') {
              console.log(session?.user?.email)
        router.push('/main')
              //signOut()
          }
          else {
        
        signIn()
        }
     }
    return (
        <div className='max-w-3xl h-full m-auto'>
        <div className='flex justify-between p-5 items-center border-b-2'>
        <h1>Home</h1>
        <button className='bg-green-700 text-yellow-300 hover:bg-yellow-300 hover:text-green-700 p-3 hover:scale-105 transition transform duration-200 easy-out'>Sort</button>
         
          </div>
        </div>
        
    )
  }
  
  export async function getStaticProps() {
	const scramble = await ('http://localhost:3003/api/scramble');
	console.log(scramble);
	return {
		props: {
			scramble
		}
	};
}