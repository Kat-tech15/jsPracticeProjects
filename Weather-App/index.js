async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const apiKey = "6503488b001059cdd59e67956c740a1b";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || "City not found");
        }

        
        showWeather(data);
    } catch (error) {
        document.getElementById("weatherResult").innerHTML =
        `<p style="color:red;">${error.message}</p>`;
        console.error("Weather API Error:", error);

    }
}

function showWeather(data) {
    const resultDiv = document.getElementById("weatherResult");
    const temp = data.main.temp;
    const desc = data.weather[0].description;
    const icon = data.weather[0].icon;

    resultDiv.innerHTML = `
    <h3>${data.name}</h3>
    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}">
     <p><strong>${temp}°C</strong> </p>  
     <p style="text-transform: capitalize;">${desc}</p>
     `;
}