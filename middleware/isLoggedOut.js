const isLoggedOut = (req, res, next) => {
    console.log('console.log de session ++++++' +req.session.user)
    if (!req.session.user) {
      next();
      return;
    }
  
    res.redirect("/");
  };
  
  module.exports = isLoggedOut;