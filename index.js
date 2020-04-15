const express=require('express');
const path=require('path');
const port=8000;
const db=require('./config/mongoose');
const ToDoList=require('./models/tasks');

const app=express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));
var task=[]

app.get('/',function(req,res){
    ToDoList.find({},function(err,tasks){
        if(err){
            console.log('error in connecting to the database');
            return;
        }
        return res.render('home',{
            title:"Tasks Left to Do",
            task:tasks
        });
    });
    
});
app.post('/addTask',function(req,res){
    ToDoList.create({
        task:req.body.task,
        Category:req.body.Category,
        Date:req.body.Date
    },function(err,newTask){
        if(err){
            console.log('error in creating a new task');
            return;
        }
        console.log('***',newTask);
        return res.redirect('back');
    });
});
app.get("/delete-tasks",function(req,res)
{
    var id=req.query;
    console.log(id);
    //finding the no of selected checkboxes
    var count=Object.keys(id).length;
    console.log(count);
    
    for(let i=0;i<count;i++)
    {
	//iterating over the list and deleting it one by one
        ToDoList.findByIdAndDelete(Object.keys(id)[i],function(err)
        {
            if(err)
            {
                console.log("Error on deleting the task from list");
                return;
            }
        })
    }
    return res.redirect("back");
})

app.listen(port,function(err){
    
    if(err){console.log('Error in running the server at',port);}
    console.log('server is running successfully');
});


