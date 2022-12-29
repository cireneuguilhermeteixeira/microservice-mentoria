const axios = require("axios");


module.exports = (req, res, next) => {
    console.log('req.headers',req.headers)
   axios.get(process.env.AUTH_PATH, {
    headers: req.headers
   })
   .then(response => {
        console.log('response.data',response.data.data)
        if(response.data.data.userId) {
            return next();
        }
   })
   .catch(error=> {
      console.log('error',error)
      return res.status(401).send({ error: error.message });

   })
};