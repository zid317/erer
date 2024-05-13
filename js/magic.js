





function country(){
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            getCountry(position.coords.latitude, position.coords.longitude);
        }, function(error) {
            handleLocationError(error);
        });
    } else {
        console.log("do not support");
        alert("Magic can't determine your location ");
    }
};

function handleLocationError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            console.error("The user rejected the geolocation request.");
            alert("You have rejected the call of magic to you( Turn on geolocation)");
            break;
        case error.POSITION_UNAVAILABLE:
            console.error("Location information is not available.");
            alert("Magic can't determine your location ");
            break;
        case error.TIMEOUT:
            console.error("The request to retrieve the user's location has expired.");
            alert("The request to retrieve the user's location has expired.");
            break;
        default:
            console.error("There's been an unknown error.");
            alert("This is the first time the magical world has encountered such a thing ");
    }
}

function getCountry(latitude, longitude) {
    if (!navigator.onLine) {
        alert("No connection to the magic, check the internet.");
        console.error("No internet");
        return;
    }

    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=en`;
    // &accept-language=en for language preference

    fetch(url)
        .then(response => response.json())
        .then(data => {

            console.log("Country: ", data.address.country);
            document.getElementById('text').textContent = data.address.country;
        })
        .catch(error => {
            console.error("error to geo ", error);
        });
}
const face = document.getElementById('face');
var  chooise = 0;
function randowAnswer(){

    const randomNumber = Math.floor(Math.random() * 8);
    switch (randomNumber) {
        case 0:
            eightBall = 'It is certain'
            break;
        case 1:
            eightBall = 'It is decidedly so'
            break;
        case 2:
            eightBall = 'Reply hazy try again'
            break;
        case 3:
            eightBall = 'Cannot predict now'
            break;
        case 4:
            eightBall = 'Do not count on it'
            break;
        case 5:
            eightBall = 'My sources say no'
            break;
        case 6:
            eightBall = 'Outlook not so good'
            break;
        case 7:
            eightBall = 'Signs point to yes'
            break;
    }
    document.getElementById('text').textContent = eightBall;
};
document.querySelector('.magic-answer').addEventListener('click', function(){
    chooise = 2;
})
document.querySelector('.magic-country').addEventListener('click', function(){
    chooise = 1;
})
document.querySelector('.magic-refresh').addEventListener('click', function(){
    document.getElementById("svgPath").setAttribute("fill", getRandomColor());
    if (chooise == 1){
        country()
    }
    else if (chooise == 2){
        randowAnswer()
    }
    else {document.getElementById('text').textContent = "Ask your question";}
})


function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

