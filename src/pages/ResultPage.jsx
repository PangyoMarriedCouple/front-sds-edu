import React from 'react';
import { useLocation } from 'react-router-dom';
import GuestHouseResult from '../components/GuestHouseResult';
import Top3RankingCard from '../components/Top3RankingCard'

const ResultPage = () => {

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

    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '20px',
      marginTop: '50px',
      
    },
    leftColumn: {
      // flex: 1,
      width: '30%',
      height: '400px',
      marginRight: '20px',
      background: 'rgb(223, 206, 192)',
      padding: '20px',
      borderRadius: '15px',
      border: '2px solid rgb(174,156,140)',
      marginRight: '50px',
      marginLeft: '20px',
    },
    rightColumn: {
      // flex: 1,
      width: '70%',
      height: '400px',
      background: 'rgb(223, 206, 192)',
      padding: '20px',
      borderRadius: '15px',
      border: '2px solid rgb(174,156,140)',
      marginRight: '20px',
    },
    title:{
      color:' #432B1F',
    }
  };

  const location = useLocation();
  const { elapsedTime, isCorrect, guestHouseId } = location.state;
  console.log(guestHouseId, isCorrect, elapsedTime);

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

      <div style={styles.container}>
        <div style={styles.leftColumn}>
          <h2 >소요 시간</h2>
          <p>{elapsedTime}초</p>
          {guestHouseId && <Top3RankingCard guestHouseId={guestHouseId} />}
        </div>
        
        <div style={styles.rightColumn}>
          {guestHouseId && <GuestHouseResult guestHouseId={guestHouseId} />}
        </div>
      </div>

    </div>
  );
};

export default ResultPage;
