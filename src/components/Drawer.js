import axios from 'axios';
import React, { useContext } from 'react';
import Fade from 'react-reveal/Fade';
import { AppContext } from '../App';
import Info from './Info';

function Drawer({ onClose, onRemove, cartItems = [] }) {
	const isCartEmpty = !cartItems.length;
	const [isComplete, setIsComplete] = React.useState(false);
	const { setCartItems } = useContext(AppContext);

	const onComplete = () => {
		axios.post('https://62af03f03bbf46a3521a4c67.mockapi.io/orders', cartItems);
		setIsComplete(true);
		setCartItems([]);
	};

	// закрываем корзину по нажатию Escape
	React.useEffect(() => {
		const handleEsc = event => {
			if (event.keyCode === 27) {
				onClose();
			}
		};
		window.addEventListener('keydown', handleEsc);

		return () => {
			window.removeEventListener('keydown', handleEsc);
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
								title='Заказ оформлен'
								description='Ваш заказ будет передан курьерской доставке'
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
										<b>21 498 руб. </b>
									</li>
									<li>
										<span>Налог 5%:</span>
										<div></div>
										<b>1074 руб. </b>
									</li>
								</ul>
								<button className='greenButton orderBtn' onClick={onComplete}>
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
