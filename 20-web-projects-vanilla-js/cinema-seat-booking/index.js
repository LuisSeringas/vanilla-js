//Declare all Dom elements we need

const room = document.querySelector('.room-container');
const movieSelected = document.getElementById('movie-selected');
const selectedSeatsCounter = document.getElementById('count');
const totalPrice = document.getElementById('total-price');

let priceOfSelectedMovie = +movieSelected.value

//Updates Seat and Total price status
function updateCurrentStatus() {

    const seatsSelected = document.querySelectorAll('.row .seat.selected').length 

    selectedSeatsCounter.innerText = seatsSelected; 
    
    totalPrice.innerText = seatsSelected * priceOfSelectedMovie; 
}

//Add event listener
movieSelected.addEventListener('change', (event) =>{

    console.log(event.target)
    priceOfSelectedMovie = +event.target.value;
    updateCurrentStatus()
});

room.addEventListener('click', (event) => {
    
    const seatAvailable = (event.target.classList.contains('seat') && !event.target.classList.contains('occupied'));
    
    if(seatAvailable) {
        event.target.classList.toggle('selected');
        updateCurrentStatus();
    }
    
});