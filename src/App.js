import React from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorits from './pages/Favorits';

function App() {
	const [cartOpened, setCartOpened] = React.useState(false);
	const [items, setItems] = React.useState([...Array(8)]);
	const [favoritItems, setFavoritItems] = React.useState([]);
	const [cartItems, setCartItems] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);

	//единожды при первом рендеринге приложения, инициализируем товары, закладки и корзину из бэка
	React.useEffect(() => {
		async function fetchData() {
			// Получаем массив товаров с сервера mockapi.io
			const itemsResponse = await axios.get(
				'https://62af03f03bbf46a3521a4c67.mockapi.io/items'
			);

			//Получаем с сервера корзину покупок
			const cartResponse = await axios.get(
				'https://62af03f03bbf46a3521a4c67.mockapi.io/cart'
			);

			// Получаем избранные товары с сервера mockapi.io
			const favoritsResponse = await axios.get(
				'https://62af03f03bbf46a3521a4c67.mockapi.io/favorits'
			);

			setIsLoading(false);

			setItems(itemsResponse.data);
			setCartItems(cartResponse.data);
			setFavoritItems(favoritsResponse.data);
		}

		fetchData();
	}, []);

	const addToCart = obj => {
		// console.log('addToCart obj: ', obj);
		let cartItemToRemove = cartItems.find(item => item.code === obj.code);
		let itemToChangeAdd = items.find(item => item.code === obj.code);

		if (cartItemToRemove) {
			removeFromCard(obj);
		} else {
			axios
				.post('https://62af03f03bbf46a3521a4c67.mockapi.io/cart', obj)
				.then(res => setCartItems(prev => [...prev, res.data]));
			itemToChangeAdd.isAdd = true;
			axios.put(
				`https://62af03f03bbf46a3521a4c67.mockapi.io/items/${itemToChangeAdd.id}`,
				itemToChangeAdd
			);
		}
	};

	const removeFromCard = obj => {
		// console.log('remove obj: ', obj);
		let itemToChangeAdd = items.find(item => item.code === obj.code);
		// console.log(itemToChangeAdd);
		let cartItemToRemove = cartItems.find(item => item.code === obj.code);
		itemToChangeAdd.isAdd = false;
		axios
			.delete(
				`https://62af03f03bbf46a3521a4c67.mockapi.io/cart/${cartItemToRemove.id}`
			)
			.then(setCartItems(prev => prev.filter(item => item.code !== obj.code)));
		axios.put(
			`https://62af03f03bbf46a3521a4c67.mockapi.io/items/${itemToChangeAdd.id}`,
			itemToChangeAdd
		);
	};

	const addToFavorit = obj => {
		// console.log('obj: ', obj);
		let itemToRemove = favoritItems.find(item => item.code === obj.code);
		let itemToChangeFavorit = items.find(item => item.code === obj.code);

		if (itemToRemove) {
			itemToChangeFavorit.isFavorit = false;
			axios
				.delete(
					`https://62af03f03bbf46a3521a4c67.mockapi.io/favorits/${itemToRemove.id}`
				)
				.then(
					setFavoritItems(prev => prev.filter(item => item.code !== obj.code))
				);
			axios.put(
				`https://62af03f03bbf46a3521a4c67.mockapi.io/items/${itemToChangeFavorit.id}`,
				itemToChangeFavorit
			);
		} else {
			axios
				.post('https://62af03f03bbf46a3521a4c67.mockapi.io/favorits', obj)
				.then(res => setFavoritItems(prev => [...prev, res.data]));
			itemToChangeFavorit.isFavorit = true;
			axios.put(
				`https://62af03f03bbf46a3521a4c67.mockapi.io/items/${itemToChangeFavorit.id}`,
				itemToChangeFavorit
			);
		}
	};

	return (
		<div className='wrapper'>
			{cartOpened && (
				<Drawer
					cartItems={cartItems}
					onClose={() => setCartOpened(false)}
					onRemove={removeFromCard}
					addToCart={addToCart}
				/>
			)}
			<Header onClickCart={() => setCartOpened(true)} />
			<Route path='/' exact>
				<Home
					items={items}
					addToCart={addToCart}
					addToFavorit={addToFavorit}
					isLoading={isLoading}
				/>
			</Route>
			<Route path='/favorits'>
				<Favorits
					items={favoritItems}
					addToFavorit={addToFavorit}
					addToCart={addToCart}
				/>
			</Route>
		</div>
	);
}

export default App;
