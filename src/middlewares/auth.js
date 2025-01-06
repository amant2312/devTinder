const middlewarOne= (req,res,next)=>{ next(); /* res.send("hello world from 1st")*/}
const middlewareTwo= (req,res)=>{ res.send("hello world from 2nd"); }


console.log(middlewarOne);
console.log(middlewareTwo);

module.exports = {middlewarOne, middlewareTwo};