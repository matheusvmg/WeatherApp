import React from 'react'
import './App.css'
import Img from './images/undraw_weather_app_i5sm.svg'
import Card from './components/Card'

function App() {
	return (
	<div className="App">
	  <h1>WeatherApp</h1>
	  <img src={Img} id="img-principal"/>
	  <Card />
	</div>
	)
}

export default App
