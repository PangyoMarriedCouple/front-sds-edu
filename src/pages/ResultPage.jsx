import React from 'react';
import { useLocation } from 'react-router-dom';
import GuestHouseResult from '../components/GuestHouseResult';

const ResultPage = () => {
  const location = useLocation();
  const { elapsedTime, isCorrect, guestHouseId } = location.state;

  return (
    <div>
      <h1>게임 결과</h1>
      {isCorrect ? (
        <p>🎉 축하합니다! 정답을 맞추셨습니다.</p>
      ) : (
        <p>😢 아쉽네요. 다음에 다시 도전해보세요.</p>
      )}
      <p>⏱️ 걸린 시간: {elapsedTime}초</p>

      {/* 게스트하우스 정보를 보여주는 컴포넌트 */}
      {guestHouseId && <GuestHouseResult guestHouseId={guestHouseId} />}
    </div>
  );
};

export default ResultPage;
