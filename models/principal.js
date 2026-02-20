var mongoose = require("mongoose");
// bcrypt ki ab zaroorat nahi hai
var passportLocalMongoose = require("passport-local-mongoose");

var principalSchema = new mongoose.Schema({
  name: String,
  type: String,
  username: String,
  password: String, // Ye ab plain text store karega
  hostel: String,
  image: String
});

principalSchema.plugin(passportLocalMongoose);
var Principal = (module.exports = mongoose.model("Principal", principalSchema));

// Naya principal create karne ke liye (Bina hashing ke)
module.exports.createPrincipal = function(newPrincipal, callback) {
    // Hashing logic hata diya gaya hai, direct save karein
    newPrincipal.save(callback);
};

module.exports.getUserByUsername = function(username, callback) {
  var query = { username: username };
  Principal.findOne(query, callback);
};

module.exports.getUserById = function(id, callback) {
  Principal.findById(id, callback);
};

// Password compare karne ke liye (Direct match)
module.exports.comparePassword = function(candidatePassword, storedPassword, callback) {
  // Hash comparison ki jagah direct string match
  if (candidatePassword === storedPassword) {
      callback(null, true);
  } else {
      callback(null, false);
  }
};
