window.addEventListener("load", () => {
  var long;
  var lat;
  var temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  var temperatureDegree = document.querySelector(".temperature-degree");
  var locationTimezone = document.querySelector(".location-timezone");
  var temperatureSection = document.querySelector(".temperature");
  var temperatureSpan = document.querySelector('.temperature span');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = `https://cors-anywhere.herokuapp.com/`;
      const api = `${proxy}https://api.darksky.net/forecast/0840fdbdc19596154dc23613a42694a8/${lat},${long}`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          const { temperature, summary, icon } = data.currently;
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
          var celsius = (temperature - 32) * (5 / 9);
          setIcons(icon, document.querySelector(".icon"));

          temperatureSection.addEventListener('click', () => {
              if (temperatureSpan.textContent === 'F') {
                  temperatureSpan.textContent = 'C';
                  temperatureDegree.textContent = Math.floor(celsius);
              } else {
                  temperatureSpan.textContent = 'F';
                  temperatureDegree.textContent = temperature;
              }
          })
        });
    });
  }
  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
