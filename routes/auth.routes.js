const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");


const User = require("../models/User.model");

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/main", isLoggedIn, (req, res) => {
  res.render("auth/main");
});

router.get("/private", isLoggedIn, (req, res) => {
  res.render("auth/private");
});

router.get("/signup", isLoggedOut, (req, res) => {
  res.render("auth/signup");
});

router.post('/signup', isLoggedOut, async (request, response) => {
  const { email, password } = request.body;
  if (!email || !password) {
    response.render('auth/signup', { errorMessage: 'All fields are mandatory. Please provide your username, email and password.' });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await User.create({
      email: email,
      password: hashedPassword
    });
    console.log(email, hashedPassword);
    response.render('auth/signup', { Message: 'User Created, please loggin' });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      response.status(500).render('auth/signup', { errorMessage: error.message });
    } else if (error.code === 11000) {
      response.status(500).render('auth/signup', {
        errorMessage: 'Email is already used.'
      });
    } else {
      next(error);
    }
  }


});


// GET /auth/login

router.get("/login", isLoggedOut ,(req, res, next) => {
  res.render("auth/login");
});


// POST login route ==> to process form data
router.post('/login',isLoggedOut,  async (req, res, next) => {
  const { email, password } = req.body;
  console.log('SESSION =====> ', req.session);
  if (email === '' || password === '') {
    res.render('auth/login', {
      errorMessage: 'Please enter both, email and password to login.'
    });
    return;
  }

  await User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        res.render('auth/login', { errorMessage: 'Incorrect password o e-mail' });
        return;
      } else if (bcrypt.compareSync(req.body.password, user.password)) {
        //res.render('users/user-profile', { user });
        req.session.currentUser = user;
        res.redirect('/user-profile');


      } else {
        res.render('auth/login', { errorMessage: 'Incorrect password o e-mail' });
      }
    })
    .catch(error => next(error));
});

//profile User
router.get('/user-profile',isLoggedIn, (req, res) => {
  res.render('users/user-profile', { userInSession: req.session.currentUser });
});
// Router Post Logout

router.post('/logout', (req, res, next) => {
  req.session.destroy(err => {
    if (err) next(err);
    res.redirect('/');
  });
});



module.exports = router;

