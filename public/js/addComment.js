const button = $('#commentBtn');
const comment = $('#addComment');
const msg = $('#msg');

button.click((event) => {
    event.preventDefault();
    const strQ = document.location.href;
    const blogID = strQ.split('/blogs/').pop();
    const commentVal = comment.val();
    // given the input
    switch (true) {
        case ((commentVal == "" || !commentVal)):
            return msg.text('Please enter a comment.').attr('style', 'color: red; padding-left: 8px;');
        default:
            fetchPost(blogID, commentVal);
    }
})

// fetch
// post method
function fetchPost(blogID, commentVal) {
    fetch('/api/users/comments', {
        method: 'POST',
        body: JSON.stringify({ blogID, commentVal }),
        headers: { 'Content-Type': 'application/json' },
    }).then((resp) => {
        switch (true) {
            case (!resp.ok):
                // feedback
                resp.json().then((e) => msg.text(e).attr('style', 'color: red; padding-left: 8px;'));
                break;
            default:
                return document.location.replace('/');
        }
    }).catch((re) => {
        msg.text(re).attr('style', 'color: red; padding-left: 8px;')
    })
}