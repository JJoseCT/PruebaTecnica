import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

interface Course {
  id: string;
  name: string;
}

interface Student {
  id: string;
  name: string;
  enrollments: { course: Course }[];
}

function StudentDetails() {
  const { id } = useParams();
  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/students/${id}`).then((response) => {
      setStudent(response.data);
    });
  }, [id]);

  if (!student) return <Typography>Cargando...</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Cursos en los que está inscrito {student.name}
      </Typography>
      {student.enrollments.length === 0 ? (
        <Typography>Este estudiante no está inscrito en ningún curso.</Typography>
      ) : (
        <List>
          {student.enrollments.map((enrollment) => (
            <ListItem key={enrollment.course.id}>
              <ListItemText primary={enrollment.course.name} />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
}

export default StudentDetails;
