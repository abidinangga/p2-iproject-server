const bcrypt =require('bcryptjs');

function changePassword(password) {
   return bcrypt.hashSync(password,10);
}

function comparePassword(password,changePassword) {
    return bcrypt.compareSync(password,changePassword)
}

module.exports = {changePassword,comparePassword}