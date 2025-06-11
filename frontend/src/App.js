import logo from './logo.svg';
import './App.css';
import {Route,Routes } from 'react-router-dom';
import AdminPanel from './Adminpanel';
import { AddStudent } from './AddStudent';
import { AddClass } from './AddClass';
import { AllClasses } from './AllClasses';
import { AssignStudentForClasses } from './AssignStudentForClasses';
import { MarkAttendance } from './MarkAttendance';




function App() {

  return (
    <Routes>
      <Route path="/" element={<AdminPanel/>} />
      <Route path="/addStudent" element={<AddStudent/>} />
      <Route path="/addClass" element={<AddClass/>} />
      <Route path="/allClass" element={<AllClasses/>} />
      <Route path="/assignClasses" element={<AssignStudentForClasses/>} />
      <Route path="/markAttendance" element={<MarkAttendance/>} />
    </Routes>
  );
}

export default App;
