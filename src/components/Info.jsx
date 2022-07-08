import React from 'react';
import { AppContext } from '../App';

const Info = ({ image, title, description }) => {
	const { setCartOpened } = React.useContext(AppContext);

	return (
		<div className='cartEmpty'>
			<img className='emptyBox' width={150} height={150} src={image} alt='' />
			<h2>{title}</h2>
			<p>{description}</p>
			<button
				className='greenButton backBtn'
				onClick={() => setCartOpened(false)}
			>
				<img src='img/arrow-l.svg' alt='arrow' />
				<span>Вернуться назад</span>
			</button>
		</div>
	);
};

export default Info;
