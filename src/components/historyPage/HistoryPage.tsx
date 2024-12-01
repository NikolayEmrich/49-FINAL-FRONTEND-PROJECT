import React from 'react'
import { useCart } from '../../context/CartContext';
import styles from '../homePage/homePage.module.css'

export default function HistoryPage() {
  // Забираете данные из контекста
  const { cart, removeFromCart, clearCart } = useCart();
  console.log(cart);

  return (
    <div className={`${styles.allPlace} ${styles.content} ${styles.historyContent}`}>
        {cart.map((data, id) => (
            <div key={id}>

    <div className={styles.weatherFormForCity}>
    <div className={styles.weatherFormForAnother}>
      <div>
        <h1>{Math.floor(data.main.temp - 273.15)}°</h1>
        <span>{data.name}, {data.sys.country}</span>
      </div>
      <div>
        <h3>{data.weather[0]?.main}, {data.weather[0]?.description}</h3>
        <img src={`https://openweathermap.org/img/w/${data.weather[0]?.icon}.png`} alt="" />
        <img src={`https://openweathermap.org/img/w/${data.weather[0]?.icon}.png`} alt="" />
        <img src={`https://openweathermap.org/img/w/${data.weather[0]?.icon}.png`} alt="" />
      </div>
    </div>
    <div className={styles.weatherFormForButton}>
    <button onClick={() => removeFromCart(data.id)}>Delete</button>
    </div>
  </div>
</div>
))}

      <div className={styles.weatherDeleteAllButton}>
      {cart.length > 0 && (
                <button onClick={() => clearCart()}>Delete all cards</button>
            )}

      </div>
    </div>
  );
}