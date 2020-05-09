
const countriesEl = document.getElementById('countries');
const toggleBtn = document.getElementById('togglebtn');
const fillterBtn = document.getElementById('fillter');
const fillterRegion = fillterBtn.querySelectorAll('li');
const searchBox = document.getElementById('search');
const modal = document.getElementById('modal');
const btnClose = document.getElementById('btn-close');

async function getCountry() {
    const response = await fetch('https://restcountries.eu/rest/v2/all');
    const countries = await response.json();
    console.log(countries);

    displayCountries(countries);
}
getCountry();
function displayCountries(countries) {
	countriesEl.innerHTML = '';

	countries.forEach(country => {
		const countryEl = document.createElement('div');
		countryEl.classList.add('card');

		countryEl.innerHTML = `
            <div>
                <img src="${country.flag}" alt="Germany" />
            </div>
            <div class="card-body">
                <h3 class="country-name">${country.name}</h3>
                <p>
                    <strong>Population:</strong>
                    ${country.population}
                </p>
                <p class="country-region">
                    <strong>Region:</strong>
                    ${country.region}
                </p>
                <p>
                    <strong>Capital:</strong>
                    ${country.capital}
                </p>
            </div>
        `;

		countryEl.addEventListener('click', () => {
			modal.style.display = 'flex';
			showCountryDetails(country);
		});

		countriesEl.appendChild(countryEl);
	});
}

function showCountryDetails(country) {
	const modalBody = modal.querySelector('.modal-body');
	const modalImg = modal.querySelector('img');

	modalImg.src = country.flag;

	modalBody.innerHTML = `
        <h2>${country.name}</h2>
        <p>
            <strong>Native Name:</strong>
            ${country.nativeName}
        </p>
        <p>
            <strong>Population:</strong>
            ${country.population}
        </p>
        <p>
            <strong>Region:</strong>
            ${country.region}
        </p>
        <p>
            <strong>Sub Region:</strong>
            ${country.subregion}
        </p>
        <p>
            <strong>Capital:</strong>
            ${country.capital}
        </p>
        <p>
            <strong>Top Level Domain:</strong>
            ${country.topLevelDomain[0]}
        </p>
        <p>
            <strong>Currencies:</strong>
            ${country.currencies.map(currency => currency.code)}
        </p>
        <p>
            <strong>Languages:</strong>
            ${country.languages.map(language => language.name)}
        </p>
        <p>
            <strong>Borders:</strong>
            ${country.borders.map(border => border)}
        </p>
    `;
}

toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});

fillterBtn.addEventListener('click', () => {
    fillterBtn.classList.toggle('open');
});

btnClose.addEventListener('click', () => {
    modal.style.display = 'none';
});

searchBox.addEventListener('input', e => {
    const { value } = e.target;
    // console.log(searchValue);
    const countryName = document.querySelectorAll('.country-name');

    countryName.forEach(name => {
        if (name.innerText.toLowerCase().includes(value.toLowerCase())) {
            name.parentElement.parentElement.style.display = 'block';
        } else {
            name.parentElement.parentElement.style.display = 'none';
        }
    })

});

fillterRegion.forEach(filter => {
    filter.addEventListener('click', () => {
        // console.log(filter.innerText)  
        const value = filter.innerText;
        const countryRegion = document.querySelectorAll('.country-region');

        countryRegion.forEach(region => {
            if (region.innerText.includes(value) || value === 'All') {
                region.parentElement.parentElement.style.display = 'block';
            } else {
                region.parentElement.parentElement.style.display = 'none';
            }
        })
    })
})