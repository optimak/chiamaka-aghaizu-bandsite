const initialCommentList = [
    {
        NAME: "Isaac Tadesse",
        DATE: "10/20/2023",
        COMMENT: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",

    },
    {
        NAME: "Christina Cabrera",
        DATE: "10/28/2023",
        COMMENT: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",

    },
    {
        NAME: "Victor Pinto",
        DATE: "11/02/2023",
        COMMENT: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",

    },


]
const commentSectionEl = document.querySelector(".main__comment-section");
const commentEntrySection = document.createElement('section');
commentEntrySection.classList.add("main__comment-section-entries");
const commentDivider = document.createElement("hr");
commentDivider.classList.add("main__comment-section-divider");

const addComment = (commentList) => {
    for (let i = commentList.length - 1; i >= 0; i--) {


        const commentEntry = document.createElement('section');
        commentEntry.classList.add("main__comment-section-entry");
        const commentDividerInner = document.createElement("hr");
        commentDividerInner.classList.add("main__comment-section-divider");

        const commentAvatar = document.createElement('div'); //using div instead of img for Avatar
        commentAvatar.classList.add("main__comment-section-entry-avatar");
        const commentTextStyler = document.createElement('div');
        commentTextStyler.classList.add("main__comment-section-entry-text-styler");

        const commenterName = document.createElement('h6');
        commenterName.innerText = commentList[i].NAME;
        commenterName.classList.add("main__comment-section-entry-commenter");

        const commentValue = document.createElement('p');
        commentValue.innerText = commentList[i].COMMENT;
        commentValue.classList.add("main__comment-section-entry-comment");

        const commentDate = document.createElement('p');
        commentDate.innerText = commentList[i].DATE;
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
addComment(initialCommentList);

const additionalComments = [];
const form = document.getElementById("commentForm");
form.addEventListener("submit", (event) => {
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
    newEntry.NAME = event.target.fullName.value;
    newEntry.DATE = new Date().toLocaleDateString("en-US");
    newEntry.COMMENT = event.target.comment.value;
    additionalComments.push(newEntry);

    console.log(additionalComments);
    commentEntrySection.innerHTML = '';

    addComment(additionalComments);
    addComment(initialCommentList);
    form.reset(); 


})



