import mongoose from 'mongoose';
const User = mongoose.model('User');
export async function login(email, password) {
  let match = false;
  const user = await User.findOne({ email: email }).exec();
  if (user) {
    match = await user.comparePassword(password, user.password);
  }
  return {
    match,
    user
  };
};

export async function save(user) {
  let IsExist = false;
  const { email } = user;
  const user0 = await User.findOne({
    email: email
  }).exec();

  if (!user0) {
    user = new User(user);
    await user.save();
  } else {
    IsExist = true;
  }
  return {
    IsExist,
    user
  };
};
