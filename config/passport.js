


















// const JwtStrategy = require("passport-jwt").Strategy;
// const ExtractJwt = require("passport-jwt").ExtractJwt;
// const mongoose = require("mongoose");
// const User = mongoose.model("users");
// const keys = require("./default");

// let opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
// opts.secretOrKey = keys.SECRET_KEY;

// module.exports = passport => {
//   passport.use(
//     new JwtStrategy(opts, (jwt_payload, done) => {
//       User.findById(jwt_payload.id)
//         .then(user => {
//           if (user) {
//             return done(null, user);
//           }
//           return done(null, false);
//         })
//         .catch(err => console.log(err));
//     })
//   );
// };
