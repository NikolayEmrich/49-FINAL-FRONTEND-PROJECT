import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import styles from './homePage.module.css'
import { useCart } from "../../context/CartContext";

interface IFormData {
  name: string;
}

interface IWeatherForecast {
      id: number;
      main: string;
      description: string;
      icon: string;
}

export interface IWeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: IWeatherForecast[]
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

const initial: IWeatherData = {
  coord: {
    lon: 0,
    lat: 0
  },
  weather: [],
  base: "",
  main: {
    temp: 0,
    feels_like: 0,
    temp_min: 0,
    temp_max: 0,
    pressure: 0,
    humidity: 0,
    sea_level: 0,
    grnd_level: 0
  },
  visibility: 0,
  wind: {
    speed: 0,
    deg: 0
  },
  clouds: {
    all: 0
  },
  dt: 0,
  sys: {
    type: 0,
    id: 0,
    country: "",
    sunrise: 0,
    sunset: 0
  },
  timezone: 0,
  id: 0,
  name: "Type your city",
  cod: 0
}

// Схема валидации
const schema = Yup.object().shape({
  name: Yup.string()
    .typeError("Ваше имя должно состоять из букв")
    .required("Поле обязательно к заполнению"),
});

export default function HomePage() {
  // * переменная состояния для данных с сервера
  const [weatherData, setWeatherData] = useState<IWeatherData>(initial);

  // Добавление массива для возможности вывода нескольких информационных блоков погоды
  const [weatherDataArray, setWeatherDataArray] = useState<IWeatherData[]>([]);

  // * функция обработчик для асинхронного запроса
  const fetchWeather = async (name: string) => {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=1b95faf402bdcf181431d0face850a53`);
    const data = await res.json();
    // console.log(data);

    if (data.cod === 200) {
      // Город найден, добавляем в массив
      setWeatherData(data);
      setWeatherDataArray((prevFacts) => [...prevFacts, data]);
    } else {
      // Город не найден, можно выводить сообщение-ошибку в браузер, но мы этого делать не будем.
      // Вместо этого мы будем этот пустой объект (emptyWeatherData) помещать в массив и отображать на странице Home
      // alert(`City not found: ${data.message}`);

      // Создаем объект с пустыми данными и ошибкой "404" в случае если API не найден.
      const emptyWeatherData: IWeatherData = {
        coord: { lon: 0, lat: 0 },
        weather: [],
        base: "",
        main: {
          temp: 0,
          feels_like: 0,
          temp_min: 0,
          temp_max: 0,
          pressure: 0,
          humidity: 0,
          sea_level: 0,
          grnd_level: 0,
        },
        visibility: 0,
        wind: { speed: 0, deg: 0 },
        clouds: { all: 0 },
        dt: 0,
        sys: {
          type: 0,
          id: 0,
          country: "N/A",
          sunrise: 0,
          sunset: 0,
        },
        timezone: 0,
        id: 0,
        name: `City not found: "${name}"`,
        cod: 404,
      };

      // Добавляем пустой объект типа IWeatherData, т.к. задача требует выводить на экран отдельный блок с сообщением "API error"
      setWeatherDataArray((prevFacts) => [...prevFacts, emptyWeatherData]);
    }
};

  // * объект с настройками формы
  const formik = useFormik({
    // начальные значения для формы
    initialValues: {
      name: "",
    } as IFormData,

    // действие, которое случится по нажатию кнопки с типом submit в форме
    onSubmit: (values: IFormData, { resetForm }) => {
      resetForm();
      fetchWeather(values.name);
    },
  });

  // Удаление элемента из массива по ID
  const deleteWeatherData = (id: number) => {
    setWeatherDataArray((prev) => prev.filter((_, index) => index !== id));
  };

  // Обращаемся к контексту корзины и забираем функцию добавления
  const { addToCart } = useCart();

  // Передаем в корзину объект с данными по продукту
  const addToCartFromWeather = (data: IWeatherData) => {
    addToCart(data);
  };

  return (
    
  <div className={`${styles.allPlace} ${styles.content}`}>
    <form className={styles.weatherForm} onSubmit={formik.handleSubmit}>
    <input placeholder={weatherData.name} onChange={formik.handleChange} value={formik.values.name} name="name" type="text" />
    <button type="submit">Search</button>
    </form>

    {weatherDataArray.map((data, id) => (
  <div key={id}>

    {data.cod !== 404 ? (
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
          <button onClick={() => addToCartFromWeather(data)}>Save</button>
          <button onClick={() => deleteWeatherData(id)}>Delete</button>
        </div>
      </div>

    ) : (

      <div className={styles.weatherFormForCity}>
      <div className={styles.weatherFormForApiError}>
          <h1>API error</h1>
          <span>{data.name}</span>
          <span>Something went wrong with API data.</span>
      </div>

      <div className={styles.weatherFormForButton}>
        <button onClick={() => deleteWeatherData(id)}>Delete</button>
      </div>
    </div>
    
    )}
  </div>
))}
  </div>
  )
}
