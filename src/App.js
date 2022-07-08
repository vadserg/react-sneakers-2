import React from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorits from './pages/Favorits';

export const AppContext = React.createContext({});

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

	const addToCart = async obj => {
		// console.log('addToCart obj: ', obj);
		const cartItemToRemove = cartItems.find(item => item.code === obj.code);
		const itemToChangeAdd = items.find(item => item.code === obj.code);
		const favoritItemToChangeAdd = favoritItems.find(
			item => item.code === obj.code
		);

		if (cartItemToRemove) {
			removeFromCard(obj);
		} else {
			itemToChangeAdd.isAdd = true;
			if (favoritItemToChangeAdd) {
				favoritItemToChangeAdd.isAdd = true;

				await axios.put(
					`https://62af03f03bbf46a3521a4c67.mockapi.io/favorits/${favoritItemToChangeAdd.id}`,
					favoritItemToChangeAdd
				);
			}
			const favoritsResponse = await axios.get(
				'https://62af03f03bbf46a3521a4c67.mockapi.io/favorits'
			);
			setFavoritItems(favoritsResponse.data);

			const cartResponse = await axios.post(
				'https://62af03f03bbf46a3521a4c67.mockapi.io/cart',
				obj
			);
			setCartItems(prev => [...prev, cartResponse.data]);

			await axios.put(
				`https://62af03f03bbf46a3521a4c67.mockapi.io/items/${itemToChangeAdd.id}`,
				itemToChangeAdd
			);
		}
	};

	const removeFromCard = async obj => {
		const cartItemToRemove = cartItems.find(item => item.code === obj.code);
		const itemToChangeAdd = items.find(item => item.code === obj.code);
		const favoritItemToChangeAdd = favoritItems.find(
			item => item.code === obj.code
		);

		itemToChangeAdd.isAdd = false;
		if (favoritItemToChangeAdd) {
			favoritItemToChangeAdd.isAdd = false;

			await axios.put(
				`https://62af03f03bbf46a3521a4c67.mockapi.io/favorits/${favoritItemToChangeAdd.id}`,
				favoritItemToChangeAdd
			);
		}
		await axios.delete(
			`https://62af03f03bbf46a3521a4c67.mockapi.io/cart/${cartItemToRemove.id}`
		);
		setCartItems(prev => prev.filter(item => item.code !== obj.code));

		await axios.put(
			`https://62af03f03bbf46a3521a4c67.mockapi.io/items/${itemToChangeAdd.id}`,
			itemToChangeAdd
		);

		const favoritsResponse = await axios.get(
			'https://62af03f03bbf46a3521a4c67.mockapi.io/favorits'
		);
		setFavoritItems(favoritsResponse.data);
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
		<AppContext.Provider
			value={{ items, cartItems, favoritItems, setCartOpened, setCartItems }}
		>
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
					<Favorits addToFavorit={addToFavorit} addToCart={addToCart} />
				</Route>
			</div>
		</AppContext.Provider>
	);
}

export default App;
