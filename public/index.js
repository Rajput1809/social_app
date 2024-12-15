let extractedSuburb = null; // Global variable to store suburb

const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by your browser.");
    }

    async function showPosition(position) {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;

        const des = document.querySelector("#details");
        des.innerHTML = `Latitude: ${lat} <br> Longitude: ${long}`;

        try {
            const response = await fetch(
                `https://api.opencagedata.com/geocode/v1/json?key=1d35cc9758fb4a5c91732691f23aba0a&q=${lat}+${long}&pretty=1`
            );
            const data = await response.json();

            if (data.results && data.results[0]) {
                const suburb = data.results[0].components.suburb || "Suburb not found";
                extractedSuburb = suburb; // Store in global variable
                des.innerHTML += `<br><strong>Suburb:</strong> ${suburb}`;
            } else {
                des.innerHTML += "<br>Location details could not be retrieved.";
            }
        } catch (error) {
            console.error("Error fetching location details:", error);
            des.innerHTML += "<br>Error retrieving location data.";
        }
    }

    function showError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                alert("Permission denied for location access.");
                break;
            case error.POSITION_UNAVAILABLE:
                alert("Location unavailable.");
                break;
            case error.TIMEOUT:
                alert("Location request timed out.");
                break;
            default:
                alert("An unknown error occurred.");
        }
    }
};

async function getEngineerDetails() {
    const suburb = document.getElementById("suburb").innerText.split(": ")[1]; // Suburb value
    if (!suburb) {
        alert("Please retrieve the location first.");
        return;
    }

    try {
        console.log("Fetching engineer details for suburb:", suburb);

        // Correct URL: Replace `localhost:3000` if needed
        const response = await fetch(`http://localhost:3000/api/engineer-details?suburb=${suburb}`);
        
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        console.log("Engineer Details:", data);

        // Display fetched data
        alert(`Chief Engineer: ${data["Chief Engineer"]}, Telephone-1: ${data["Telephone-1"]}`);
    } catch (error) {
        console.error("Error fetching engineer details:", error);
        alert("Failed to fetch engineer details. Please try again.");
    }
};

