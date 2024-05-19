document.addEventListener("DOMContentLoaded", function() {
    const centerCoords = { lat: -8.7467357, lng: 115.1668024 };

    const map = L.map('map').setView([centerCoords.lat, centerCoords.lng], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const marker = L.marker([centerCoords.lat, centerCoords.lng], { draggable: true }).addTo(map);

    const infoWindow = L.popup().setContent("Ini adalah Marker");
    marker.bindPopup(infoWindow).openPopup();

    document.getElementById('latitude').value = centerCoords.lat;
    document.getElementById('longitude').value = centerCoords.lng;

    marker.on('dragend', function(event) {
        const newPosition = event.target.getLatLng();
        document.getElementById('latitude').value = newPosition.lat;
        document.getElementById('longitude').value = newPosition.lng;
        marker.bindPopup(`Koordinat: ${newPosition.lat}, ${newPosition.lng}`).openPopup();
    });

    document.getElementById('searchButton').addEventListener('click', function() {
        const lat = parseFloat(document.getElementById('latitude').value);
        const lng = parseFloat(document.getElementById('longitude').value);
        const newCoords = { lat: lat, lng: lng };

        marker.setLatLng(newCoords);
        map.setView(newCoords);
        marker.bindPopup(`Koordinat: ${lat}, ${lng}`).openPopup();
    });

    marker.on('click', function() {
        marker.bindPopup("Ini adalah Marker").openPopup();
    });
});
