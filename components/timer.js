import { useState } from 'react';
import { getSession, useSession, signIn, signOut } from 'next-auth/react';
import { db } from '../firebase';
import { addDoc, collection, serverTimestamp, Timestamp } from 'firebase/firestore';

function Timer({ name }) {
	const { data: session, status } = useSession();
	const [ seconds, setSeconds ] = useState(0);
	const [ secId, setSecId ] = useState(null);
	const [ minutes, setMinutes ] = useState(0);
	const [ minId, setMinId ] = useState(null);
	const [ hours, setHours ] = useState(0);
	const [ hourId, setHourId ] = useState(null);
	const [ start, setStart ] = useState(false);
	const [ done, setDone ] = useState(false);
	const startHandler = (name) => {
		setStart(true);
		setSecId(
			setInterval(() => {
				setSeconds((seconds) => (seconds === 60 ? setSeconds(0) : seconds + 1));
			}, 1000)
		);
		setMinId(
			setInterval(() => {
				setMinutes((minutes) => (minutes === 60 ? setMinutes(0) : minutes + 1));
			}, 60000)
		);
		setHourId(
			setInterval(() => {
				setHours((hours) => (hours === 60 ? setHours(0) : hours + 1));
			}, 3600000)
		);
	};

	const stopHandler = (name) => {
		setDone(true);
		clearInterval(secId, minId, hourId);
		let newDate = new Date();
		newDate.setSeconds(seconds)
		newDate.setMinutes(minutes)
		newDate.setHours(hours)
		const time = newDate.getHours() +':'+newDate.getMinutes()+':'+newDate.getSeconds()
		console.log(newDate.toString())
		console.log(time.toString())
		const dbInstance = collection(db, 'players', session.user.email, name);
		addDoc(dbInstance, {
			timer: time,
			timestamp: serverTimestamp()
		});
	};
	return (
		<div className="flex flex-col p-2">
			<div className="mb-5 flex flex-row justify-center items-center">
				<h1>{hours < 10 ? '0' + hours : hours}</h1>
				<h1>:{minutes < 10 ? '0' + minutes : minutes}</h1>
				<h1>:{seconds < 10 ? '0' + seconds : seconds}</h1>
			</div>
			<div className="flex flex-row justify-center">
				<button
					disabled={start}
					onClick={startHandler}
					className="disabled:bg-gray-200 disabled:text-black mr-2 bg-green-700 text-yellow-300 hover:bg-yellow-300 hover:text-green-700 p-3 hover:scale-105 transition transform duration-200 easy-out"
				>
					START
				</button>
				<button
					disabled={done}
					onClick={() => stopHandler(name)}
					className="disabled:bg-gray-200 disabled:text-black bg-green-700 text-yellow-300 hover:bg-yellow-300 hover:text-green-700 p-3 hover:scale-105 transition transform duration-200 easy-out"
				>
					DONE
				</button>
			</div>
		</div>
	);
}

export default Timer;
