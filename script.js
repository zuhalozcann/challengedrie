 
// on page load show map
window.onload = function() {
	initMap();
	getAPIdataOrlando();
	
};
document.getElementById("california").onclick = function(){
	getAPIdataOrlando('los angeles, us');
	document.getElementById('plek').innerHTML = '<h1>Landingsplaats</h1>';
	document.getElementById('stad').innerHTML = 'Los Angeles';
	document.getElementById('landingsplaats').src = "../challenge3/1.jpg";
	date();

};
document.getElementById("tenessee").onclick = function(){
	getAPIdataOrlando('nashville, us');
	document.getElementById('stad').innerHTML = 'Nashville';
	document.getElementById('landingsplaats').src = "../challenge3/3.jpg";

	date();
};


//temperatuur
function getAPIdataOrlando(stad) {

	// construct request
	var url = "https://api.openweathermap.org/data/2.5/weather";
	var apiKey ="b0c8dafa512a0134e90df6ece3c2b7a2";
	var city = stad;
	
	// construct request
	var request = url + "?" + "appid=" + apiKey + "&" + "q=" + city;

	// get current weather
	fetch(request)	
	
	// parse response to JSON format
	.then(function(response) {
		return response.json();
	})
	
	// do something with response
	.then(function(response) {
		// show full JSON object
		console.log(response);
		var temperatuur = Math.round(response.main.temp - 273.25) ;
		var mintemp = Math.round((response.main.temp_min - 273.25) *10) / 10;
		var maxtemp = Math.round(response.main.temp_max - 273.25) ;
		var visibility = response.visibility;
		var speed = response.wind.speed;
		var weather = response.weather[0].description;
		var bericht = 'geen informatie';

		if( weather == 'clear sky'){
			weather = 'zonnig';
			bericht = 'zonnige dag'
		}
		if( weather == 'few clouds'){
			weather = 'beetje bewolkt';
			bericht = 'een paar wolken'
		}
		if( weather == 'scattered clouds'){
			weather = 'verstrooide wolken';
			bericht = 'bewolking'
		}
		if( weather == 'broken clouds'){
			weather = 'gebroken lucht';
			bericht = 'bewolking met een beetje zon'
		}
		if( weather == 'shower rain'){
			weather = 'regenachtig';
			bericht = 'veel regenbuien'
		}
		if( weather == 'rain'){
			weather = 'regenachtig';
			bericht = 'veel regen'
		}
		if( weather == 'thunderstorm'){
			weather = 'onweer';
			bericht = 'onweersbuien'
		}
		if( weather == 'snow'){
			weather = 'sneeuw';
			bericht = 'sneeuwstormen'
		}
		if( weather == 'fog' || weather=='mist'){
			weather = 'mistig';
			bericht = 'slecht zicht'
		}
		

		document.getElementById('graden').innerHTML = 	temperatuur + "&deg;" ;
		
		

	})
	// catch error
	.catch(function (error) {
		console.log('Request failed', error);
	});
}

//tijd
function date(){
 var today = new Date();
 var date = today.getDate();
  var weekday = new Array(7);
        weekday[0] = "Zondag";
        weekday[1] = "Maandag";
        weekday[2] = "Dinsdag";
        weekday[3] = "Woensdag";
        weekday[4] = "Donderdag";
        weekday[5] = "Vrijdag";
        weekday[6] = "Zaterdag";

        var month = new Array(11);
        month[0] = "januari";
        month[1] = "februari";
        month[2] = "maart";
        month[3] = "april";
        month[4] = "mei";
        month[5] = "juni";
        month[6] = "juli";
        month[7] = "augustus";
        month[8] = "September";
        month[9] = "oktober";
        month[10] = "november";
        month[11] = "december";
 
 var dag = weekday[today.getDay()];
 var maand = month[today.getMonth()];
 document.getElementById("day").innerHTML =  dag + ", " + date + " " + maand ;
};




// init map
var myMap;

function initMap() {

//style
	var kleuren = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8ab0bd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#286361"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#f9f9f9"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#da795c"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels",
    "stylers": [
      {
        "color": "#a22509"
      },
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e57668"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#d9d9d9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#89BEC4"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#286361e"
      }
    ]
  }
];
	// set optios for map 
	var mapOptions = {
		center: {
			lat: 36.015596, 
			lng: -97.104557
		},
		zoom: 4,
		styles: kleuren,
	};

	// create map and add to page
	myMap = new google.maps.Map(document.getElementById('map'), mapOptions);



	//create marker for kennedy space center
	var hhsMarker = new google.maps.Marker({
		position: {
			lat: 28.5728722, 
			lng: -80.6489808,
		},
		map: myMap,
		title: 'Kennedy Space Center',
	});

	//create marker for Cape Canaveral
	var hhsMarker = new google.maps.Marker({
		position: {
			lat: 28.474009, 
			lng: -80.577174,
		},
		map: myMap,
		title: 'Cape Canaveral',
	});


		//landingspot United Launchh Alliance tenessee
	var hhsMarker = new google.maps.Marker({
		position: {
			lat: 34.632888, 
			lng: -87.066211,
		},
		map: myMap,
		title: 'United Launch Alliance',
		icon: 'raket.png',
		//scaledSize: new google.maps.Size('20px', '20px'),
		animation: google.maps.Animation.BOUNCE,
	});



		//landingspot Vandenberg AirFoirce Base californie
	var hhsMarker = new google.maps.Marker({
		position: {
			lat: 34.755858, 
			lng:  -120.548581,
		},
		map: myMap,
		title: 'Vandenberg AirFoirce Base',
		icon: 'raket.png',
		animation: google.maps.Animation.BOUNCE,
	});
}


