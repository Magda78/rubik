function Timer() {
	return <div className="flex flex-col p-2">
        <div className="mb-5 flex flex-row justify-center items-center">
            00:00:00
        </div>
        <div className="flex flex-row justify-center">
        <button className="mr-2 bg-green-700 text-yellow-300 hover:bg-yellow-300 hover:text-green-700 p-3 hover:scale-105 transition transform duration-200 easy-out">START</button>
        <button className="bg-green-700 text-yellow-300 hover:bg-yellow-300 hover:text-green-700 p-3 hover:scale-105 transition transform duration-200 easy-out">DONE</button>
        </div>
    </div>;
}

export default Timer;
