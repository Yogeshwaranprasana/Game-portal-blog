import express from "express";
import bodyParser from "body-parser";
// import { name } from "ejs";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

let posts=[];

app.get("/",(req,res)=>{
    res.render("index.ejs",{ posts:posts });
});

app.get("/feature",(req,res)=>{
  res.render("features.ejs")
})

app.get("/create",(req,res)=>{
  res.render("contact.ejs");
});

app.get("/about",(req,res)=>{
  res.render("about.ejs");
});

app.post("/submit",(req,res)=>{
//  const userBlog =req.body["name"]+req.body["title"]+req.body["text"]
//  console.log(userBlog); 
const {name,title,content}=req.body;
posts.push ({
  name,
  title,
  content
})
 res.redirect("/",);
 console.log({name,title,content});
 
});


// Edit post
app.get("/edit/:index", (req, res) => {
  const index = req.params.index;
  const post = posts[index];
  res.render("edit.ejs", { post, index });
});

app.post("/update/:index", (req, res) => {
  const index = req.params.index;
  const { name, title, content } = req.body;
  posts[index] = { name, title, content };
  res.redirect("/");
});

// Delete post
app.post("/delete/:index", (req, res) => {
  const index = req.params.index;
  posts.splice(index, 1);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
