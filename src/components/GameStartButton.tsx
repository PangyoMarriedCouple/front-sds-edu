import React from 'react';

interface GameStartButtonProps {
  onClick: () => void;
}

const GameStartButton: React.FC<GameStartButtonProps> = ({ onClick }) => {
  const styles: { [key: string]: React.CSSProperties } = {
    button: {
      padding: '15px 40px',
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#432B1F',
      backgroundColor: "rgb(174,156,140)",
      border: '1px solid #D8D8D8',
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease, transform 0.2s ease',
    },
    buttonHover: {
      backgroundColor: '#F6E3CE',
      transform: 'scale(1.05)',
      animation: 'wiggle 0.3s ease-in-out infinite', // 흔들리는 애니메이션 추가
    },
    container: {
      marginTop:'15px',
      position: 'fixed', // 화면 하단 고정
      left: '50%', // 가로 중앙 정렬
      transform: 'translateX(-50%)', // 정확한 가운데 정렬
      zIndex: 1000, // 다른 요소 위에 배치
    },
    wiggleAnimation: `
      @keyframes wiggle {
        0% { transform: rotate(0deg); }
        25% { transform: rotate(-2deg); }
        50% { transform: rotate(2deg); }
        75% { transform: rotate(-2deg); }
        100% { transform: rotate(0deg); }
      }
    `,
  };

  return (
    <>
      <style>{styles.wiggleAnimation}</style> {/* 애니메이션 스타일 추가 */}
      <div style={styles.container}>
        <button
          style={styles.button}
          onClick={onClick}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor;
            e.currentTarget.style.animation = styles.buttonHover.animation;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = styles.button.backgroundColor;
            e.currentTarget.style.animation = 'none';
          }}
        >
          게임 시작!
        </button>
      </div>
    </>
  );
};

export default GameStartButton;
