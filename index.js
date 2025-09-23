const express= require("express");
const app= express();
const port = 8080;
//unique id ke liye
const {v4 : uuidv4} = require('uuid');
//ejs ke liye 
const path=require("path");
app.set("view engine" , "ejs");
app.set("views", path.join(__dirname, "views"));
//express ko parse krne ke liye  post request  (MIDDLEWARES)
app.use(express.urlencoded({extended : true}));
app.use(express.json());
//css ke liye
app.use( express.static(path.join(__dirname , "public")));

//array mei data store krayenge bcz abhi database nhi connect kiye hai
let posts = [
    {   
        id : uuidv4(),
        username : "harshitpan",
        content : " I love Coding !"
    },
    {   
        id:uuidv4(),
        username : "siyapan",
        content  : "Hardwork is important to achieve success",
    },
    {   
        id: uuidv4(),
        username : "Radheshyam",
        content : "failure is the first key to success",
    },
];


app.get("/posts", (req,res) => {
    res.render("index.ejs" , {posts});
});

app.get("/posts/new" , (req, res) => {
    res.render("new.ejs");
});
app.post("/posts",(req,res)=>{
    let {username , content} = req.body;
    let id=uuidv4();
    posts.push({id,username , content});
    // res.send("post request working");
    res.redirect("/posts");
});

app.get("/posts/:id", (req,res) =>{
    let {id}= req.params;
    let post=posts.find((p) => id=== p.id);
    // console.log(post);
    if(post){
    res.render("show.ejs",{post});
    }else{
        res.render("error.ejs");
    }

});
app.listen(port,()=>{
    console.log("listening to port : 8080");
}); 