import { useState } from 'react'
import ReactFlipCard from 'reactjs-flip-card'

function FlipCardPage() {

    const shuffledNames = [
        '테케이스트스', '이케스트스테', '이테스케트스', '이케스스테트', '트스이스테케',
        '케테이트스스', '스케테스트이', '스이스케테트', '케트스테스이', '이트스케테스',
        '테스케스트이', '스케이트테스', '테케트스이스', '스스테케이트', '스트스케테이',
        '스케이스트테', '이트케테스스', '스트스이테케', '트케테이스스', '테이케트스스',
        '스스케테이트', '이트케스테스', '테스트케이스', '스케이트테스', '스이테트케스',
        '이케테스스트', '스스이테트케', '케테스이스트', '테이스케스트', '스트케테이스'
    ];

    const styles = {
        cardContainer: {  // 부모 div: 100px × 150px
            width: '150px',
            height: '200px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        card: {  // flip card 스타일
            background: 'blue',
            color: 'white',
            borderRadius: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%', // 부모 크기에 맞춤
            height: '100%',
        },
        gridContainer: {  // 그리드 컨테이너
            display: 'grid',
            gridTemplateColumns: 'repeat(6, auto)',  // 6개씩 배치 (100px 크기 고정)
            gap: '30px',
            justifyContent: 'center',
            alignItems: 'center',
            // padding: '30px',
        },
    };

    const [gameStarted, setGameStarted] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);  // 게임 종료 시간


    const startGame = () => {
        setGameStarted(true);
        setStartTime(Date.now());
    };
    const handleCardClick = (name) => {
        if (name === '테스트케이스') {
            const now = Date.now();
            setEndTime(now);  // 클릭한 카드가 맞다면 endTime 설정
            const elapsedTime = (now - startTime) / 1000;  // 걸린 시간 (초 단위)
            alert(`게임 완료! 걸린 시간: ${elapsedTime}초`);
        }
    };

    return (
        <div>
            <button style={styles.button} onClick={startGame}>{gameStarted ? '게하 이름 맞추세요!' : '게임 시작'}</button>

            <div style={styles.gridContainer}>
                {shuffledNames.map((name, index) => (
                    <ReactFlipCard
                        key={index}
                        containerStyle={styles.cardContainer}
                        frontStyle={styles.card}
                        backStyle={styles.card}
                        frontComponent={<div>{gameStarted ? name : '할인쿠폰을 받고 싶다면..?'}</div>}
                        backComponent={<div>{gameStarted ? '이게 정답..?' : '게임을 시작하세요!'}</div>}
                        onClick={() => handleCardClick(name)}
                    />
                ))}
            </div>
        </div>
    );
}

export default FlipCardPage;