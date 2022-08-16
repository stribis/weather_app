

document.querySelector('form').addEventListener('submit', e => {
  e.preventDefault()
  const city = document.querySelector('#city').value
  const api_key = '108c1179d5f49e7ba876cdd2b2e7f156'
  const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`

  getData(api_url)

})


async function getData (api_url) {
  const response = await fetch(api_url)
  const data = await response.json()
  writeData(data)

}


function writeData (data) {
  console.log(data)
  let template= ''
  document.querySelector('.output').innerHTML = ''
  if (data.cod != 404) {
    template = `
    <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">
    <div>It is</div>
    <div class="temp">${data.main.temp}°C</div>
    <div>in ${data.name}</div>
    <div class="description">
      <p>It feels like <span class="feels">${data.main.feels_like}°C</span>. <span style="text-transform:capitalize">${data.weather[0].description}.</span></p>
      <ul>
        <li title="WSW"><i class="fa-solid fa-circle-chevron-up" style="transform: rotate(${data.wind.deg}deg);"></i> ${data.wind.speed}m/s</li>
        <li><i class="fa-solid fa-droplet"></i> Humidity: ${data.main.humidity}%</li>
        <li><i class="fa-brands fa-cloudscale"></i> ${data.main.pressure}hPa</li>
        <li><i class="fa-solid fa-eye"></i> Visibility: ${data.visibility}m</li>
      </ul>
    </div>
    `
  } else {
    template = 'No such city found'
  }


  document.querySelector('.output').innerHTML = template
}

// Dark Mode Toggle

document.querySelector('header > h1 > i').addEventListener('click', e => {
  document.body.classList.toggle('dark')
  document.querySelector('header > h1 > i').classList.toggle('fa-moon')
  document.querySelector('header > h1 > i').classList.toggle('fa-sun')

})