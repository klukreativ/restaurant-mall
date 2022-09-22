const defaultVal = [
    {
        userName: 'Ali', userImage: 'comment-1.jpg', userEmail: 'karl@karl.com', userComment: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias adipisci error
expedita odio aspernatur laborum at. Fugiat dignissimos neque voluptas iure, rem
consectetur, laudantium voluptatem mollitia quo a, cumque quos?` },
    {
        userName: 'Lisa', userImage: 'comment-2.jpg', userEmail: 'garou@garou.com', userComment: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias adipisci error
expedita odio aspernatur laborum at. Fugiat dignissimos neque voluptas iure, rem
consectetur, laudantium voluptatem mollitia quo a, cumque quos?` }
]

// initializes variables to find elements used in script
const formElement = document.getElementById('commentForm');
let userName = document.getElementById('formName');
let userEmail = document.getElementById('formEmail');
let userComment = document.getElementById('formComment');

// handles form submission
formElement.addEventListener('submit', (e) => {
    // prevents page refresh upon submission
    e.preventDefault();

    // creates new comment using form values
    const newComment = {
        userName: userName.value,
        userImage: 'default.png', // defaults to this image
        userEmail: userEmail.value,
        userComment: userComment.value
    }

    // adds new comment to comment array
    currentComments.push(newComment);

    // saves to localstorage by converting comments array into JSON
    window.localStorage.setItem('comments', JSON.stringify(currentComments));

    // resets the form fields
    userName.value = '';
    userEmail.value = '';
    userComment.value = '';

    // rerenders the comment section
    populate();
})

// checks localStorage for comments by converting JSON back to JS, if not returns defaultVal
function getComments(key) {
    let val;
    try {
        console.log('checking in localstorage');
        // figure out the purpose of String later.
        val = JSON.parse(window.localStorage.getItem(key) || String(defaultVal))
    } catch (e) {
        console.log(e);
        val = defaultVal
    }
    return val;
}

// populates comment section with existing comments
function populate() {
    const test = document.getElementById('blogCommentArea')
    // clears current contents
    test.innerHTML = "";
    for (let i = 0; i < currentComments.length; i++) {
        test.innerHTML += (
            `
            <div class="blogComment">
                <div class="blogCommentImg">
                    <img src="../assets/${currentComments[i].userImage}" alt="user image" class="userImage">
                </div>
                <div class="blogCommentContent">
                    <p class="date secondary">
                        Wednesday October 10th, 2019 by ${currentComments[i].userName}
                    </p>
                    <p>${currentComments[i].userComment}</p>
                </div>
            </div>
            `
        )
    }
}

// initializes comment array
const currentComments = getComments('comments');
populate();