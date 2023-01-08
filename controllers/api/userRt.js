const { Blog, UserData, Comment } = require('../../models');
const userRt = require('express').Router();

// res.json 
// res.status
function rj(res, r, n) {
  const rs = (n) => { return res.status(n) };
  switch (true) {
    case (!n):
      return res.json(r);
    default:
      rs(n);
      return res.json(r);
  }
}

// username and password - login 
userRt.post('/', (req, res) => {
  try {
    const { uNameVal, uPassVal } = req.body;
    UserData.findOne({ where: { username: uNameVal } }).then((userInfo) => {
      // compare password
      switch (userInfo == null || userInfo.pwdCompare(uPassVal, userInfo.password) == false) {
        case (false):
          // session save
          return req.session.save(() => {
            req.session.user_id = userInfo.id;
            req.session.loggedStatus = true;
            return rj(res, 'log in successful');
          });
        default:
          return rj(res, 'An error has occurred. Please re-enter and submit your username and password.', 400);
      }
    })
  } catch (re) { return rj(res, "An error has occurred. Please start over.", 400) }
});

// signup
userRt.post('/signup', async (req, res) => {
  try {
    const { uNameVal, uPassVal } = req.body;
    // if username exists 
    const fd = await UserData.findOne({ where: { username: uNameVal.toLowerCase() } });
    if (fd) {
      return rj(res, "This username already exists. Please try another username.", 400);
    }

    const dt = { username: uNameVal, password: uPassVal };
    // create
    await UserData.create(dt);
    UserData.findOne({ where: { username: uNameVal } }).then((userDB) => {
      // session save
      return req.session.save(() => {
        req.session.user_id = userDB.id;
        req.session.loggedStatus = true;
        return rj(res, 'sign up - successful');
      });
    })
  } catch (re) { return rj(res, "An error has occurred. Please start over.", 400) }
});

// comment - create
userRt.post('/comments', (req, res) => {
  try {
    const { commentVal, blogID } = req.body;
    const { user_id } = req.session;
    const cm = { comment_text: commentVal };
    const idU = { user_id: user_id };
    const idB = { blog_id: blogID };
    // Comment create
    Comment.create(Object.assign(cm, idU, idB)).then((c) => { return rj(res, c) });
  } catch (re) { return rj(res, "An error has occurred. Please start over.", 400); }
});

// logging out
// session
userRt.post('/logout', (req, res) => {
  try {
    req.session.destroy(() => {
      return res.end();
    });
  } catch (re) { return res.end() }
});

module.exports = userRt;