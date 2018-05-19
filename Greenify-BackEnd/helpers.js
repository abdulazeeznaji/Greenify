var bcrypt = require("bcrypt");
const db = require("./db/index.js");


//checking if the user is logged in or not 
exports.isLoggedIn = function(req) {
  return req.session ? !!req.session.user : false;
};


//creating a session with the logged in username
exports.createSession = function(req, res, newUser) {
  return req.session.regenerate(function() {
    req.session.user = newUser;
    res.status(200).send()
    console.log(req.session);
   });
};

//comparing password
exports.comparePassword = function(password,user, cb) {
  bcrypt.compare(password, user.password, function(err, isMatch) {
    if (err){
      cb(err)
    }else{
    cb(null, isMatch);
  }
  });

};


//hashing the password and saving it to the database
exports.hash = function(obj, callback){
  bcrypt.hash(obj.password, 10, function(err, hash) {
    obj.password=hash;
    db.save(obj, function(err,data){
      if(err){
        callback(err,null);
      }else{
        callback(null,data); 
      }
    });

  });
};
