import React from 'react';
import axios from 'axios';
import Fade from 'react-reveal/Fade';
import Info from './Info';
import { useCart } from './hooks/useCart';

function Drawer({ onClose, onRemove }) {
	const { cartItems, setCartItems, totalPrice } = useCart();
	const isCartEmpty = !cartItems.length;
	const [isComplete, setIsComplete] = React.useState(false);
	const [orderId, setOrderId] = React.useState(null);
	const [isLoading, setIsLoading] = React.useState(false);
	const [orderDate, setOrderDate] = React.useState(
		new Date().toLocaleDateString()
	);

	const onComplete = async () => {
		// let cart = cartItems.forEach(item => (item.isAdd = false));
		// setCartItems(cart);
		try {
			setIsLoading(true);

			const { data } = await axios.post(
				'https://62af03f03bbf46a3521a4c67.mockapi.io/orders',
				{ items: cartItems, date: orderDate }
			);
			await cartItems.map(item => onRemove(item));
			setOrderId(data.id);
			setOrderDate(data.date);
			setIsComplete(true);
			setCartItems([]);
		} catch (error) {
			alert('Не удалось создать заказ :(');
		}
		setIsLoading(false);
	};

	// закрываем корзину по нажатию Escape либо на overlay
	React.useEffect(() => {
		const handleEsc = event => {
			if (event.keyCode === 27 || event.target.className === 'overlay') {
				onClose();
			}
		};
		window.addEventListener('keydown', handleEsc);
		window.addEventListener('click', handleEsc);

		return () => {
			window.removeEventListener('keydown', handleEsc);
			window.addEventListener('click', handleEsc);
		};
	});

	return (
		<div className='overlay'>
			<Fade right>
				<div className='drawer'>
					<h2>
						Корзина
						<img
							className='removeBtn'
							onClick={onClose}
							src='img/close.svg'
							alt='close'
						/>
					</h2>
					{isCartEmpty ? (
						isComplete ? (
							<Info
								title={`Заказ №${orderId} оформлен ${orderDate}`}
								description={'Ваш заказ будет передан курьерской доставке'}
								image='img/order-complete.png'
							/>
						) : (
							<Info
								title='Корзина пустая'
								description='Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ'
								image='img/empty-box.svg'
							/>
						)
					) : (
						<>
							<div className='cart'>
								{cartItems.map(item => (
									<div id={item.id} className='cartItem' key={item.code}>
										<img
											width={70}
											height={70}
											src={`img/sneakers/${item.code}.jpg`}
											alt='sneakers'
										/>
										<div>
											<p>{item.model}</p>
											<span>{item.price} руб.</span>
										</div>
										<img
											id={item.code}
											className='removeBtn'
											src='img/close.svg'
											onClick={() => onRemove(item)}
											alt='close'
										/>
									</div>
								))}
							</div>

							<div className='cartInfo'>
								<ul>
									<li>
										<span>Итого:</span>
										<div></div>
										<b>{totalPrice} руб. </b>
									</li>
									<li>
										<span>В том числе НДС 20%:</span>
										<div></div>
										<b>{(totalPrice * 0.2).toFixed(2)} руб. </b>
									</li>
								</ul>
								<button
									disabled={isLoading}
									className='greenButton orderBtn'
									onClick={onComplete}
								>
									<span>Оформить заказ</span>
									<img src='img/arrow-r.svg' alt='arrow'></img>
								</button>
							</div>
						</>
					)}
				</div>
			</Fade>
		</div>
	);
}

export default Drawer;
