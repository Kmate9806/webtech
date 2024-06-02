
const UserModel = require('../model/userModel');
const encryptor = require('simple-encryptor');

const key = '123456789trytryrtyr';
const encryptorInstance = encryptor(key);

async function createUser(userDetails) {
  try {
    const encryptedPassword = encryptorInstance.encrypt(userDetails.password);
    const user = new UserModel({
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      email: userDetails.email,
      password: encryptedPassword
    });
    await user.save();
    return true;
  } catch (error) {
    console.error('Error creating user:', error);
    return false;
  }
}

async function loginUser(userDetails) {
  try {
    const user = await UserModel.findOne({ email: userDetails.email });
    if (!user) {
      return { status: false, msg: 'Invalid User Details' };
    }
    const decryptedPassword = encryptorInstance.decrypt(user.password);
    if (decryptedPassword === userDetails.password) {
      return { status: true, msg: 'User Validated Successfully' };
    } else {
      return { status: false, msg: 'User Validated failed' };
    }
  } catch (error) {
    console.error('Error logging in user:', error);
    return { status: false, msg: 'Invalid Data' };
  }
}

module.exports = { createUser, loginUser };
