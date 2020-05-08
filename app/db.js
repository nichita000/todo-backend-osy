import mongoose from 'mongoose';

mongoose.connect(
  'mongodb+srv://admin:admintodopassword@todo-db-osy-vx72d.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'todo-db-osy' },
);

const dbConnection = mongoose.connection;

dbConnection.on('error', (err) => console.log('err', err));
dbConnection.once('open', () => {
  console.log('🚸🚸🚸 ===== Database Connected ==== 🚸🚸🚸');
});

const ToDoSchema = new mongoose.Schema({
  title: { type: String, unique: true },
  description: String,
  owner: String,
});

export const ToDo = mongoose.model('ToDo', ToDoSchema);
