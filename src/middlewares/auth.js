const middlewarOne= (req,res,next)=>{ next(); /* res.send("hello world from 1st")*/}
const middlewareTwo= (req,res)=>{ 
    throw new Error("Error Occured");
    // res.send("hello world from 2nd"); 
}


console.log(middlewarOne);
console.log(middlewareTwo);

module.exports = {middlewarOne, middlewareTwo};