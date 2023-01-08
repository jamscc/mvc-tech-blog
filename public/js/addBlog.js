const buttonPost = $('#newPostBtn');
const buttonNewBlog = $('#createBtn');
const formPost = $('#formPost');
const titleBlog = $('#blogTitle');
const textBlog = $('#blogText');
const msg = $('#msg');

// display
buttonPost.click((event) => {
    event.preventDefault();
    formPost.css('display', 'inline');
})

// new blog
buttonNewBlog.click((event) => {
    event.preventDefault();
    // title and text
    const blogTitleVal = titleBlog.val();
    const blogTextVal = textBlog.val();
    // given the inputs
    switch (true) {
        case (blogTitleVal == "" || blogTextVal == ""):
            return msg.text('Required: both a title and text').attr('style', 'color: red; padding-left: 8px;');
        case (!blogTitleVal || !blogTextVal):
            return msg.text('Required: both a title and text').attr('style', 'color: red; padding-left: 8px;');
        default:
            fetchPost(blogTitleVal, blogTextVal);
    }
})

// fetch
// post method
function fetchPost(blogTitleVal, blogTextVal) {
    fetch('/api/users/newblog', {
        method: 'POST',
        body: JSON.stringify({ blogTitleVal, blogTextVal }),
        headers: { 'Content-Type': 'application/json' },
    }).then((resp) => {
        switch (true) {
            case (!resp.ok):
                // feedback
                resp.json().then((e) => msg.text(e).attr('style', 'color: red; padding-left: 8px;'));
                break;
            default:
                return document.location.replace('/dashboard');
        }
    }).catch((re) => {
        msg.text(re).attr('style', 'color: red; padding-left: 8px;')
    })
}