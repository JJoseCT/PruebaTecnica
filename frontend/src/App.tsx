import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Students from './pages/Students';
import Courses from './pages/Courses';
import Enrollments from './pages/Enrollments';
import CourseDetails from './pages/CourseDetails';
import StudentDetails from './pages/StudentDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/students" element={<Students />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/enrollments" element={<Enrollments />} />
      <Route path="/courses/:id" element={<CourseDetails />} />
      <Route path="/students/:id" element={<StudentDetails />} />
    </Routes>
  );
}

export default App;
