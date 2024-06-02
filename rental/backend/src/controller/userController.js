

const userService = require('../service/userService');

async function createUser(req, res) {
  try {
    const status = await userService.createUser(req.body);
    if (status) {
      res.send({ status: true, message: 'User created successfully' });
    } else {
      res.send({ status: false, message: 'Error creating user' });
    }
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send({ status: false, message: 'Internal Server Error' });
  }
}

async function loginUser(req, res) {
  try {
    const result = await userService.loginUser(req.body);
    res.send({ status: result.status, message: result.msg });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).send({ status: false, message: 'Internal Server Error' });
  }
}

module.exports = { createUser, loginUser };
