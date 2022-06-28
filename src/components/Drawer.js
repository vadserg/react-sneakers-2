import React from 'react';
// import axios from 'axios';

function Drawer({ onClose, onRemove, cartItems = [] }) {
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
				{/* end of cart */}
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
					<button className='greenButton'>
						Оформить заказ
						<img src='img/arrow.svg' alt='arrow'></img>
					</button>
				</div>
				{/* end of cartInfo */}
			</div>
		</div>
	);
}

export default Drawer;
