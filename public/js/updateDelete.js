const buttonUpdate = $('#updateBtn');
const buttonDelete = $('#deleteBtn');
const titleBlog = $('#blogTitle');
const textBlog = $('#blogText');
const msg = $('#msg');

// update
buttonUpdate.click((event) => {
    event.preventDefault()
    const strQ = document.location.href;
    const blogID = strQ.split('/update/').pop();
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
            fetchPut(blogID, blogTitleVal, blogTextVal);
    }
})

// fetch
// put method
function fetchPut(blogID, blogTitleVal, blogTextVal) {
    fetch(`/api/users/update/${blogID}`, {
        method: 'PUT',
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

// delete
buttonDelete.click((event) => {
    event.preventDefault()
    const strQ = document.location.href;
    const blogID = strQ.split('/update/').pop();
    fetchDelete(blogID);
})

// fetch
// delete method
function fetchDelete(blogID) {
    fetch(`/api/users/delete/${blogID}`, {
        method: 'DELETE',
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