import React from 'react';
import { useLocation } from 'react-router-dom';
import GuestHouseResult from '../components/GuestHouseResult';
import Top3RankingCard from '../components/Top3RankingCard'
import Confetti from "react-confetti";

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
      height: '450px',
      justifyContent: 'center',
      alignItems: "stretch",
      margin: '20px',
      marginTop: '50px',
      
    },
    leftColumn: {
      // flex: 1,
      width: '30%',
      height: '100%',
      // background: 'rgb(223, 206, 192)',
      padding: '10px',
      borderRadius: '15px',
      // border: '2px solid rgb(174,156,140)',
      border: '3px solid rgb(223, 206, 192)', 
      marginRight: '30px',
      marginLeft: '20px',
    },
    rightColumn: {
      // flex: 1,
      width: '70%',
      height: '100%',
      background: 'rgb(223, 206, 192)',
      padding: '10px',
      borderRadius: '15px',
      border: '2px solid rgb(174,156,140)',
      //border: '3px solid rgb(223, 206, 192)', 
      marginRight: '50px',
      marginLeft: '20px',
    },
    title:{
      paddingLeft:'10px',
      color:'#432B1F',
      paddingTop: '10px',
    },
    text:{
      paddingLeft:'15px', 
      fontSize:'20px', 
      color:'rgb(117, 87, 60)'
    }
  };

  const location = useLocation();
  const { elapsedTime, isCorrect, guestHouseId } = location.state;
  console.log(guestHouseId, isCorrect, elapsedTime);

  return (
    <div>
      {/* //정답 맞췄을때 */}
      {isCorrect && (
      <>
        <Confetti recycle={false} duration={50} />
      </>
      )}


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


      {/* <div style={{ padding:"10px",textAlign: "center", fontSize: "30px", fontWeight: "bold", color: isCorrect ? "green" : "red" }}>
         {isCorrect ? "🎉 정답!🎉" : "땡😢😢!"}
       </div> */}

      <div style={styles.container}>
        <div style={styles.leftColumn}>
          <h2 style={styles.title}>나의 결과는...?</h2>
            {isCorrect ? (
              <div>
                <p style={styles.text}>정답!</p>
                <p style={styles.text}>{elapsedTime}초</p>
              </div>) : 
              (<p style={styles.text}>실패</p>)}
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