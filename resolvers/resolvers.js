import { getDataFromGeocodeMapsByAddress, 
    getDataFromGeocodeMapsByCoordinates, 
    getDataFromOpenMeteoByCoordinates, 
    getDataFromWqaiByCoordinates } from "../ApiHandlers/apiHandlers.js";


export const coordinates = async(args)=>{
    try{
        const addressDataArray= await getDataFromGeocodeMapsByAddress(args)
        
        return {
            latitude:addressDataArray[0].lat,
            longtitude: addressDataArray[0].lon,
        }
     }catch(error){
        console.error('coordinates ERROR: ', error)
        return null
    }
}

export const address = async(args)=>{
    try{
        const {latitude, longtitude} = args;
        const addressData= await getDataFromGeocodeMapsByCoordinates(Number(latitude), Number(longtitude))
        const weatherData = await weather({latitude: addressData.lat,longtitude: addressData.lon,})
        const airQualityData = await airQuality({latitude: addressData.lat, longtitude: addressData.lon,})

        return {
            fullAddress: addressData.display_name,
            country: addressData.address.country,
            state: addressData.address.state,
            postalCode:  addressData.address.postcode,
            countryCode: addressData.address.country_code,
            city: addressData.address.city,
            town: addressData.address.town,
            village: addressData.address.village,
            weather: weatherData,
            airQuality: airQualityData,
        }
    }catch(error){
        console.error('address ERROR: ', error)
        return null
    }
}

export const weather = async(args)=>{
    try{
        const {latitude, longtitude} = args;
        const weatherData= await getDataFromOpenMeteoByCoordinates(latitude, longtitude);
        return {
            temperature: weatherData.current.temperature_2m,
            rain:  weatherData.current.rain ,
            snowfall: weatherData.current.snowfall ,
            showers: weatherData.current.showers ,
            cloudCover: weatherData.current.cloud_cover ,
            seaLevelPressure: weatherData.current.pressure_msl ,
            surfacePressure: weatherData.current.surface_pressure ,
            windSpeed: weatherData.current.wind_speed_10m ,
            windDirection: weatherData.current.wind_direction_10m ,
            windGust: weatherData.current.wind_gusts_10m ,
        }
    }catch(error){
        console.error('weather ERROR: ', error)
        return null
    }
    

}


export const airQuality = async(args)=>{
    try{
        const {latitude, longtitude} = args;
        const airQualityData= await getDataFromWqaiByCoordinates(latitude, longtitude);
        return {
            co: airQualityData.data.iaqi.co.v,
            dewPoint: airQualityData.data.iaqi.dew.v,
            pm25: airQualityData.data.iaqi.pm25.v,
            pm10: airQualityData.data.iaqi.pm10.v,
            no2: airQualityData.data.iaqi.no2.v,
        }
     }catch(error){
        console.error('airQuality ERROR: ', error)
        return null
    }

}