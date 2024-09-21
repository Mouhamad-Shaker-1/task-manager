// authRouter.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust the import path as necessary
const bcrypt = require('bcrypt');
const {UnauthenticatedError, BadRequestError} = require('../errors');
const { StatusCodes } = require('http-status-codes');
const upload = require('../multerConfig');


const register = async (req, res) => {

    const newUser = await User.create(req.body);

    
    const token = newUser.createJWT()
    res.status(StatusCodes.CREATED).json({
      name: newUser.name,
      email: newUser.email,
      profileImage: newUser.profileImage,
      token
    });
  }

const login = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        throw new BadRequestError('please provide email and password')
    }
    const user = await User.findOne({ email })

    if(!user) {
        throw new UnauthenticatedError('Invalid Credentials')
    }
    const isPasswordMatch = await user.comparePassword(password)
    console.log(isPasswordMatch)
    if(!isPasswordMatch) {
        throw new UnauthenticatedError('Invalid Credentials')
    }
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
      token
    });
  }

const getUser = async (req, res) => {

  const user = await User.findOne({_id: req.user.userID}).select('-password')

  res.status(StatusCodes.OK).json(user)
}

const updateUser = async (req, res) => {
  const { name, lastName, email } = req.body;

  // Validate required fields
  // if (!name || !lastName || !email) {
  //   throw new BadRequestError('Please provide name, last name, and email');
  // }

  // Prepare the updated data object
  let updateData = {
    name,
    lastName,
    email
  };

  console.log(req.body)

  // If a profile image is uploaded, include its path in the update
  console.log(req.file); // This should log the file details if uploaded
  if (req.file) {
    updateData.profileImage = `/uploads/${req.file.filename}`;
  }

  // Update the user in the database
  const user = await User.findOneAndUpdate(
    { _id: req.user.userID },
    updateData,
    { new: true, runValidators: true }
  ).select('-password');

  // Send the updated user data in the response
  res.status(StatusCodes.OK).json(user);
};


module.exports = {register, login, getUser, updateUser}