const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const User = require("../models/User.model");

router.get("/signup", (req, res) => {
    res.render("auth/signup");
  });

  router.post('/signup', async (request, response) => {
    const { email, password } = request.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      await User.create({
        email: email,
        password: hashedPassword
      });
      console.log(email, hashedPassword);
      response.redirect('/signup');
    } catch (error) {
      console.log(error);
      response.render('auth/signup', { error: 'An error occurred' });
    }
  });
  
  // GET /auth/login

  router.get("/login", (req, res) => {
    res.render("auth/login");
  });
  









  module.exports = router;

  