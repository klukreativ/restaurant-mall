const defaultVal = [
    {
        userName: 'Ali',
        userImage: 'comment-1.jpg',
        userEmail: 'ali@ali.com',
        userDate: 'Wednesday, October 10th, 2019',
        userComment: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias adipisci error
expedita odio aspernatur laborum at. Fugiat dignissimos neque voluptas iure, rem
consectetur, laudantium voluptatem mollitia quo a, cumque quos?` },
    {
        userName: 'Lisa',
        userImage: 'comment-2.jpg',
        userEmail: 'lisa@lisa.com',
        userDate: 'Thursday, October 11th, 2019',
        userComment: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias adipisci error
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
        userDate: createDate(),
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
                        ${currentComments[i].userDate} by ${currentComments[i].userName}
                    </p>
                    <p>${currentComments[i].userComment}</p>
                </div>
            </div>
            `
        )
    }
}

// creates a date 
function createDate() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'October', 'September', 'November', 'December'];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const d = new Date();
    const dDay = d.getUTCDate();
    const stringDate = (`
    ${days[d.getDay()]}, 
    ${months[d.getMonth()]} 
    ${dDay}${daySuffix(dDay)}, 
    ${d.getFullYear()}
    `)
    return stringDate;
}

// returns the correct suffix depending on day
function daySuffix(d) {
    if (d === 1 || d === 21 || d === 31) {
        return 'st';
    } else if (d === 2 || d === 22) {
        return 'nd';
    } else if (d === 3 || d === 23) {
        return 'rd';
    } else {
        return 'th';
    }
}

// initializes comment array
const currentComments = getComments('comments');
populate();