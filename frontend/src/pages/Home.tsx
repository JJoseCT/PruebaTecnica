import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Sistema de Gestión Académica
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/students">
        Ver Estudiantes
      </Button>
      <Button variant="contained" color="secondary" component={Link} to="/courses" style={{ marginLeft: 10 }}>
        Ver Cursos
      </Button>
      <Button variant="contained" color="success" component={Link} to="/enrollments" style={{ marginLeft: 10 }}>
        Inscribir Estudiante
      </Button>
    </Container>
  );
}

export default Home;
