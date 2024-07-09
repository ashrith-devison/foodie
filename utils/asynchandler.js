const asynchandler = (request) => (req, res, next) => {
    return Promise.resolve(request(req, res, next)).catch((err)=>{
        if(err.statuscode){
            return res.status(err.statuscode).send({
                error : 1,
                message : err.message
            });
        }
        else{
            return res.status(500).send({
                error : 1,
                message : 'Programmer Error Please check the codeBase' ,
                problem : err.message,
                icon : 'error'
            });
        }
    });
}

module.exports = asynchandler;