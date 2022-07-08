import React from 'react';
import { AppContext } from '../App';
import Card from '../components/Card/Card';

function Favorits({ addToFavorit, addToCart }) {
	const { favoritItems } = React.useContext(AppContext);

	return (
		<div className='content'>
			<div className='contentInfo'>
				<h1>Мои закладки</h1>
			</div>

			<div className='cards'>
				{favoritItems.map(item => (
					<Card
						key={item.code}
						{...item}
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
