class BandSiteApi {

    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = "https://unit-2-project-api-25c1595833b2.herokuapp.com/";
    }

    async postComment(commentObject) {
        const postedEntry = await axios.post(this.baseUrl + "comments/?api_key=" + this.apiKey, commentObject);
    }

    async getComments() {
        const response = await axios.get(this.baseUrl + "comments/?api_key=" + this.apiKey);
        return response.data

    }
    async getShows() {
        const response = await axios.get(this.baseUrl + "showdates/?api_key=" + this.apiKey);
        return response.data

    }

}

const api_key = "a8a7be5d-b354-4dde-942a-286bc8233f9b";




//Show Page
function timestampToDate(timestamp) {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthsOfYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const date = new Date(timestamp);

    const dayOfWeek = daysOfWeek[date.getDay()];
    const month = monthsOfYear[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    return `${dayOfWeek} ${month} ${day} ${year}`;
}





export default async function renderShows() {
    const bandSiteOne = new BandSiteApi(api_key);

    try {
        const showList = await bandSiteOne.getShows();
        const mainSection = document.querySelector(".main");

        const showSection = document.createElement("section");
        showSection.classList.add("main__shows-section");


        const showTitle = document.createElement('h2');
        showTitle.innerText = 'Shows';
        showTitle.classList.add('main__shows-title');

        mainSection.appendChild(showSection);
        showSection.appendChild(showTitle);
        
        for (let i = 0; i < showList.length; i++) {

            const showStyler = document.createElement("div"); //FIRST
            showStyler.classList.add("main__shows-styler-outer");
            const showStylerInner = document.createElement("div"); 
            showStylerInner.classList.add("main__shows-styler-inner");



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
            showTextDate.innerText = timestampToDate(showList[i].date);
            showTextDate.classList.add('main__shows-details', 'main__shows-details--date');

            const showTextVenue = document.createElement('p');
            showTextVenue.innerText = showList[i].place;
            showTextVenue.classList.add('main__shows-details');

            const showTextLocation = document.createElement('p');
            showTextLocation.innerText = showList[i].location;
            showTextLocation.classList.add('main__shows-details');

            if (i > 0) {
                showSubtitleDate.classList.add('main__shows-subtitle--lower-rows');
                showSubtitleVenue.classList.add('main__shows-subtitle--lower-rows');
                showSubtitleLocation.classList.add('main__shows-subtitle--lower-rows');
            }

            showSection.appendChild(showStyler); //first one
            showStyler.appendChild(showStylerInner);

            showStylerInner.appendChild(showDetailsStylerDate);
            showStylerInner.appendChild(showDetailsStylerVenue);
            showStylerInner.appendChild(showDetailsStylerLocation);
            showStylerInner.appendChild(showButton);

            showStyler.appendChild(showDivider);

            showDetailsStylerDate.appendChild(showSubtitleDate);
            showDetailsStylerDate.appendChild(showTextDate);
            showDetailsStylerVenue.appendChild(showSubtitleVenue);
            showDetailsStylerVenue.appendChild(showTextVenue);
            showDetailsStylerLocation.appendChild(showSubtitleLocation);
            showDetailsStylerLocation.appendChild(showTextLocation);
        }



        const shows = document.querySelectorAll('.main__shows-styler-outer');
        // Function to handle item click
        function selectOnClick(event) {
            //Check if clicking on current selection
            if (event.currentTarget.classList[1] == "main__shows-styler-outer--selected") {
                event.currentTarget.classList.remove('main__shows-styler-outer--selected');
                return
            }

            shows.forEach((show) => show.classList.remove('main__shows-styler-outer--selected'));

            // add main__shows-styler--selected on clicked item
            if (event.currentTarget.classList[0] == "main__shows-styler-outer") {
                event.currentTarget.classList.add('main__shows-styler-outer--selected');
            }


        }

        // Add click event listener to each item
        shows.forEach(show => {
            show.addEventListener('click', selectOnClick);
        });

    }
    catch (error) {
        console.log(error);
    }
};








// Bio Page

function addComment(commentList){
    const sortedComments = commentList.sort((a, b) => {
        return a.timestamp - b.timestamp
    })

    const commentSectionEl = document.querySelector(".main__comment-section");
    const commentEntrySection = document.createElement('section');
    commentEntrySection.classList.add("main__comment-section-entries");
    const commentDivider = document.createElement("hr");
    commentDivider.classList.add("main__comment-section-divider");

    for (let i = sortedComments.length - 1; i >= 0; i--) {

        const commentEntry = document.createElement('section');
        commentEntry.classList.add("main__comment-section-entry");
        const commentDividerInner = document.createElement("hr");
        commentDividerInner.classList.add("main__comment-section-divider");

        const commentAvatar = document.createElement('div'); //using div instead of img for Avatar
        commentAvatar.classList.add("main__comment-section-entry-avatar");
        const commentTextStyler = document.createElement('div');
        commentTextStyler.classList.add("main__comment-section-entry-text-styler");

        const commenterName = document.createElement('h6');
        commenterName.innerText = sortedComments[i].name;
        commenterName.classList.add("main__comment-section-entry-commenter");

        const commentValue = document.createElement('p');
        commentValue.innerText = sortedComments[i].comment;
        commentValue.classList.add("main__comment-section-entry-comment");

        const commentDate = document.createElement('p');
        commentDate.innerText = new Date(sortedComments[i].timestamp).toLocaleDateString('en-US');
        commentDate.classList.add("main__comment-section-entry-comment", "main__comment-section-entry-comment--date");

        commentEntry.appendChild(commentAvatar);
        commentEntry.appendChild(commentTextStyler);

        commentTextStyler.appendChild(commenterName);
        commentTextStyler.appendChild(commentDate);
        commentTextStyler.appendChild(commentValue);

        commentEntrySection.appendChild(commentDividerInner);
        commentEntrySection.appendChild(commentEntry);

    }
    

    commentEntrySection.appendChild(commentDivider);

    commentSectionEl.appendChild(commentEntrySection);

}


 export async function renderComments() {

    const bandSiteOne = new BandSiteApi(api_key);
    const defaultComments = await bandSiteOne.getComments();

    addComment(defaultComments);

    const form = document.getElementById("commentForm");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const nameField = document.querySelector(".main__comment-section-name-field");
        nameField.classList.remove("main__comment-section-name-field--error");
        const commentField = document.querySelector(".main__comment-section-comment-field");
        commentField.classList.remove("main__comment-section-comment-field--error");

        if (event.target.fullName.value.length === 0) {
            nameField.classList.add("main__comment-section-name-field--error");
            return;
        }
        if (event.target.comment.value.length === 0) {
            commentField.classList.add("main__comment-section-comment-field--error");
            return;
        }


        const newEntry = {};
        newEntry.name = event.target.fullName.value;
        newEntry.comment = event.target.comment.value;

        try {
            const postedComment = await bandSiteOne.postComment(newEntry);
            const commentEntrySection = document.querySelector(".main__comment-section-entries");
            commentEntrySection.innerHTML = '';
            let updatedComments = await bandSiteOne.getComments();

            addComment(updatedComments);
            form.reset();
        } catch (error) {
            console.log(error);
        }


    })
}








