//Declare all Dom elements we need

const room = document.querySelector('.room-container');
const movieSelected = document.getElementById('movie-selected');
const selectedSeatsCounter = document.getElementById('count');
const totalPrice = document.getElementById('total-price');

const seatsNotOccupied = document.querySelectorAll('.row .seat:not(.occupied)');

populateUIfromStorage();

let priceOfSelectedMovie = +movieSelected.value;


//Load data from localStorage and populate UI
function populateUIfromStorage() {
    const selectedSeatsIndex = JSON.parse(
        localStorage.getItem('seatsSelected')
    );

    if (selectedSeatsIndex !== null && selectedSeatsIndex.length > 0) {
        selectedSeatsIndex.forEach(index =>
            seatsNotOccupied[index].classList.toggle('selected')
        );
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
        movieSelected.selectedIndex = selectedMovieIndex;
    }
}

//Store index of selected movie and the respective price
function storeCurrentMovieStatus(movieIndex) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
}

//Updates Seat and Total price status
function updateCurrentStatus() {
    const seatsSelected = document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...seatsSelected].map(seat =>
        [...seatsNotOccupied].indexOf(seat)
    );

    localStorage.setItem('seatsSelected', JSON.stringify(seatsIndex));

    const numberOfSeatsSelected = seatsSelected.length;

    selectedSeatsCounter.innerText = numberOfSeatsSelected;

    totalPrice.innerText = numberOfSeatsSelected * priceOfSelectedMovie;
}

//Add event listeners
movieSelected.addEventListener('change', event => {

    priceOfSelectedMovie = +event.target.value;

    storeCurrentMovieStatus(event.target.selectedIndex);

    updateCurrentStatus();
});

room.addEventListener('click', event => {
    const seatAvailable =
        event.target.classList.contains('seat') &&
        !event.target.classList.contains('occupied');

    if (seatAvailable) {
        event.target.classList.toggle('selected');
        updateCurrentStatus();
    }
});

updateCurrentStatus();