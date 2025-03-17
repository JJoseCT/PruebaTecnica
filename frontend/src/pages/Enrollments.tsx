import { useEffect, useState } from 'react';
import { Container, Typography, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import axios from 'axios';

interface Student {
  id: string;
  name: string;
}

interface Course {
  id: string;
  name: string;
}

function Enrollments() {
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/students').then((response) => setStudents(response.data));
    axios.get('http://localhost:3000/courses').then((response) => setCourses(response.data));
  }, []);

  const handleEnrollment = () => {
    if (!selectedStudent || !selectedCourse) return;
    axios
      .post('http://localhost:3000/enrollments', { studentId: selectedStudent, courseId: selectedCourse })
      .then(() => {
        alert('Estudiante inscrito con éxito');
        setSelectedStudent('');
        setSelectedCourse('');
      })
      .catch((error) => {
        alert(error.response.data.message || 'Error en la inscripción');
      });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Inscripción de Estudiantes en Cursos
      </Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel>Seleccionar Estudiante</InputLabel>
        <Select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)}>
          {students.map((student) => (
            <MenuItem key={student.id} value={student.id}>
              {student.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Seleccionar Curso</InputLabel>
        <Select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
          {courses.map((course) => (
            <MenuItem key={course.id} value={course.id}>
              {course.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button variant="contained" color="primary" onClick={handleEnrollment} style={{ marginTop: 10 }}>
        Inscribir Estudiante
      </Button>
    </Container>
  );
}

export default Enrollments;
