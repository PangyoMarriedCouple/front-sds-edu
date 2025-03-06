import React from 'react';


interface GameAnswerProps {
  text: string;
}

const GameAnswer: React.FC<GameAnswerProps> = ({ text }) => {

  return (
    <div
  style={{
    textAlign: 'center',
    marginTop: '20px',
  }}
>
  <span
    style={{
      display: 'inline-block',
      fontSize: '22px',
      fontWeight: 'bold',
      color: '#432B1F',
      paddingBottom: '5px',
      borderBottom: '2px solid #D8D8D8',
    }}
  >
    정답 : {text}
  </span>
</div>
  );
};

export default GameAnswer;