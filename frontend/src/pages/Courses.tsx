import { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Course {
  id: string;
  name: string;
  capacity: number;
  cupoDisponible: number;
}

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [name, setname] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [capacity, setCapacity] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = () => {
    axios.get(`${API_URL}/courses`)
      .then((response) => {
        setCourses(response.data);
        setError(null);
      })
      .catch((error) => {
        console.error('Error al obtener los cursos:', error);
        setError('No se pudo cargar la lista de cursos.');
      });
  };

  const handleAddCourse = () => {
    if (!name || !capacity) return;
    
    axios.post(`${API_URL}/courses`, { name, capacity: Number(capacity) })
      .then(() => {
        fetchCourses();
        setname('');
        setCapacity('');
      })
      .catch((error) => {
        console.error('Error al agregar curso:', error);
        setError('No se pudo agregar el curso.');
      });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Lista de Cursos
      </Typography>

      <TextField
        label="Nombre"
        variant="outlined"
        value={name}
        onChange={(e) => setname(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Cupos Limitados"
        type="number"
        variant="outlined"
        value={capacity}
        onChange={(e) => setCapacity(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleAddCourse} style={{ marginTop: 10 }}>
        Agregar Curso
      </Button>

      {error && <Typography color="error">{error}</Typography>}

      <List>
        {courses.map((course) => (
          <ListItem key={course.id}>
            <ListItemText 
              primary={course.name} 
              secondary={`Cupo total: ${course.capacity} - Disponibles: ${course.cupoDisponible ?? 0}`}
            />
            <Button variant="contained" component={Link} to={`/courses/${course.id}`} style={{ marginLeft: 10 }}>
              Ver Inscritos
            </Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default Courses;