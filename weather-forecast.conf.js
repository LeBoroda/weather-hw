import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

module.exports = {
  env: {
    OPEN_WEATHER_KEY: process.env.OPEN_WEATHER_KEY,
    GOOGLE_MAPS_KEY: process.env.GOOGLE_MAPS_KEY,
  },
};
