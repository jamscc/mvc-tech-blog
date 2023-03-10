const { Blog, UserData, Comment } = require('../models');
const blogRt = require('express').Router();

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
};

// Blog findAll
blogRt.get('/', (req, res) => {
    try {
        // Blog findAll
        // UserData 
        // Comment
        Blog.findAll({
            include: [{ model: UserData, attributes: { exclude: ['password'] } }, { model: Comment }]
        }).then((blogsAll) => {
            const { loggedStatus } = req.session;
            let blogs = [];
            for (let i = 0; i < blogsAll.length; i++) {
                const eachBlog = blogsAll[i];
                blogs = [...blogs, eachBlog.get({ plain: true })];
            }
            // loggedStatus
            const log = { logSuccess: loggedStatus };
            const bg = { blogs };
            const ot = Object.assign(bg, log);
            // render hpage
            res.render('hpage', ot);
        })
    } catch (re) { return rj(res, re) }
})

// get - blog
blogRt.get('/blogs/:id', (req, res) => {
    const { params } = req;
    const { id } = params;
    try {
        // Blog findByPk
        // UserData 
        // Comment
        Blog.findByPk(id, {
            include: [{ model: UserData, attributes: { exclude: ['password'] } }, { model: Comment, include: [{ model: UserData, attributes: { exclude: ['password'] } }] }]
        }).then((blogOne) => {
            if (!blogOne) {
                const rdl = '/';
                return res.redirect(rdl)
            };
            const { loggedStatus } = req.session;
            let blog = {};
            blog = Object.assign(blog, blogOne.get({ plain: true }));
            // loggedStatus
            const log = { logSuccess: loggedStatus };
            const bg = { blog };
            const ot = Object.assign(bg, log);
            // render blog
            res.render('blog', ot);
        })
    } catch (re) { return rj(res, re) }
});

// login
blogRt.get('/login', (req, res) => {
    const { loggedStatus } = req.session;
    switch (true) {
        case (!loggedStatus):
            // render logIn
            return res.render('logIn');
        default:
            return res.redirect('/');
    }
});

// signup
blogRt.get('/signup', (req, res) => {
    const { loggedStatus } = req.session;
    switch (true) {
        case (!loggedStatus):
            // render signup
            return res.render('signup');
        default:
            return res.redirect('/');
    }
});

// dashboard
blogRt.get('/dashboard', (req, res) => {
    try {
        const { loggedStatus, user_id } = req.session;
        const rd = '/login';
        if (user_id || loggedStatus) {
        // Blog findAll
        Blog.findAll({ where: { user_id: user_id } }).then((blogsUser) => {
            // given Blog findAll
            switch (true) {
                case (!blogsUser):
                    // render dashboard
                    return res.render('dashboard');
                default:
                    let userBlogs = [];
                    for (let i = 0; i < blogsUser.length; i++) {
                        const ecBlog = blogsUser[i];
                        userBlogs = [...userBlogs, ecBlog.get({ plain: true })];
                    }
                    // loggedStatus
                    const log = { logSuccess: loggedStatus };
                    const bg = { userBlogs };
                    const ot = Object.assign(bg, log);
                    // render dashboard
                    return res.render('dashboard', ot);
            }
        })} else {
            return res.redirect(rd);
        }
    } catch (re) { return rj(res, re) }
});

// update
blogRt.get('/update/:id', (req, res) => {
    try {
        const { loggedStatus, user_id } = req.session;
        const rdl = '/login';
        if (user_id || loggedStatus) {
            const { params } = req;
            const { id } = params;
            // Blog findByPk
            Blog.findByPk(id).then((bd) => {
                if (!bd || (user_id != bd.user_id)) {
                    return res.redirect('/dashboard');
                }
                let blog = {};
                blog = Object.assign(blog, bd.get({ plain: true }));
                const log = { logSuccess: loggedStatus };
                const bg = { blog };
                const ot = Object.assign(bg, log);
                // render update
                res.render('update', ot);
            })
        } else {
            return res.redirect(rdl);
        }
    } catch (re) { return rj(res, re) }
});

module.exports = blogRt;