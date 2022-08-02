// @/main.js
const express = require("express");

const mongoose = require("mongoose");
var cors = require("cors");

const { Todo } = require("./models/todo");
const { User } = require("./models/user");

const app = express();
app.use(cors());

app.use(express.json());

app.get("/", async (req, res) => {
  return res.json({ message: "Hello, World ✌️" });
});

app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findByIdAndDelete(id);
  return res.status(200).json();
});
app.get("/todos", async (req, res) => {
  let allTodos = await Todo.find().populate("user");
  console.log("SSS",allTodos)
  // allTodos.splice(allTodos.length - 2, 2);
  const formatted = allTodos.map((data) => {
    let obj = {
      id: data._id,
      completed: data.completed,
      title: data.title,
      description: data.description,
      user: { id: data?.user?._id, name: data?.user?.name, age: data?.user?.age },
    };
    return obj;
  });
  const response = { todos: formatted };
  return res.status(200).json(formatted);
});
app.get("/todos/:id", async (req, res) => {
  const { id } = req.params;
  console.log("id", id);
  const todo = await Todo.findById(id);
  const user = await User.findById(todo.user);
  return res.status(200).json({
    id: todo._id,
    title: todo.title,
    completed: todo.completed,
    description: todo.description,
    user: { id: user._id, name: user.name, age: user.age },
  });
});
app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  console.log("id", id);
  const todo = await User.findById(id);

  let newTodo={id:todo._id,name:todo.name,age:todo.age}
  return res.status(200).json(newTodo);
});
app.post("/users", async (req, res) => {
  const newUsers = new User({ ...req.body });
  const insertUser = await newUsers.save();
  return res.status(200).json(insertUser);
});
app.get("/users", async (req, res) => {
  const allUsers = await User.find();
  const formatted = allUsers.map((data) => {
    let obj = {
      id: data._id,
      name: data.name,
      age: data.age,
    };
    return obj;
  });
  return res.status(200).json(formatted);
});
app.post("/todos", async (req, res) => {
  const newTodo = new Todo({ ...req.body });
  const insertTodo = await newTodo.save();
  console.log("ddd", insertTodo);
  const response = await Todo.findOne({
    _id: insertTodo._id.toString(),
  }).populate("user");
  let newres = {
    id: response._id,
    completed: response.completed,
    description: response.description,
    title: response.title,
    user: {
      id: response.user._id,
      name: response.user.name,
      age: response.user.age,
    },
  };
  return res.status(201).json(newres);
});

app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  await Todo.updateOne({ _id: id }, req.body);
  const updatedTodo = await Todo.findById(id);
  const user = await User.findById(updatedTodo.user);
  return res.status(200).json({
    id: updatedTodo._id,
    title: updatedTodo.title,
    completed: updatedTodo.completed,
    description: updatedTodo.description,
    user: { id: user.id, name: user.name, age: user.age },
  });
});
const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://yogeshwaran-springboard:yogeshwaran-springboard@graphqlcluster.qjebwty.mongodb.net/test"
    );
    app.listen(4001, () => console.log("Server started on port 4001"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
