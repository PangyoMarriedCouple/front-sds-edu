import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



const card = (
  <React.Fragment>
    <CardContent>
      <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 12 }}>
        Reserve Rush
      </Typography>
      <Typography variant="h6" component="div">
        이 게하, 할인받고 싶다면?
      </Typography>
      <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>최대 10% 할인</Typography>
      <Typography variant="body2">
        클릭해서 게임 시작하기
      </Typography>
    </CardContent>
  </React.Fragment>
);

export default function OutlinedCard() {
  return (
    <Box sx={{ width: 150, height: 200 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}