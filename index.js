import { createHandler } from 'graphql-http/lib/use/express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import express from 'express';
import { airQuality, coordinates, address, weather } from './resolvers/resolvers.js';
 

const sdl = `
  type Query {
  coordinates(postalCode: Int = null, city: String = null, state: String = null, country: String = null, countryCode: String = null): Coordinates
  address(latitude: Float, longtitude: Float): Address

}

type Coordinates {
  latitude: String!
  longtitude: String!
  address: Address
  weather: Weather
  airQuality: AirQuality
}

type Address {
  fullAddress: String
  country: String
  state: String
  postalCode: String
  countryCode: String
  city: String
  town: String
  village: String
  weather: Weather
  airQuality: AirQuality
  coordinates: Coordinates
}

type Weather{
  temperature: Float
  rain: Float
  snowfall: Float
  showers: Float
  cloudCover: Float
  seaLevelPressure: Float
  surfacePressure: Float
  windSpeed: Float
  windDirection: Float
  windGust: Float
}

type AirQuality{
  co: Float
  dewPoint: Float
  pm25: Float
  pm10: Float
  no2: Float
}`


const resolvers = { 
    Query: {
    coordinates: async (parent, args)=> await coordinates(args), 
    address: async(parent, args)=> await address(args)
    },
    
    Coordinates: {
      latitude: async (parent)=>parent.latitude,
      longtitude: async (parent)=>parent.longtitude,
      weather: async (parent)=>await weather(parent),
      airQuality:  async (parent)=>await airQuality(parent),
      address: async(parent)=>await address(parent)
    },

    Address:{
      fullAddress: async (parent)=> parent.fullAddress,
      country: async (parent)=>parent.country,
      state: async (parent)=>parent.state,
      postalCode:async (parent)=>parent.postalCode,
      countryCode: async (parent)=>parent.countryCode,
      city: async (parent)=>parent.countryCode,
      town: async (parent)=>parent.town,
      village: async (parent)=>parent.village,
      weather: async (parent)=>parent.weather,
      airQuality: async (parent)=>parent.airQuality,
      coordinates: async (parent)=>await coordinates(parent), 
    },

    Weather:{
        temperature: async (parent)=>parent.temperature,
        rain: async (parent)=>parent.rain,
        snowfall: async (parent)=>parent.snowfall,
        showers: async (parent)=>parent.showers,
        cloudCover: async (parent)=>parent.cloudCover,
        seaLevelPressure: async (parent)=>parent.seaLevelPressure,
        surfacePressure: async (parent)=>parent.surfacePressure,
        windSpeed: async (parent)=>parent.windSpeed,
        windDirection:async (parent)=>parent.windDirection ,
        windGust: async (parent)=>parent.windGust,
    },

    AirQuality: {
      co: async (parent)=>parent.co,
      dewPoint: async (parent)=>parent.co,
      pm25: async (parent)=>parent.co,
      pm10: async (parent)=>parent.co,
      no2: async (parent)=>parent.co,
    }

 }

const schema = makeExecutableSchema({
  typeDefs: sdl,
  resolvers: resolvers
})
 
const app = express();

app.all(
  '/graphql',
  createHandler({
    schema: schema,
    rootValue: resolvers,
  }),
);

app.listen(4010);
console.log('Running a GraphQL API server at http://localhost:4010/graphql');

 