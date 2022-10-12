import axios from 'axios';
import React, { useState } from 'react';
import Card from '../components/Card/Card';

function Orders() {
	const [orders, setOrders] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	React.useEffect(() => {
		(async () => {
			try {
				const { data } = await axios.get(
					'https://62af03f03bbf46a3521a4c67.mockapi.io/orders'
				);
				// для конкатенаации всех items в один массив делаем
				//const items = data.map(obj => obj.items).flat();
				// либо
				//const items = data.reduce((prev, obj) => [...prev, ...obj.items], []);
				const items = data
					.map(obj => {
						obj.items.map(item => {
							item.date = obj.date;
							item.orderId = obj.id;
							return item;
						});
						return obj.items;
					})
					.flat();
				setOrders(items);

				setIsLoading(false);
			} catch (error) {
				alert('Ошибка при запросе заказов!');
				console.error(error);
			}
		})();
	}, []);

	return (
		<div className='content'>
			<div className='contentInfo'>
				<h1>Мои заказы</h1>
			</div>

			<div className='cards'>
				{orders.map((item, index) => (
					<Card key={index} {...item} loading={isLoading} />
				))}
			</div>
		</div>
	);
}

export default Orders;
