let map;
let marker;
let geocoder;
let responseDiv;
let response;

// add a window submit event handler
// call google map api to retrieve longitute 
// and latitute from a valid address

addEventListener("submit",
  function (event) {
    event.preventDefault();
    // execute timeout function
    // set time out for 3s
    setTimeout(logTimeout, 3000);
    // get address
    const addr = getFullAddress(buildAddress());
    // execute geocode function using input address
    geocode({ address: addr });
  });

// timeout function
const logTimeout = function() {
    console.log('Timeout called');
}
    
//build address Object
function buildAddress() {
  const strAdr = document.getElementById('street').value;
  const city = document.getElementById('city').value;
  const state = document.getElementById('state').value;
  const zip = document.getElementById('zip').value;
  const addrObj = { street: strAdr, city: city, stat: state, zip: zip };

  return addrObj;
}

// get full address input from user
function getFullAddress(adrObj) {
  const strAdr = adrObj['street'];
  const city = adrObj['city'];
  const state = adrObj['state'];
  const zip = adrObj['zip'];

  return `${strAdr}, ${city}, ${state}.${zip}`;
}

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    // default to US White House location
    center: { lat: 38.8976633, lng: -77.0365739 },
    mapTypeControl: false,
  });
  geocoder = new google.maps.Geocoder();

  const inputText = document.createElement("input");

  inputText.type = "text";
  inputText.placeholder = "Enter a location";

  const submitButton = document.createElement("input");

  submitButton.type = "button";
  submitButton.value = "Geocode";
  submitButton.classList.add("button", "button-primary");

  const clearButton = document.createElement("input");

  clearButton.type = "button";
  clearButton.value = "Clear";
  clearButton.classList.add("button", "button-secondary");
  response = document.createElement("pre");
  response.id = "response";
  response.innerText = "";
  responseDiv = document.createElement("div");
  responseDiv.id = "response-container";
  responseDiv.appendChild(response);

  const instructionsElement = document.createElement("p");

  instructionsElement.id = "instructions";
  instructionsElement.innerHTML =
    "<strong>Instructions</strong>: Enter an address in the textbox to geocode or click on the map to reverse geocode.";
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputText);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(submitButton);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(clearButton);
  map.controls[google.maps.ControlPosition.LEFT_TOP].push(instructionsElement);
  map.controls[google.maps.ControlPosition.LEFT_TOP].push(responseDiv);
  marker = new google.maps.Marker({
    map,
  });
  map.addListener("click", (e) => {
    geocode({ location: e.latLng });
  });
  submitButton.addEventListener("click", () =>
    geocode({ address: inputText.value })
  );
  clearButton.addEventListener("click", () => {
    clear();
  });
  clear();
}

function clear() {
  marker.setMap(null);
  responseDiv.style.display = "none";
}

function geocode(request) {
  clear();
  geocoder
    .geocode(request)
    .then((result) => {
      const { results } = result;

      map.setCenter(results[0].geometry.location);
      marker.setPosition(results[0].geometry.location);
      marker.setMap(map);
      responseDiv.style.display = "block";
      // build object to hold address, longitude and latitute
      const obj = {
        Address: results[0].formatted_address,
        Latitude: results[0].geometry.location.lat(),
        Longitude: results[0].geometry.location.lng()
      };

      response.innerText = JSON.stringify(obj, null, 2);
      return results;
    })
    .catch((e) => {
      alert("Geocode was not successful for the following reason: " + e);
    });
}