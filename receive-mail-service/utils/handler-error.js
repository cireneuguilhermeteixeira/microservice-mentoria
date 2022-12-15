module.exports = function(status,resp,error ){

    resp.status(status).json(
        {   
            'success' : false,
            'data' : error
        }
    );
}

 