import { useState,useRef } from 'react'
import ReactFlipCard from 'reactjs-flip-card'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MediaCard from '../components/MediaCard';
import OutlinedCard from '../components/OutlinedCard';

function GameStartPage() {

    
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

    const [shuffledNames, setShuffledNames] = useState(["","","","","","","","","","","","",]);
    const [guestHouseId, setGuestHouseId] = useState(null);
    const [originalName, setOriginalName] = useState('');
    const [gameStarted, setGameStarted] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(null);
    const [startTime, setStartTime] = useState(null);
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

        const handleCardClick = (name) => {

            const trimmedOriginalName = originalName.replace(/\s/g, '');
            const now = Date.now();
            const elapsedTime = (now-startTime)/1000;
            const isCorrect = name===trimmedOriginalName;

            navigate('/result',{
                state:{
                    elapsedTime: elapsedTime.toFixed(3),
                    isCorrect
                }
            });
        };

    return (
        <div>
            
            <div style={styles.gridContainer}>
                {shuffledNames.map((name, index) => (
                    <ReactFlipCard
                        key={index}
                        containerStyle={styles.cardContainer}
                        frontStyle={styles.card}
                        backStyle={styles.card}
                        frontComponent={<div>
                            {gameStarted ? 
                            <OutlinedCard title={name} subtitle=""  description="" /> 
                            : <MediaCard photoId={index}/>}
                        </div>}
                        backComponent={<div>
                            {gameStarted ?
                            <OutlinedCard title="이게 정답..?" subtitle=""  description="" />
                            :  <OutlinedCard title="이 게하, 할인받고 싶다면?" subtitle="최대 10% 할인" description="클릭해서 게임 시작하기" />
                        }</div>}
                        onClick={() => handleCardClick(name)}
                    />
                ))}
            </div>
            {gameStarted ? null : <button style={styles.button} onClick={startGame}>게임시작</button>}

        </div>
    );
}

export default GameStartPage;