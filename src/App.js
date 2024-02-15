import React, { useState, useEffect } from 'react';
import './App.css';

const apiKey = '45a445a5379d4828be2790ebf0201460';

function App() {
  const [news, setNews] = useState([]);
  const [cityInput, setCityInput] = useState('');

  useEffect(() => {
    fetchLocalNews();
  }, []);

  const fetchLocalNews = async () => {
    try {
      const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
      const data = await response.json();
      setNews(data.articles);
    } catch (error) {
      console.error('Error fetching local news:', error);
    }
  };

  const searchNews = async () => {
    if (cityInput.trim() === '') {
      alert('Please enter a city name');
      return;
    }

    try {
      const response = await fetch(`https://newsapi.org/v2/everything?q=${cityInput}&apiKey=${apiKey}`);
      const data = await response.json();
      setNews(data.articles);
    } catch (error) {
      console.error('Error searching news:', error);
    }
  };

  return (
    <div className="App">
      <h1>Noticias</h1>
      <div className="news-list">
        {news.map((article, index) => (
          <div key={index} className="news-item">
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">Leer más</a>
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Ingrese una ciudad"
        value={cityInput}
        onChange={(e) => setCityInput(e.target.value)}
      />
      <button onClick={searchNews}>Buscar</button>
    </div>
  );
}

export default App;