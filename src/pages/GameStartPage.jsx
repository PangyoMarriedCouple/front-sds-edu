import { useState,useRef, useEffect } from 'react'
import ReactFlipCard from 'reactjs-flip-card'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MediaCard from '../components/MediaCard';
import OutlinedCard from '../components/OutlinedCard';
import GameStartButton from '../components/GameStartButton';
import { BorderBottom, BorderColor } from '@mui/icons-material';
import GameAnswer from '../components/GameAnswer';
function GameStartPage() {

    
    const styles = {
        logoBorder:{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom:'2px solid rgb(223, 206, 192)',
            margin: '10px',
        },
        logoContainer: {
            display: 'flex',
            //background: 'rgb(237, 228, 220)',
            //background: '#432B1F',
            justifyContent: 'left', // 가로 가운데 정렬
            alignItems: 'center',    // 세로 가운데 정렬 (필요 시)
            marginTop: '10px',
            marginLeft: '50px',
            padding:'5px',
        },
        logo: {
            width: '150px',          // 로고 크기 조정 (원하는 크기로 설정)
            height: 'auto',          // 비율 유지
        },
        // slogan:{
        //     alignItems: 'right',
        //     color: 'rgb(174,156,140)',
            
        // },
        slogan: {
            display: 'flex',
            flexDirection: 'column',
            color: 'rgb(174,156,140)',
            width: '300px', // 부모 너비 전체 사용
        },
        sloganTextLeft: {
            alignSelf: 'flex-start', // 왼쪽 정렬
            marginLeft: '100px', // 왼쪽으로 이동
            marginBottom:'1px',
            fontStyle: 'italic',
        },
        sloganTextRight: {
            alignSelf: 'flex-end', // 오른쪽 정렬
            marginRight: '30px', // 오른쪽으로 이동
            marginTop:'1px',
        },
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
            padding: '50px',
        },
    };

    const [shuffledNames, setShuffledNames] = useState(["","","","","","","","","","","","",]);
    const [guestHouseId, setGuestHouseId] = useState(null);
    const [originalName, setOriginalName] = useState('');
    const [gameStarted, setGameStarted] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(null);
    const [endTime, setEndTime] = useState(null);  // 게임 종료 시간
    
    const navigate = useNavigate();

    const fetchShuffledNames = async () =>{
        try{
            const response = await axios.get('http://localhost:8080/start')
            const data = response.data;
            return {
                guestHouseId: data.guestHouseId,
                originalName: data.guestHouseName,
                shuffledNames: data.list
            };
        }catch(error){
            console.error('Error fetching shuffled names: ', error);
            return null;
        }
    };


    const startGame = async () => {
        const gameData = await fetchShuffledNames();
        if (gameData) {
            setGuestHouseId(gameData.guestHouseId);
            setOriginalName(gameData.originalName);
            setShuffledNames(gameData.shuffledNames);
            setGameStarted(true);
            setStartTime(Date.now());
        } else {
            console.error('Failed to start the game');
        }
    };

    const addRanking = async (newElapsedTime) => {
        try {
            const rankingData = {
                userId: localStorage.getItem("userId") || "2",
                guestHouseId: guestHouseId || 1,
                durationSeconds: newElapsedTime,
                discountRate: 0.1
            };
            
            const response = await axios.post('http://localhost:8080/ranking/addRanking', rankingData, {
                headers: { 'Content-Type': 'application/json' }
            });
    
            console.log("랭킹이 기록되었습니다. 서버에 저장된 기록:", response.data?.durationSeconds, "랭킹 아이디:", response.data?.rankingId);
    
            return response.data; // ✅ 데이터를 반환하여 handleCardClick에서 사용 가능하도록 변경
        } catch (error) {
            console.error('Error adding Ranking: ', error);
            return null; // 에러 발생 시 null 반환
        }
    };

    const handleCardClick = async (name) => {
        if (gameStarted) {
            const trimmedOriginalName = originalName.replace(/\s/g, '');
            const now = Date.now();
            const newElapsedTime = parseFloat(((now - startTime) / 1000).toFixed(3));
            setElapsedTime(newElapsedTime);
            const isCorrect = name === trimmedOriginalName;
    
            if (isCorrect) {
                try {
                    // ✅ addRanking의 응답을 기다린 후 실행
                    const rankingResponse = await addRanking(newElapsedTime);
                    console.log("랭킹 기록 완료:", rankingResponse);
                } catch (error) {
                    console.error("랭킹 저장 중 오류 발생:", error);
                }
            }
    
            // ✅ 랭킹 저장 완료 후 결과 페이지로 이동
            navigate('/result', {
                state: {
                    elapsedTime: newElapsedTime,
                    isCorrect,
                    guestHouseId: guestHouseId
                }
            });
        }
    };

        // for auto flip
        const [flipStates, setFlipStates] = useState(new Array(12).fill(false)); // false: 카드가 뒤집어지지 않음
        useEffect(() => {
            const interval = setInterval(() => {
                // 랜덤으로 2개의 카드 인덱스 선택
                const randomIndexes = [];
                while (randomIndexes.length < 2) {
                    const rand = Math.floor(Math.random() * 30);
                    if (!randomIndexes.includes(rand)) {
                        randomIndexes.push(rand);
                    }
                }
    
                // 해당 카드들을 뒤집음
                setFlipStates(prev => {
                    const newFlipStates = [...prev];
                    randomIndexes.forEach(index => {
                        newFlipStates[index] = true; // 뒤집기
                    });
                    return newFlipStates;
                });
    
                // 1초 뒤에 다시 원래 상태로 돌아가도록 설정
                setTimeout(() => {
                    setFlipStates(prev => {
                        const newFlipStates = [...prev];
                        randomIndexes.forEach(index => {
                            newFlipStates[index] = false; // 원상복구
                        });
                        return newFlipStates;
                    });
                }, 1000);
            }, 1000);
    
            return () => clearInterval(interval);
        }, []);

        console.log( localStorage.getItem("userId") , localStorage.getItem("userName")  );

    return (
        <div>
            <div style={styles.logoBorder}>
                <div style={styles.logoContainer}>
                    <img src="/src/assets/horLogo2.png" alt="Reserve Rush" style={styles.logo} />
                </div>
                <div style={styles.slogan}>
                    <p style={styles.sloganTextLeft}>
                        Reserve하려면?
                    </p>
                    <p style={styles.sloganTextRight}>
                        지금 바로 Rush!
                    </p>
                </div>
            </div>
            
            <div style={styles.gridContainer}>
                {shuffledNames.map((name, index) => (
                    <ReactFlipCard
                        key={index}
                        containerStyle={styles.cardContainer}
                        frontStyle={styles.card}
                        backStyle={styles.card}
                        frontComponent={
                            <div>
                                {gameStarted ? 
                                <OutlinedCard title={name} subtitle=""  description="" isGameStarted={gameStarted}/> 
                                : <MediaCard photoId={index}/>}
                            </div>}
                        backComponent={
                            <div>
                                {gameStarted ?
                                <OutlinedCard title="이게 정답..?" subtitle=""  description=""  isGameStarted={false}/>
                                :  <OutlinedCard title="이 게하, 할인받고 싶다면?" subtitle="최대 10% 할인" description="게임시작 클릭!" />}
                            </div>}
                        onClick={() => handleCardClick(name)}
                        flipByProp={gameStarted ? false : flipStates[index]}
                    />
                ))}
            </div>
            {gameStarted ? <GameAnswer text={originalName}/> : <GameStartButton style={styles.button} onClick={startGame}/>}
        </div>
    );
}

export default GameStartPage;