// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   const planetBox = document.getElementById("missionTarget");

    planetBox.innerHTML = 
               `<h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter} </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance} </li>
                    <li>Number of Moons: ${moons} </li>
                </ol>
                <img src="${imageUrl}">`
   
}

function validateInput(testInput) {
    let numInput = Number(testInput);
   if (testInput === ""){
       return "empty";
   } else if (isNaN(numInput)){
       return "not a number";
   } else if (isNaN(numInput) === false){
       return "is a number";
   }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let cargo = document.getElementById("cargoStatus");
    let fuel = document.getElementById("fuelStatus");

    if (validateInput(pilot) === "empty" || validateInput(copilot) === "empty" || validateInput(fuelLevel) === "empty" || validateInput(cargoLevel) === "empty") {
        alert("All fields are required to fill out");
    } else if (validateInput(pilot) === "is a number" || validateInput(copilot) === "is a number" || validateInput(fuelLevel) === "not a number" || validateInput(cargoLevel) === "not a number" ) {
        alert("Make sure to put in valid information for each field");
    } else {
        list.style.visibility = "visible";
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
        let launchStatus = document.getElementById("launchStatus");
        if (fuelLevel < 10000 && cargoLevel <= 10000) {
            fuel.innerHTML = "Fuel level too low for launch";
            cargo.innerHTML = "Cargo mass low enough for launch"
            launchStatus.innerHTML = "Shuttle Not Ready for Launch";
            launchStatus.style.color = "#C7254E";
        } else if (fuelLevel >= 10000 && cargoLevel > 10000) {
            fuel.innerHTML = "Fuel level high enough for launch"
            cargo.innerHTML = "Cargo mass too heavy for launch";
            launchStatus.innerHTML = "Shuttle Not Ready for Launch";
            launchStatus.style.color = "#C7254E";
        } else if (fuelLevel < 10000 && cargoLevel > 10000) {
            fuel.innerHTML = "Fuel level too low for launch";
            cargo.innerHTML = "Cargo mass too heavy for launch";
            launchStatus.innerHTML = "Shuttle Not Ready for Launch";
            launchStatus.style.color = "#C7254E";
        } else {
            fuel.innerHTML = "Fuel level high enough for launch"
            cargo.innerHTML = "Cargo mass low enough for launch"
            launchStatus.innerHTML = "Shuttle is Ready for Launch";
            launchStatus.style.color = "#419F6A";
        }   
    }
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch('https://handlers.education.launchcode.org/static/planets.json').then( function(response) {
    return response.json()        
});

    return planetsReturned;
}

function pickPlanet(planets) {
    let randomPlanetIndex = Math.floor(Math.random()*planets.length);
    return planets[randomPlanetIndex];
}


module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
