const jwt=require("jsonwebtoken");

const auth=(req,res,next) => {
    console.log("authentication occurs")
    const token=req.headers.authorization;
     if(token){
        try {
            const decoded=jwt.verify(token.split(" ")[1],process.env.secretKey);
            if(decoded){
                // req.body.authorID=decoded.authorID
                // req.body.author=decoded.author
                // console.log(                    "decoded",decoded);
            req.body.userID=decoded.userID;
            req.body.SubAdminName=decoded.SubAdminName;
            req.body.SubAdminProfileUrl=decoded.SubAdminProfileUrl;
            req.body.SubAdminNumber=decoded.SubAdminNumber;
            // req.
         
                next()
            }else{
                res.send({"msg":"Please Login"})
            }
        } catch (error) {
            res.send({"err":error.message})
        }
     }else{
        res.send({"msg":"Please Login"})
     }
};


module.exports ={
    auth
}