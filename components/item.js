function Item({ name, img }) {
	return (
		<div className="flex justify-between border-b-2 items-center mb-2">
			<h1>{name}</h1>
			<img src={img} />
			<button className="bg-green-700 text-yellow-300 hover:bg-yellow-300 hover:text-green-700 p-3 hover:scale-105 transition transform duration-200 easy-out">
				Try Me
			</button>
		</div>
	);
}

export default Item;
