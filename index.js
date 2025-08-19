const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4 : uuidv4} = require("uuid");
const methodOverride = require("method-override")

app.use(express.urlencoded({extended : true}))
app.use(methodOverride("_method"));

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),
        username: "apnacollage",
        content: "I love coding"
    },
    {
        id: uuidv4(),
        username: "priyanshi",
        content: "become a best in your field everyone wants to have you"
    },
    {
        id: uuidv4(),
        username: "shreya",
        content: "Never give up, even after failing. "
    },
];

app.get("/posts", (req, res)=>{ 
    res.render("index.ejs",{posts})
   
})
app.get("/posts/new", (req, res)=>{  
    res.render("new.ejs")
})


app.post("/posts",(req,res)=>{ 
    let id = uuidv4();
    let {username, content} = req.body
    posts.push({id, username, content})
    res.redirect("/posts")
})
app.get("/posts/:id", (req, res) => { //
    let { id } = req.params;
    let post = posts.find((p) => p.id === id);
    
    if (!post) {
        return res.send("Post not found");
    }
    console.log(post);
    res.render("show.ejs", { post });
});
app.patch("/posts/:id", (req, res)=>{
    let {id} = req.params;
    let newContent = req.body.content
    console.log(id);
    console.log(newContent);

    let post = posts.find((p) => p.id === id);
    post.content = newContent;
    res.redirect("/posts")
})
app.get("/posts/:id/edit", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => p.id === id);
    res.render("edit.ejs",{post})
})

app.delete("/posts/:id", (req, res)=>{
    let {id} = req.params;
    posts = posts.filter((p) => p.id !== id);
    res.redirect("/posts")
})


app.listen(port, (req, res)=>{
    console.log(`listenin to port : ${port}`);
} )

