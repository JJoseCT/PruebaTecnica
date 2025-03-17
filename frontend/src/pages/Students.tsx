import { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Student {
  id: string;
  name: string;
  email: string;
}

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios.get(`${API_URL}/students`)
      .then((response) => {
        setStudents(response.data);
        setError(null);
      })
      .catch((error) => {
        console.error('Error al obtener los estudiantes:', error);
        setError('No se pudo cargar la lista de estudiantes.');
      });
  };

  const handleAddStudent = () => {
    if (!name || !email) return;
    axios.post(`${API_URL}/students`, { name, email })
      .then(() => {
        fetchStudents();
        setName('');
        setEmail('');
      })
      .catch((error) => {
        console.error('Error al agregar estudiante:', error);
        setError('No se pudo agregar el estudiante.');
      });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Lista de Estudiantes
      </Typography>

      <TextField
        label="Nombre"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleAddStudent} style={{ marginTop: 10 }}>
        Agregar Estudiante
      </Button>

      {error && <Typography color="error">{error}</Typography>}

      <List>
        {students.map((student) => (
          <ListItem key={student.id}>
            <ListItemText primary={student.name} secondary={student.email} />
            <Button variant="contained" component={Link} to={`/students/${student.id}`} style={{ marginLeft: 10 }}>
              Ver Cursos
            </Button>  
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default Students;
