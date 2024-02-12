const showList = [
    {
        DATE: "Mon Sept 09 2024",
        VENUE: "Ronald Lane",
        LOCATION: "San Francisco, CA"
    },
    {
        DATE: "Tue Sept 17 2024",
        VENUE: "Pier 3 East",
        LOCATION: "San Francisco, CA"
    },
    {
        DATE: "Sat Oct 12 2024",
        VENUE: "View Lounge",
        LOCATION: "San Francisco, CA"
    },
    {
        DATE: "Sat Nov 16 2024",
        VENUE: "Hyatt Agency",
        LOCATION: "San Francisco, CA"
    },
    {
        DATE: "Fri Nov 29 2024",
        VENUE: "Moscow Center",
        LOCATION: "San Francisco, CA"
    },
    {
        DATE: "Wed Dec 18 2024",
        VENUE: "Press Club",
        LOCATION: "San Francisco, CA"
    },

]


const mainSection = document.querySelector(".main");
// console.log(mainSection);
// const showSection = document.querySelector(".main__shows-section");
// console.log(showSection);
const showSection = document.createElement("section");
// console.log(showSection);
showSection.classList.add("main__shows-section");


const showTitle = document.createElement('h2');
showTitle.innerText = 'Shows';
showTitle.classList.add('main__shows-title');

mainSection.appendChild(showSection);
showSection.appendChild(showTitle);
//
for (let i = 0; i < showList.length; i++) {

    const showStyler = document.createElement("div"); //FIRST
    showStyler.classList.add("main__shows-styler");


    // showStyler.addEventListener('click',)


    const showDetailsStylerDate = document.createElement("div");
    showDetailsStylerDate.classList.add("main__shows-details-styler");
    const showDetailsStylerVenue = document.createElement("div");
    showDetailsStylerVenue.classList.add("main__shows-details-styler");
    const showDetailsStylerLocation = document.createElement("div");
    showDetailsStylerLocation.classList.add("main__shows-details-styler");


    const showButton = document.createElement("button");
    showButton.innerText = 'BUY TICKETS';
    showButton.classList.add("main__shows-button");

    const showDivider = document.createElement("hr");
    showDivider.classList.add("main__shows-divider");


    const showSubtitleDate = document.createElement('h6');
    showSubtitleDate.innerText = 'DATE';
    showSubtitleDate.classList.add('main__shows-subtitle');

    const showSubtitleVenue = document.createElement('h6');
    showSubtitleVenue.innerText = 'VENUE';
    showSubtitleVenue.classList.add('main__shows-subtitle');

    const showSubtitleLocation = document.createElement('h6');
    showSubtitleLocation.innerText = 'LOCATION';
    showSubtitleLocation.classList.add('main__shows-subtitle');


    const showTextDate = document.createElement('p');
    showTextDate.innerText = showList[i].DATE;
    showTextDate.classList.add('main__shows-details', 'main__shows-details--date');

    const showTextVenue = document.createElement('p');
    showTextVenue.innerText = showList[i].VENUE;
    showTextVenue.classList.add('main__shows-details');

    const showTextLocation = document.createElement('p');
    showTextLocation.innerText = showList[i].LOCATION;
    showTextLocation.classList.add('main__shows-details');

    if (i > 0) {
        showSubtitleDate.classList.add('main__shows-subtitle--lower-rows');
        showSubtitleVenue.classList.add('main__shows-subtitle--lower-rows');
        showSubtitleLocation.classList.add('main__shows-subtitle--lower-rows');
    }

    showSection.appendChild(showStyler); //first one
    showSection.appendChild(showDivider);

    showStyler.appendChild(showDetailsStylerDate);
    showStyler.appendChild(showDetailsStylerVenue);
    showStyler.appendChild(showDetailsStylerLocation);
    showStyler.appendChild(showButton);
    // showStyler.appendChild(showDivider);

    showDetailsStylerDate.appendChild(showSubtitleDate);
    showDetailsStylerDate.appendChild(showTextDate);
    showDetailsStylerVenue.appendChild(showSubtitleVenue);
    showDetailsStylerVenue.appendChild(showTextVenue);
    showDetailsStylerLocation.appendChild(showSubtitleLocation);
    showDetailsStylerLocation.appendChild(showTextLocation);
}



const shows = document.querySelectorAll('.main__shows-styler');
console.log(shows);
// Function to handle item click
function selectOnClick(event) {
    //Check if clicking on current selection
    if (event.currentTarget.classList[1] == "main__shows-styler--selected") {
        event.currentTarget.classList.remove('main__shows-styler--selected');
        return
    }

    shows.forEach((show) => show.classList.remove('main__shows-styler--selected'));

    // add main__shows-styler--selected on clicked item
    // console.log('EVENT', event.currentTarget.classList[1])//value);
    if (event.currentTarget.classList[0] == "main__shows-styler") {
        event.currentTarget.classList.add('main__shows-styler--selected');
    }


}

// shows.forEach(show => console.log(show));

// Add click event listener to each item
shows.forEach(show => {
    show.addEventListener('click', selectOnClick);
});


