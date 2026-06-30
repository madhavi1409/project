const Post = require("../models/Post")
const createPost = async(req,res)=>{
  try{
   const{title,description}=req.body;
   if(!title || !description){
    return res.status(400).json({
      success:false,
      message:"title and content are required"
    });
   }
   const post = await Post.create({title,description,user:req.user._id});
   res.status(201).json({
    success:true,
    message:"post created successfully",
    post
   });
  }

catch(err){
  res.status(500).json({
    success:false,
    message:"unable to add POST",
    error:err.message
  })
}
};
const getAllPost = async(req,res)=>{
      try{
       const posts = await Post.find();


       res.json({
        success:true,
        message:"all posts",
        total:posts.length,
        posts
       });
      }
      catch(err){
        res.status(500).json({
          success:false,
          message:"unable to fetch records",
          error:err.message
        });
      }
};
const getMyPost = async(req,res)=>{
     try{
       const posts = await Post.find({user:req.user._id});
       res.status(201).json({
        success:true,
        message:"your posts",
        total:posts.length,
        posts
       });
     }
     catch(err){
      res.status(500).json({
        success:false,
        message:"unable to fetch your posts",
        error:err.message
      });
     }
};

const getSinglePost = async(req,res)=>{
      try{
        const {id} = req.params;

       const post = await Post.findById(id);
       if(!post){

       return res.status(401).json({
        success:false,
        message:"post not found"
        
       });
      }
    res.status(201).json({
      success:true,
      message:"your post",
      post
    })
    
    }
    
      catch(err){
        res.status(500).json({
          success:false,
          message:"unable to fetch records",
          error:err.message
        });
      }
};
module.exports = {createPost, getAllPost, getMyPost, getSinglePost};