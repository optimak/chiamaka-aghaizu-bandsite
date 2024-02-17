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
// {"api_key":"a8a7be5d-b354-4dde-942a-286bc8233f9b"}



// Bio Page

const commentSectionEl = document.querySelector(".main__comment-section");
const commentEntrySection = document.createElement('section');
commentEntrySection.classList.add("main__comment-section-entries");
const commentDivider = document.createElement("hr");
commentDivider.classList.add("main__comment-section-divider");


const addComment = (commentList) => {
    const sortedComments = commentList.sort((a, b) => {
        return a.timestamp - b.timestamp
    })
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


async function renderComments() {
    const bandSiteOne = new BandSiteApi("a8a7be5d-b354-4dde-942a-286bc8233f9b");
    let defaultComments = await bandSiteOne.getComments();
    const shows = await bandSiteOne.getShows();
    // const shows =  await bandSiteOne.getShows();
    // renderCommentElements();
    // renderComments();
    addComment(defaultComments);

    // const tryPosting = {
    //     name: "John Doe",
    //     comment: "This is art TRIAL.",
    // }
    // const additionalComments =[];
    // try {
    //     const postedComment = await bandSiteOne.postComment(tryPosting);
    //     // console.log(postedComment);
    //     // additionalComments.push(newEntry);
    //     // additionalComments.push(postedComment);

    //     // console.log(additionalComments);
    //     commentEntrySection.innerHTML = '';

    //     // addComment(additionalComments);
    //     let defaultComments = await bandSiteOne.getComments();

    //     addComment(defaultComments);
    //     form.reset();
    // } catch (error) {
    //     console.log(error);
    // }


    console.log(defaultComments);
    // return defaultComments, shows

    // const additionalComments = [];
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
        // newEntry.timestamp = new Date();//.toLocaleDateString("en-US");
        newEntry.comment = event.target.comment.value;
        try {
            const postedComment = await bandSiteOne.postComment(newEntry);
            // console.log(postedComment);
            // additionalComments.push(newEntry);
            // additionalComments.push(postedComment);
    
            // console.log(additionalComments);
            commentEntrySection.innerHTML = '';
    
            // addComment(additionalComments);
            let defaultComments = await bandSiteOne.getComments();
    
            addComment(defaultComments);
            form.reset();
        } catch (error) {
            console.log(error);
        }


        // try {
        //     const postedComment = await bandSiteOne.postComment(newEntry);
        //     console.log(postedComment);
        //     // additionalComments.push(newEntry);
        //     additionalComments.push(postedComment);

        //     // console.log(additionalComments);
        //     commentEntrySection.innerHTML = '';

        //     addComment(additionalComments);
        //     addComment(defaultComments);
        //     form.reset();
        // } catch (error) {
        //     console.log(error);
        // }



        // // additionalComments.push(newEntry);
        // additionalComments.push(postedComment);

        // // console.log(additionalComments);
        // commentEntrySection.innerHTML = '';

        // addComment(additionalComments);
        // addComment(defaultComments);
        // form.reset();


    })
}

// console.log(createNewApi());

renderComments();
// addComment(initialCommentList);







// //Show Page