import React from 'react';
import ContentLoader from 'react-content-loader';
import styles from './Card.module.scss';

function Card({
	id,
	code,
	date,
	model,
	price,
	isAdd,
	isFavorit,
	onPlus,
	onFavorit,
	loading,
	orderId,
}) {
	//const [isAdded, setAdded] = React.useState(isAdd);
	//const [isFavorited, setFavorit] = React.useState(isFavorit);

	const handleClickPlus = () => {
		//setAdded(!isAdd);
		isAdd = !isAdd;
		onPlus({ id, code, model, price, isAdd, isFavorit });
	};
	const handleClickFavorit = () => {
		//setFavorit(!isFavorit);
		isFavorit = !isFavorit;
		onFavorit({ id, code, model, price, isFavorit, isAdd });
	};

	return (
		<div className={styles.card}>
			{loading ? ( // при загрузке товаров рендерим заглушки с анимацией
				<ContentLoader
					speed={1}
					width={220}
					height={260}
					viewBox='0 0 220 260'
					backgroundColor='#f3f3f3'
					foregroundColor='#ecebeb'
				>
					<rect x='0' y='106' rx='3' ry='3' width='150' height='15' />
					<rect x='0' y='0' rx='10' ry='10' width='150' height='90' />
					<rect x='78' y='84' rx='0' ry='0' width='2' height='0' />
					<rect x='80' y='83' rx='0' ry='0' width='70' height='1' />
					<rect x='152' y='74' rx='0' ry='0' width='0' height='3' />
					<rect x='0' y='125' rx='3' ry='3' width='100' height='15' />
					<rect x='0' y='162' rx='5' ry='5' width='80' height='24' />
					<rect x='118' y='154' rx='10' ry='10' width='32' height='32' />
				</ContentLoader>
			) : (
				// после загрузки товаров рендерим их
				<>
					{onFavorit ? (
						<div onClick={handleClickFavorit}>
							<img
								className={styles.favorit}
								src={isFavorit ? '/img/liked.svg' : '/img/unliked.png'}
								alt='like'
							/>
						</div>
					) : (
						<span className={styles.order}>
							{`Заказ №${orderId}`} <br /> {`от ${date}`}
						</span>
					)}
					<img
						src={`img/sneakers/${code}.jpg`}
						alt='img'
						width={133}
						height={112}
					/>
					<p>{model}</p>
					<div className={styles.cardBottom}>
						<div className={styles.cardPrice}>
							<span>Цена:</span>
							<b>{price} руб.</b>
						</div>

						{onPlus && (
							<img
								className={styles.plus}
								onClick={handleClickPlus}
								src={isAdd ? '/img/btn-checked.svg' : '/img/btn-plus.svg'}
								alt='plus'
							/>
						)}
					</div>
				</>
			)}
		</div>
	);
}

export default Card;
