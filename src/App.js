import React from "react";
import "./App.css"
import { Route, Routes } from "react-router-dom";
import Navigation from "./pages/Navigation";
import Landingpage from "./pages/Landingpage"
import Login from "./pages/Login"
import Signup from "./pages/SignUp"
import TeacherHome from "./pages/TeacherHome"
import TeacherSchools from "./pages/TeacherSchools"
import TeacherClassrooms from "./pages/TeacherClassrooms"
import TeacherClassroom from "./pages/TeacherClassroom"
import StudentHome from "./pages/StudentHome"
import StudentSchools from "./pages/StudentSchools"
import StudentClassrooms from "./pages/StudentClassrooms"
import StudentClassroom from "./pages/StudentClassroom"



function App() {

  console.log("App.js loaded")

  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Landingpage />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="teacherhome" element={<TeacherHome />} />
          <Route path="teacherschools" element={<TeacherSchools />} />
          <Route path="teacherclassrooms" element={<TeacherClassrooms />} />
          <Route path="teacherclassroom" element={<TeacherClassroom />} />
          <Route path="studenthome" element={<StudentHome />} />
          <Route path="studentschools" element={<StudentSchools />} />
          <Route path="studentclassrooms" element={<StudentClassrooms />} />
          <Route path="studentclassroom" element={<StudentClassroom />} />
        </Route>
      </Routes>



    </div>
  );
}

export default App;
