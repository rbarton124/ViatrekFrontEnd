var localthingy = sessionStorage.getItem("itinerary");
console.log(localthingy);
var itin = JSON.parse(localthingy);

            // Render the destination, start date, and end date
            const destinationEl = document.getElementById('destination');
            destinationEl.innerText = itin.destination;

            const datesEl = document.getElementById('dates');
            datesEl.innerText = `${itin.start_date} - ${itin.end_date}`;

            //Render the mode of transportation and flight details
            const transportEl = document.getElementById('transportation');
            transportEl.innerText = `${itin.travel.mode_of_transportation}: ${itin.travel.travel_details.arrival_date} ${itin.travel.travel_details.arrival_time} - ${itin.travel.travel_details.departure_date} ${itin.travel.travel_details.departure_time}`;

            // Render the hotel details
            const hotelEl = document.getElementById('hotel');
            hotelEl.innerText = `Hotel: ${itin.travel.hotel.name}`;

            const checkInEl = document.getElementById('check-in');
            checkInEl.innerText = `Check-in: ${itin.travel.hotel.check_in_date}`;

            const checkOutEl = document.getElementById('check-out');
            checkOutEl.innerText = `Check-out: ${itin.travel.hotel.check_out_date}`;

            const apiKey = 'AIzaSyDd6noW5znBbemcByF-o7scCtpMZ-HqWi4';
            const cx = '31a4a650f687741bf';
            const num = 1;

            var query = itin.destination + " gorgeous";
            fetch(`https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&searchType=image&q=${encodeURIComponent(query)}&num=${num}&imgSize=huge&imgType=photo`)
                .then(response => response.json())
                .then(data => {
                        destThumbnail = data.items[0].link;

                        console.log(`url(${destThumbnail})`)
                        const destinationImageEl = document.querySelector('.section.destination-image');
                        destinationImageEl.style.backgroundImage = `url(${destThumbnail})`;
                });

                var query = itin.destination + " beautiful sunset";
            fetch(`https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&searchType=image&q=${encodeURIComponent(query)}&num=${num}&imgSize=huge&imgType=photo`)
                .then(response => response.json())
                .then(data => {
                        destThumbnailSec = data.items[0].link;

                        console.log(`url(${destThumbnailSec})`)
                        const backgroundImageEl = document.querySelector('.section.activitiesANDdining');
                        backgroundImageEl.style.backgroundImage = `url(${destThumbnailSec})`;
                        backgroundImageEl.style.backgroundSize = 'cover';
                });

                query = itin.travel.mode_of_transportation + " moving";
            fetch(`https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&searchType=image&q=${encodeURIComponent(query)}&num=${num}&imgSize=huge&imgType=photo`)
                .then(response => response.json())
                .then(data => {
                        transpoThumbnail = data.items[0].link;

                        console.log(`url(${transpoThumbnail})`)
                        const transpoImageEl = document.querySelector('.section.transportation-image');
                        transpoImageEl.style.backgroundImage = `url(${transpoThumbnail})`;
                });

                query = itin.travel.hotel.name + " lobby";
            fetch(`https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&searchType=image&q=${encodeURIComponent(query)}&num=${num}&imgSize=huge&imgType=photo`)
                .then(response => response.json())
                .then(data => {
                        accomThumbnail = data.items[0].link;

                        console.log(`url(${accomThumbnail})`)
                        const accomImageEl = document.querySelector('.section.accommodation-image');
                        accomImageEl.style.backgroundImage = `url(${accomThumbnail})`;
                });
            // Render the activities
            const activitiesEl = document.getElementById('activitiesANDdining');
            itin.activitiesANDdining.forEach(activity => {

                    // Create an HTML element for the activity
                    const activityEl = document.createElement('div');
                    activityEl.classList.add('activity');

                    let thumbnailUrl;
                    let imageEl;
                    fetch(`https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&searchType=image&q=${encodeURIComponent(activity.activity)}&num=${num}`)
                        .then(response => response.json())
                        .then(data => {
                                thumbnailUrl = data.items[0].link;
                                //image element
                                imageEl = document.createElement('img');
                                imageEl.src = thumbnailUrl;
                                activityEl.appendChild(imageEl);

                                //details element
                                const detailsEl = document.createElement('div');
                                detailsEl.classList.add('details');
                                activityEl.appendChild(detailsEl);

                                const dateEl = document.createElement('div');
                                dateEl.classList.add('date');
                                dateEl.innerText = activity.date;
                                detailsEl.appendChild(dateEl);

                                const timeEl = document.createElement('div');
                                timeEl.classList.add('time');
                                timeEl.innerText = `${activity.start_time} - ${activity.end_time}`;
                                detailsEl.appendChild(timeEl);

                                const nameEl = document.createElement('div');
                                nameEl.classList.add('name');
                                nameEl.innerText = activity.activity;
                                detailsEl.appendChild(nameEl);

                                const websiteEl = document.createElement('a');
                                websiteEl.classList.add('website');
                                websiteEl.href = activity.website;
                                websiteEl.target = '_blank';
                                websiteEl.innerText = 'Website';
                                detailsEl.appendChild(websiteEl);

                                const descriptionEl = document.createElement('div');
                                descriptionEl.classList.add('description');
                                descriptionEl.innerText = activity.description;
                                detailsEl.appendChild(descriptionEl);
                        })
                        .catch(error => {
                                console.error('Error searching for image:', error);

                        });

                    // Add the activity element to the activities container
                    activitiesEl.appendChild(activityEl);
            });