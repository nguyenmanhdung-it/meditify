const User = require("../models/User");

const FindImg = async (username: string[]) => {
    try {
      const{profilePic, _id, ...others} = await User.findOne({
        username: username,
      })._doc;
      return {profilePic, _id};
    } catch (err) {
      console.log(err);
    }
  };
  export default FindImg;
  