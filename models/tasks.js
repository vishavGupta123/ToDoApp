const mongoose=require('mongoose');
const todoListSchema=new mongoose.Schema({
    task:{
        type:String,
        required:true
    },
    Category:{
        type:String,
        required:true
    },
    Date:{
        type:Date,
        required:true
    }
});

const ToDoList=mongoose.model('ToDoList',todoListSchema);
module.exports=ToDoList;