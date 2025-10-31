import './styles/style.css';
import { WeatherController } from './controllers/weather-controller.js';

window.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('weatherApp');
  const controller = new WeatherController();
  controller.initialize(rootElement);
});
