const url = "http://localhost:3000/films";

document.addEventListener('DOMContentLoaded', () => {
    // Initialize the movie data
    const moviePlaceholder = () => {
        fetch(url)
            .then(res => res.json())
            .then(content => {
                const firstMovie = content[0];  // Fetch the first movie in the array

                // Select the elements in HTML to display movie details
                const filmImg = document.getElementById("poster");
                const movieTitle = document.getElementById("filmTitle");
                const movieDescr = document.getElementById("movieDescription");
                const runningTime = document.getElementById("runtime");
                const showingTime = document.getElementById("showtime");
                const availTicket = document.getElementById("ticketsAvailable");
                const ticketBuy = document.getElementById("buyTicket");

                // Display the first movie details
                filmImg.src = firstMovie.poster;
                movieTitle.innerText = firstMovie.title;
                movieDescr.innerText = firstMovie.description;
                runningTime.innerText = `Runtime: ${firstMovie.runtime} minutes`;
                showingTime.innerText = `Showtime: ${firstMovie.showtime}`;
                availTicket.innerText = `Tickets Available: (${firstMovie.capacity - firstMovie.tickets_sold})`;

                let tickets = firstMovie.capacity - firstMovie.tickets_sold;

                // Make sure the Buy Ticket button is enabled initially if there are tickets available
                ticketBuy.disabled = tickets <= 0;

                ticketBuy.addEventListener('click', () => {
                    if (tickets > 0) {
                        tickets--;  // Decrease ticket count
                        availTicket.innerText = `Tickets Available: (${tickets})`;
                    }

                    // Disable the button if no tickets are left
                    if (tickets === 0) {
                        ticketBuy.disabled = true;
                        availTicket.innerHTML = `Tickets Available: <span class="badge bg-danger">SOLD OUT</span>`;
                    }
                });
            });
    };

    // Populate the movie list
    const movieDetails = () => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const filmData = data; // No need for data.films as the response directly provides an array
                const list = document.getElementById("showingMovie");

                filmData.forEach(item => {
                    const movieList = document.createElement("li");
                    movieList.classList.add("list-group-item", "border", "border-info", "sinema");
                    movieList.setAttribute('id', `${item.id}`);
                    movieList.innerText = item.title;

                    // Add event listener for clicking on a movie
                    movieList.addEventListener('click', () => {
                        const filmImage = document.getElementById("poster");
                        const filmTitle = document.getElementById("filmTitle");
                        const filmDescr = document.getElementById("movieDescription");
                        const runTime = document.getElementById("runtime");
                        const showTime = document.getElementById("showtime");
                        const availTickets = document.getElementById("ticketsAvailable");
                        const ticketBuy = document.getElementById("buyTicket");

                        // Display selected movie details
                        filmImage.src = item.poster;
                        filmTitle.innerText = item.title;
                        filmDescr.innerText = item.description;
                        runTime.innerHTML = `Runtime: ${item.runtime} minutes`;
                        showTime.innerText = `Showtime: ${item.showtime}`;
                        availTickets.innerText = `Tickets Available: (${item.capacity - item.tickets_sold})`;

                        let ticket = item.capacity - item.tickets_sold;

                        // Ensure the Buy Ticket button is enabled when tickets are available
                        ticketBuy.disabled = ticket <= 0;

                        // Handle ticket purchasing
                        ticketBuy.addEventListener('click', () => {
                            if (ticket > 0) {
                                ticket--;
                                availTickets.innerText = `Tickets Available: (${ticket})`;
                            }

                            if (ticket === 0) {
                                ticketBuy.disabled = true;
                                availTickets.innerHTML = `Tickets Available: <span class="badge bg-danger">SOLD OUT</span>`;
                            }
                        });
                    });

                    list.appendChild(movieList);
                });
            });
    };

    // Call both functions
    moviePlaceholder();
    movieDetails();
});
