import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/router';
import { useState } from 'react';
export default function Main({ scramble }) {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [random, setRandom] = useState()
	const sortHandler = (scramble) => {
		const sort = scramble[Math.floor(Math.random() * scramble.length)];
		setRandom(sort)
		
	};

	const signOutHandler =  (e) => {
		
			
		
			signOut();
			router.push('/');
		
		
		e.preventDefault();
	}
	
	return (
		
		<div className="max-w-3xl h-full m-auto">
			<div className="flex justify-between p-5 items-center border-b-2">
					<img src="img/rubik_1.png" className="w-12 h-12" />
					<button
						onClick={signOutHandler}
						className="bg-green-700 text-yellow-300 hover:bg-yellow-300 hover:text-green-700 p-3 hover:scale-105 transition transform duration-200 easy-out"
					>
						SignOut
					</button>
				</div>
			<div className="flex justify-between p-5 items-center border-b-2">
				<div>
					<img src={random?.img} />
				</div>
				<button
					onClick={()=>sortHandler(scramble)}
					className="bg-green-700 text-yellow-300 hover:bg-yellow-300 hover:text-green-700 p-3 hover:scale-105 transition transform duration-200 easy-out"
				>
					Sort
				</button>
				{console.log('from jsx',random)}
			</div>
		</div>
	);
}

export async function getStaticProps() {
	const res = await fetch('http://localhost:3002/api/scramble');
	const scramble = await res.json();

	console.log(scramble);
	return {
		props: {
			scramble
		}
	};
}
