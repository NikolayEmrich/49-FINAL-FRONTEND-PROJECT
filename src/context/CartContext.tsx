import React, { createContext, useContext, useState } from 'react'
import { IWeatherData } from '../components/homePage/HomePage'

// Типизируем содержание контекста
interface ICartContextType {
  cart: IWeatherData[]
  addToCart: (product: IWeatherData) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
}

// 1. Создаем контекст
export const CartContext = createContext <ICartContextType | undefined>(undefined)

// 2. Обертка для копмонента с использованием контекста
export const CartProvider = ({children}: {children: React.ReactNode}) => {

  // Стейт для корзины
  const[cart, setCart] = useState<IWeatherData[]>([])

  // Добавление товара в корзину
  const addToCart = (product: IWeatherData) => {
    setCart(prevCart => {

      // Проверяем есть ли такой продукт в корзине (!!!НЕ ИСПОЛЬЗУЕТСЯ!!! - в нашем проекте дубликаты могут попадать в корзину через контекст)
      // const productExist = prevCart.find(item => item.id === product.id)

      return [...prevCart, { ...product}];
    })
  };

  // Удаление товара из корзины
  const removeFromCart = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id))
  };

  // Очистка корзины
  const clearCart = () => {
    setCart([])
  };

  return (
    <CartContext.Provider value={{cart, addToCart, removeFromCart, clearCart}}>

      {/* За место Children придут обернутые в provider компоненты */}
      {children}

    </CartContext.Provider>
  )
};

// Здесь useContext используется для доступа к значению контекста CartContext, который был ранее создан с помощью createContext.
export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('No such context! 😵')
  }
  return context;
}

