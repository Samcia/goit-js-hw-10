import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const countryInfoEl = document.querySelector('.country-info');
const countryListEl = document.querySelector('.country-list');

const onInput = debounce(evt => {
  const name = evt.target.value.trim();
  if (!name) {
    countryInfoEl.innerHTML = '';
    countryListEl.innerHTML = '';
    return;
  }
  fetchCountries(name)
    .then(selectCountry)
    .catch(error => console.log(error));
}, DEBOUNCE_DELAY);

const selectCountry = countries => {
  const arrayLength = countries.length;
  if (arrayLength > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    countryInfoEl.innerHTML = '';
    countryListEl.innerHTML = '';
    return;
  }
  if (arrayLength === 1) {
    countryListEl.innerHTML = '';
    return renderCountryInfo(countries);
  }
  if (arrayLength <= 10 && arrLength > 1) {
    countryInfoEl.innerHTML = '';
    return renderCountriesAll(countries);
  }
};

const renderCountryInfo = countries => {
  const markup = countries
    .map(country => {
      return `<div class="country">
      <img src="${country.flags.svg}" width="220" height="110" alt="flag of ${
        country.name.official
      }">
      <h2 class="country-title">${country.name.official}</h2></div>
            <p><b>Capital</b>: ${country.capital}</p>
            <p><b>Population</b>: ${country.population}</p>
            <p><b>Languages</b>: ${Object.values(country.languages)}</p>`;
    })
    .join('');
  countryInfoEl.innerHTML = markup;
};

const renderCountriesAll = countries => {
  const markup = countries
    .map(country => {
      return `<li class="country">
      <img src="${country.flags.svg}" width="220" height="110" alt="flag of ${country.name.official}">
      <p>${country.name.official}</p></li>`;
    })
    .join('');
  countryListElinnerHTML = markup;
};

inputEl.addEventListener('input', onInput);
