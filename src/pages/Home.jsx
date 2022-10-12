import React from 'react';
import { AppContext } from '../App';
import Card from '../components/Card/Card';

function Home({ items }) {
	const { addToCart, addToFavorit, isLoading } = React.useContext(AppContext);
	const [searchValue, setSearchValue] = React.useState('');
	const handleSearchChange = e => {
		setSearchValue(e.target.value);
	};

	const cleanInput = () => setSearchValue('');

	const renderItems = () => {
		return (
			isLoading
				? items // первоначально при загрузке товаров - массив из 8 пустых элементов
				: items.filter(item =>
						item.model.toLowerCase().includes(searchValue.toLowerCase())
				  )
		).map((item, index) => (
			<Card
				key={index}
				{...item}
				onPlus={addToCart}
				onFavorit={addToFavorit}
				loading={isLoading}
			/>
		));
	};

	return (
		<div className='content'>
			<div className='contentInfo'>
				<h1>{searchValue ? `поиск по... ${searchValue}` : 'Все кроссовки'}</h1>
				<div className='search-block'>
					<img src='/img/search.svg' alt='search' />
					<input
						type='text'
						onChange={handleSearchChange}
						value={searchValue}
						placeholder='Поиск...'
					/>
					<img src='/img/close.svg' alt='clean' onClick={cleanInput} />
				</div>
			</div>

			<div className='cards'>{renderItems()}</div>
		</div>
	);
}

export default Home;
