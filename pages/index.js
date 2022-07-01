import Head from 'next/head';
import { getSession, useSession, signIn, signOut } from 'next-auth/react';
import Item from '../components/item';

function Home({ data }) {
	const { data: session, status } = useSession();
	return (
		<div>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="max-w-3xl h-full m-auto">
				<div className="flex justify-between p-5 items-center border-b-2">
					<img src="img/rubik_1.png" className="w-12 h-12" />
					<button
						onClick={() => (!session ? signIn() : signOut())}
						className="bg-green-700 text-yellow-300 hover:bg-yellow-300 hover:text-green-700 p-3 hover:scale-105 transition transform duration-200 easy-out"
					>
						{!session ? 'SignUp' : 'SignOut'}
					</button>
				</div>
				{session ? (
					<div className="flex flex-col mt-10">
						{data.map((item) => <Item key={item.id} name={item.name} img={item.img} />)}
					</div>
				) : null}
			</div>
		</div>
	);
}
export default Home;
export async function getServerSideProps(context) {
	const session = await getSession(context);
	const res = await fetch('http://localhost:3002/api/scramble');
	const data = await res.json();
	return {
		props: {
			data: session ? data : null
		}
	};
}
