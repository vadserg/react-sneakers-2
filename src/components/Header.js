import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './hooks/useCart';

function Header(props) {
	const { totalPrice } = useCart(); // достаем totalPrice из кастомного хука
	// и не тащим сюда весь AppContext
	// либо выводим totalPrice из AppContext
	// или считаем total Price из cartItems, который берем из AppContext
	// const {cartItems} = React.useContext(AppContext);
	// totalPrice = cartItems.reduce((sum, item) => item.price + sum, 0);

	return (
		<header>
			<Link to='/'>
				<div className='headerLeft'>
					<img width={40} height={40} src='/img/logo.png' alt='logo' />
					<div className='headerInfo'>
						<h3>React Sneakers</h3>
						<p>Магазин лучших кроссовок</p>
					</div>
				</div>
			</Link>
			<ul className='headerRight'>
				<li className='cartBtn' onClick={props.onClickCart}>
					<img src='img/cart.svg' alt='cart' />
					<span>{totalPrice} руб.</span>
				</li>
				<li className='favoritBtn'>
					<Link to='/favorits'>
						<img src='img/favorite.svg' alt='favorite' />
					</Link>
				</li>
				<li className='userBtn'>
					<Link to='/orders'>
						<img src='img/user.svg' alt='user' />
					</Link>
				</li>
			</ul>
		</header>
	);
}

export default Header;
