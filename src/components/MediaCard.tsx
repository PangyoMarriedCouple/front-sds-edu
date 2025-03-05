import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface MediaCardProps {
    photoId: number;  // photoId prop 정의
  }

export default function MediaCard({ photoId }: MediaCardProps ) {
    const x = photoId % 10;
  return (
    <Card sx={{ width: 150, height: 200 }}> 
      <CardMedia
        sx={{ height: 80 }}
        image={`/static/gh${x}.jpg`}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: '1rem' }}>
          게좋은게스트하우스
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.6rem' }}>
          게좋은게스트하우스 게좋습니다
        </Typography>
      </CardContent>
    </Card>
  );
}