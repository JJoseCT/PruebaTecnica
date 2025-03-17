import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, List, ListItem, ListItemText, TextField, Button } from '@mui/material';
import axios from 'axios';

interface Student {
  id: string;
  name: string;
}

interface Course {
  id: string;
  name: string;
  capacity: number;
  enrollments: { student: Student }[];
}

function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [capacity, setCapacity] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3000/courses/${id}`).then((response) => {
      setCourse(response.data);
      setCapacity(response.data.capacity.toString());
    });
  }, [id]);

  const handleUpdateCapacity = () => {
    if (!capacity) return;
    axios
      .patch(`http://localhost:3000/courses/${id}`, { capacity: Number(capacity) })
      .then(() => {
        alert('Capacidad actualizada');
        setCourse((prev) => (prev ? { ...prev, capacity: Number(capacity) } : prev));
      })
      .catch((error) => {
        alert(error.response.data.message || 'Error al actualizar la capacidad');
      });
  };

  if (!course) return <Typography>Cargando...</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Estudiantes inscritos en {course.name}
      </Typography>

      <TextField
        label="Capacidad Máxima"
        type="number"
        variant="outlined"
        value={capacity}
        onChange={(e) => setCapacity(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleUpdateCapacity} style={{ marginBottom: 20 }}>
        Modificar Capacidad
      </Button>

      {course.enrollments.length === 0 ? (
        <Typography>No hay estudiantes inscritos en este curso.</Typography>
      ) : (
        <List>
          {course.enrollments.map((enrollment) => (
            <ListItem key={enrollment.student.id}>
              <ListItemText primary={enrollment.student.name} />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
}

export default CourseDetails;