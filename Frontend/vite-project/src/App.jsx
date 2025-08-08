
import './App.css'
import {Route,Routes} from 'react-router-dom';
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn';
import TodoForm from './Components/TodoForm';
import TodoList from './Components/TodoList';
import UpdateModal from './Components/UpdateModal';


function App() {


  return (
    <div>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/form" element={<TodoForm />} />
        <Route path="/todolist" element={<TodoList />} />
        <Route path="/updateModal/:id" element={<UpdateModal />} />
      </Routes>
    </div>
  );
}

export default App
