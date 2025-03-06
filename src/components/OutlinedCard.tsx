import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

// Props 타입 정의
interface OutlinedCardProps {
  title: string;
  subtitle: string;
  description: string;
}

const OutlinedCard: React.FC<OutlinedCardProps> = ({ title, subtitle, description }) => {
  return (
      <Card variant="outlined" sx={{ width: 150, height: 200 }}>
        <CardContent>
          <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 12 }}>
            Reserve Rush
          </Typography>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
            {subtitle}
          </Typography>
          <Typography variant="body2">{description}</Typography>
        </CardContent>
      </Card>
  );
};

export default OutlinedCard;