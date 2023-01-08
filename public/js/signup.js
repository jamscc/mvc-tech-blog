const button = $('#signupBtn');
const uName = $('#enterUsername');
const uPass = $('#enterPassword');
const msg = $('#msg');

button.click((event) => {
    event.preventDefault();
    // username and password
    const uNameVal = uName.val();
    const uPassVal = uPass.val();
    // given the inputs
    switch (true) {
        case (uNameVal == "" || uPassVal == ""):
            return msg.text('Required: both a username and password').attr('style', 'color: red; padding-left: 8px;');
        case (uNameVal.includes(" ")):
            return msg.text('Required: a username with no spaces').attr('style', 'color: red; padding-left: 8px;');
        case (uPassVal.length < 4):
            return msg.text('Password: required - a minimum of 4 characters').attr('style', 'color: red; padding-left: 8px;');
        default:
            fetchPost(uNameVal, uPassVal);
    }
})

// fetch
// post method
function fetchPost(uNameVal, uPassVal) {
    fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ uNameVal, uPassVal }),
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
        msg.text(re).attr('style', 'color: red; padding-left: 8px;');
    })
}
