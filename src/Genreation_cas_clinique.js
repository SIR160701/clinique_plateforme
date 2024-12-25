import React, { useState, useEffect } from 'react';
import { LinearProgress, Typography, Box, TextField, Button, List, ListItem, ListItemText, Paper } from '@mui/material';
import { styled } from '@mui/system';

const Container = styled(Box)({
  maxWidth: '600px',
  margin: '0 auto',
  padding: '20px',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
});

const CaseGeneration = () => {
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [cases, setCases] = useState([]);

  // Cas cliniques statiques
  const clinicalCases = [
    { id: 1, date: '2024-12-01', description: 'Cas clinique de pneumonie sévère.' },
    { id: 2, date: '2024-12-02', description: 'Cas clinique de diabète de type 2.' },
    { id: 3, date: '2024-12-03', description: 'Cas clinique de fracture du tibia.' },
    { id: 4, date: '2024-12-04', description: 'Cas clinique de grippe saisonnière.' },
  ];

  const handleGenerate = () => {
    setLoading(true);
    setProgress(0);

    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 90 ? 90 : prev + 10)); // La barre progresse jusqu'à 90%
    }, 500);

    setTimeout(() => {
      clearInterval(timer);
      setProgress(100); // Atteint 100% lorsque terminé

      // Filtrer les cas cliniques par date
      const filteredCases = clinicalCases.filter((clinicalCase) => clinicalCase.date === date);
      setCases(filteredCases);

      setLoading(false);
    }, 3000); // Simulation de 3 secondes de chargement
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Générer des Cas Cliniques
      </Typography>
      <TextField
        type="date"
        label="Sélectionner une date"
        InputLabelProps={{ shrink: true }}
        variant="outlined"
        fullWidth
        value={date}
        onChange={(e) => setDate(e.target.value)}
        sx={{ marginBottom: '20px' }}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? 'Chargement...' : 'Générer'}
      </Button>

      {loading && (
        <Box mt={4}>
          <Typography variant="h6" align="center">
            Génération en cours...
          </Typography>
          <LinearProgress variant="determinate" value={progress} sx={{ marginTop: '10px' }} />
          <Typography align="center" sx={{ marginTop: '10px' }}>
            {progress}%
          </Typography>
        </Box>
      )}

      {!loading && cases.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6">Cas Cliniques Générés :</Typography>
          <Paper elevation={2} sx={{ padding: '10px', marginTop: '10px' }}>
            <List>
              {cases.map((clinicalCase) => (
                <ListItem key={clinicalCase.id} divider>
                  <ListItemText
                    primary={clinicalCase.description}
                    secondary={`Date : ${clinicalCase.date}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      )}

      {!loading && cases.length === 0 && date && (
        <Box mt={4}>
          <Typography variant="h6" color="error" align="center">
            Aucun cas clinique trouvé pour la date sélectionnée.
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default CaseGeneration;

