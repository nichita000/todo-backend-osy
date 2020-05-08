import express from 'express';
import bodyParser from 'body-parser';
import { ToDo } from './db';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function isValidTodo({ title, description, owner }) {
  const isValid = value => value && (typeof value === 'string') && value.length > 3;
  const createError = property => ({
    error: `Property '${property}' is required, must be a string and has at least 3 symbols.`,
    property
  });

  if (!isValid(title)) {
    return createError('title');
  }

  if (!isValid(description)) {
    return createError('description');
  }

  if (!isValid(owner)) {
    return createError('owner');
  }

  return null;
}

app.get('/todos/:owner', (req, res) => {
  ToDo.find({ owner: req.params.owner }, (err, todos) => {
    if (err) {
      console.log(err);
    }

    res.json(todos);
  });
});

app.post('/todos', (req, res) => {
  const error = isValidTodo(req.body);
  if (error) {
    res.json(error);
  }

  const todo = new ToDo(req.body);
  todo.save(null, (err, todo) => {
    if (err) {
      console.log(err);
    }

    res.json(todo);
  });
});

app.delete('/todos/:id', (req, res) => {
  const todoId = req.params.id;

  ToDo.deleteOne({ _id: todoId }, (err) => {
    if (err) {
      console.log(err);
    }

    res.json(todoId)
  })
});

const listener = app.listen(3000, () => {
  console.log(`⚡⚡⚡ Server listens on port: ${listener.address().port} ⚡⚡⚡`);
});
