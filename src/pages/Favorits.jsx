import Card from '../components/Card/Card';

function Favorits({ items, addToFavorit, addToCart }) {
	return (
		<div className='content'>
			<div className='contentInfo'>
				<h1>Мои закладки</h1>
			</div>

			<div className='cards'>
				{items.map(item => (
					<Card
						key={item.code}
						{...item}
						added={item.isAdded}
						favorited={true}
						onFavorit={addToFavorit}
						onPlus={addToCart}
					/>
				))}
			</div>
			{/* end of cardsRow */}
		</div>
	);
}

export default Favorits;
