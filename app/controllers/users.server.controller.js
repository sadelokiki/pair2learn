"use strict";

require('../models/users.server.model.js');
var passport = require("passport"),
  formidable = require("formidable"),
  cloudinary = require("cloudinary"),
  jwt = require('jsonwebtoken'),
  mongoose = require("mongoose"),
  Users = mongoose.model('Users'),
  config = require('../../config/config'),
  nodemailer = require('nodemailer');

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret
});


var generateJWT = function(user) {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);
  var token = jwt.sign({
      user: user,
      exp: parseInt(exp.getTime() / 1000),
    },
    config.jwtSecret
  );
  return token;
};


exports.getImage = function(req, res, next) {
  var forms = new formidable.IncomingForm();
  forms.parse(req, function(err, fields, files) {
    req.body = fields;
    cloudinary.uploader.upload(files.file.path, function(result) {
      req.body.picture = result.url;
      next();
    }, {
      width: 300,
      height: 300
    });
  });
};

exports.authCallBack = function(strategy) {
  return function(req, res, next) {
    passport.authenticate(strategy, function(err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        res.redirect('/#/login');
      } else {
        var token = generateJWT(user);
        res.redirect('/#/user/' + user._id + '?token=' + token);
      }
    })(req, res, next);
  };
};

exports.findOne = function(req, res) {
  var user_id = req.params.id;
  Users.findOne({
    _id: user_id
  }, function(err, user) {
    if (err) {
      return res.status(400).json(err);
    }
    return res.status(200).json(user);
  });
};

exports.findAll = function(req, res) {
  Users.find({}, function(err, users) {
    if (err) {
      return res.status(400).json(err);
    }
    res.send(users);
  });
};
// End of custom find methods

exports.editImage = function(req, res) {
  var user_id = req.body._id;
  var new_user = req.body;
  Users.update({
      _id: user_id
    }, {
      picture: req.body.picture
    },
    function(err, user) {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(200).json({
        token: generateJWT(new_user),
        user: new_user
      });
    });
};

exports.editProfile = function(req, res) {
  var user_id = req.params.id;
  Users.update({
    _id: user_id
  }, req.body, function(err, data) {
    if (err) {
      return res.status(400).json(err);
    }
    return res.status(200).json({
      token: generateJWT(req.body),
      user: req.body
    });
  });
};

exports.deleteOneUser = function(req, res) {
  var user_id = req.params.id;

  Users.remove({
    _id: user_id
  }, req.body, function(err, data) {
    if (err) {
      return res.status(400).json(err);
    }
    return res.status(200).json({
      token: generateJWT(user),
      data: data
    });
  });
}

exports.sendMail = function(req, res) {
  var userId = req.body.userId;
  var craftId = req.body.craftId;
  var expertId = req.body.expertId;

  console.log(req.body,'request');

  Users.findOne({
    _id: expertId
  }, function(err, user) {
    if (err) {
      return res.status(400).json(err);
    }
    console.log(user)
    var expertMail = user.email;
    var expertName = user.firstname;
    var adminMail = 'Andela <1testertest1@gmail.com>';
    var transporter = nodemailer.createTransport();


    var mailBody = {
      from: adminMail,
      to: 'susanadelokiki@gmail.com',
      subject: 'Hello' + expertName,
      html: "Susan has requested to pair with you" + "To pair follow this link:" + 
    }

    transporter.sendMail(mailBody, function(err, i) {
      if (err) {
        console.log(err, 'error')
      } else {
        console.log('Message sent:' + i);
      }
    })

    res.sendStatus(200);
  });
}

// exports.pairSession = function(req, res, next) {
//   var userId  = req.params.userid,
//       craftId = req.params.craftid,
//       sessionId = userId + craftId;
//   Users.findOne({
//     '_id': userId
//   }, req.body, function(err, user) {
//     if (err) {
//       return res.json(err);
//     }
//     // res.send(200);
//     console.log(sessionId);
//     res.status(200).send({
//       sessionId: sessionId
//     })
//       // user.pair(req.body.userId,
//       //   function(err, sessionId) {
//       //     if (err) {
//       //       return res.status(400).json(err);
//       //     }
//       //     return res.status(200).json(req.body.sessionId);
//       //   });
//   });
// };

exports.deleteOneUser = function(req, res) {
  var user_id = req.params.id;
  Users.remove({
    _id: user_id
  }, function(err, user) {
    if (err) {
      return res.status(400).json(err);
    }
    res.status(200).json(user);
  });
};
