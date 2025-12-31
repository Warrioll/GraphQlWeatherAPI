import 'dotenv/config';
import axios from 'axios';

const GEOCODE_MAPS_KEY = process.env.GEOCODE_MAPS_KEY
const WAQI_KEY = process.env.WAQI_KEY

export const getDataFromGeocodeMapsByCoordinates = async(latitude, longtitude)=>{
    try{
        const response = await axios.get(`https://geocode.maps.co/reverse?lat=${latitude}&lon=${longtitude}&api_key=${GEOCODE_MAPS_KEY}`)
        return response.data
    }catch(error){
        console.error('getDataFromGeocodeMapsByCoordinates ERROR', '\n', error)
       
        return null
    }
}

export const getDataFromGeocodeMapsByAddress = async(address)=>{
    try{
        const {postalCode, city, state, country, countryCode} = address

        const params = []
        if(countryCode){params.push(`countrycodes=${countryCode}`)}
        else if(country ){params.push(`country=${country}`)}

        if(postalCode){params.push(`postalcode=${postalCode}`)}
        else {if(city ){params.push(`city=${city}`)} if(state){params.push(`state=${state}`)}}
     
        const response = await axios.get(`https://geocode.maps.co/search?${params.join('&')}&country=Polen&api_key=${GEOCODE_MAPS_KEY}`)
        return response.data
    }catch(error){
        console.error('getDataFromGeocodeMapsByAddress ERROR', '\n', error)
        return null
    }
}


export const getDataFromWqaiByCoordinates = async(latitude, longtitude)=>{
    try{
        const response = await axios.get(`https://api.waqi.info/feed/geo:${latitude};${longtitude}/?token=${WAQI_KEY}`)
        return response.data
    }catch(error){
        console.error('getDataFromWqaiByCoordinates ERROR', '\n', error)
        return null
    }
}


export const getDataFromOpenMeteoByCoordinates = async(latitude, longtitude)=>{
    try{
        const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longtitude}&current=temperature_2m,wind_speed_10m,relative_humidity_2m,rain,snowfall,showers,pressure_msl,wind_direction_10m,wind_speed_10m,surface_pressure,wind_gusts_10m,cloud_cover`)
        return response.data
    }catch(error){
        console.error('getDataFromOpenMeteoByCoordinates ERROR', '\n', error)
        return null
    }
}

