import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

// Props 타입 정의
interface OutlinedCardProps {
  title: string;
  subtitle: string;
  description: string;
  isGameStarted: boolean;
}

const OutlinedCard: React.FC<OutlinedCardProps> = ({ title, subtitle, description, isGameStarted = false }) => {
  return (
      <Card variant="outlined"  sx={{ 
        width: 150, 
        height: 200, 
        backgroundColor: isGameStarted ? 'rgb(206, 182, 163)' : 'white',
        display: "flex", // ✅ 카드 전체를 flex로 설정
        justifyContent: "center", // ✅ 가로 중앙 정렬
        alignItems: "center", // ✅ 세로 중앙 정렬
        position: "relative",
      }}
      //sx={{ width: 150, height: 200, backgroundColor: isGameStarted ?'rgb(206, 182, 163)':'white',}}
      >
        <CardContent>
          <Typography gutterBottom 
          sx={{ color: "text.secondary",
           fontSize: 11,
           position: "absolute",
           top: 12,
           left: 10,
           textAlign: "left", }}>
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
