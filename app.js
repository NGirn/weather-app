window.addEventListener("load", () => {
  var long;
  var lat;
  var temperatureDescription = document.querySelector('.temperature-description');
  var temperatureDegree = document.querySelector('.temperature-degree');
  var locationTimezone = document.querySelector('.location-timezone');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = `https://cors-anywhere.herokuapp.com/`
      const api = `${proxy}https://api.darksky.net/forecast/0840fdbdc19596154dc23613a42694a8/${lat},${long}`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          const {temperature, summary, icon} = data.currently;
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
          setIcons(icon, document.querySelector('.icon'));
          
        });
    });
  }
  function setIcons(icon, iconID){
      const skycons = new Skycons({color: 'white'});
      const currentIcon = icon.replace(/-/g, '_').toUpperCase();
      skycons.play();
      return skycons.set(iconID, Skycons[currentIcon]);
  }
});
