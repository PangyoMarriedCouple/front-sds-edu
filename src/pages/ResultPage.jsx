import React from 'react';
import { useLocation } from 'react-router-dom';
import GuestHouseResult from '../components/GuestHouseResult';
import Top3RankingCard from '../components/Top3RankingCard'

const ResultPage = () => {
  const location = useLocation();
  const { elapsedTime, isCorrect, guestHouseId } = location.state;
  console.log(guestHouseId, isCorrect, elapsedTime);

  return (
    <div>
      <h1>게임 결과</h1>
      {isCorrect ? (
        <p>🎉 축하합니다! 정답을 맞추셨습니다.</p>
      ) : (
        <p>😢 아쉽네요. 다음에 다시 도전해보세요.</p>
      )}
      <p>⏱️ 걸린 시간: {elapsedTime}초</p>
      {guestHouseId && <Top3RankingCard guestHouseId={guestHouseId} />}
      {guestHouseId && <GuestHouseResult guestHouseId={guestHouseId} />}
    </div>
  );
};

export default ResultPage;
