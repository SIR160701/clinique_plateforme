import { CssBaseline, Container } from '@mui/material';
import CaseGeneration from './Genreation_cas_clinique';

const App = () => {
  return (
    <>
      {/* Réinitialise les styles pour une mise en page propre */}
      <CssBaseline />

      {/* Conteneur pour centrer le contenu */}
      <Container maxWidth="md" style={{ marginTop: '50px' }}>
        <CaseGeneration />
      </Container>
    </>
  );
};

export default App;
