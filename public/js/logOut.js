const loggingOut = $('#logging-out');
const lgMsg = $('#lg-msg');

// fetch
// post method
loggingOut.click(() => {
    fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    }).then((resp) => {
        switch (true) {
            case (!resp.ok):
                //feedback
                return lgMsg.text('log out - error').attr('style', 'color: red; padding-left: 8px;');
            default:
                return document.location.replace('/');
        }
    }).catch((re) => {
        lgMsg.text(re).attr('style', 'color: red; padding-left: 8px;')
    })
})