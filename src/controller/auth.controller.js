export const authCallBack = async (req, res) => {
    try {
      const {id, firstName, lastName, imageUrl} = req.body;
      const user = await User.findOne({clerkId: id});
  
      if(!user){
          await User.create({
              clerkId: id,
              FullName: `${firstName} ${lastName}`,
              imageUrl,
            });
      }
  
      res.status(200).json({message: "User created successfully"});
    } catch (error) {
      console.log("Error in auth callback route",error);
    }
  }