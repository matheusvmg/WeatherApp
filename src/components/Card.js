import React, {useState, useEffect} from 'react'
import '../styles/Card.css'
import {usePosition} from 'use-position'

const Card = () => {

	const [temperature, setTemperature] = useState({
		temp: ''
	})

	const [description, setDescription] = useState({
		desc: ''
	})

	const [city, setCity] = useState({
		city: ''
	})

	//get the user location and observe if changes
	const watch = true
	const {latitude, longitude, timestamp, accuracy, error} = usePosition(watch)

	//API URL
	var url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=pt&appid=a6677550ecb42f11294126384b6528d8`

	useEffect(() => {
		const getData = async () => {
			try{
				console.log(latitude,longitude)
				const res = await fetch(url)
				const response = await res.json()
				console.log(response)
				setCity({
					city: response.name
				})
				let d = response.weather.map((desc) => {return desc.description})
				let t = response.main.temp
				convKenviltoCelsius(t)
				setDescription({
					desc: d 
				})
			}catch(err){
				console.log(`cannot get the data, error ${err}`)
			}
			
		}

		getData()

	},[latitude,longitude])

	//convert the temperature to celsius
	const convKenviltoCelsius = (tempKelvin) => {
		let celsius = tempKelvin -273.15
		setTemperature({
			temp: celsius
		})
	}

	const reloadPage = () => {
		window.location.reload(true)
	}

	return (
		<>
		<div className="card">
			<h3>temperatura:</h3>
			<div className="result">
				<p id="results">{`${Math.round(temperature.temp)}°C`}</p>
			</div>
			<h3>descrição:</h3>
			<p className="results2">{description.desc}</p>
			<h3>cidade:</h3>
			<p className="results2">{city.city}</p>
		</div>
		<button onClick={reloadPage}>Atualizar</button>
		</>
	)
}

export default Card