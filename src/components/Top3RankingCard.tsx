import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import ForgotPassword from './ForgotPassword';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from './CustomIcons';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Top3RankingCard = ({guestHouseId , rankingId}) => {

    const styles={
      title: {
        color: '#432B1F',
        
        fontWeight: 'bold',
        marginBottom: '10px',
        paddingLeft: '10px',
        paddingTop: '20px'
      },
      rankItem: {
        paddingLeft:'15px', 
        color: 'rgb(117, 87, 60)',
        fontSize: '15px',
        marginBottom: '5px'
      }
    };
    const [guestHouseIdError, setGuestHouseIdError] = React.useState(false);
    const [guestHouseIdErrorMessage, setGuestHouseIdErrorMessage] = React.useState('');
    const [serverError, setServerError] = React.useState("");
    const navigate = useNavigate();

    //const [rankingData, setRankingData] = React.useState<RankingRes[]>([]);
    const [rankingData, setRankingData] = React.useState<any[]>([]);

    React.useEffect(() => {
        if (!guestHouseId) {
            setGuestHouseIdError(true);
            setGuestHouseIdErrorMessage("guestHouseId 값을 처리하는 중 오류가 발생하였습니다.");
            return;
        }
        const fetchRanking = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/ranking/top3/${guestHouseId}`);
                //alert(JSON.stringify(response));
                // 받아온 데이터를 리액트에서 활용할 형태로 변환
                console.log( response );
                const processedData = response.data.map(item => ({
                    id: item.rankingId,
                    user: item.user.name,
                    duration: item.durationSeconds,
                }));
                setRankingData(processedData); // 상태 업데이트
                const foundItem = processedData.find(item => item.id === rankingId);
                if (foundItem) {
                  setTimeout(() => {
                    alert("축하합니다! 3등 안에 들어서 쿠폰이 발급됐습니다!");
                }, 3000);
                } 
            } catch (error) {
                console.error(error);
                setServerError("서버 요청 중 오류가 발생했습니다.");
                setServerError(error.response.data);
            }
        };

        fetchRanking();
    }, [guestHouseId]);

return (
  <div>
    <h2 style={styles.title}>상위 랭커는...?</h2>

    {guestHouseIdError && <p>{guestHouseIdErrorMessage}</p>}

    {serverError && (
      <div>
        {serverError}
      </div>
    )}

    {rankingData.length === 0 ? (
      <p style={styles.rankItem}>데이터가 없습니다.</p>) :
       (<ul>
        {rankingData.map((item, index) => (
          // <li key={item.id} className="mb-2 p-2 border-b">
          <li key={item.id}>
            <p style={styles.rankItem}>
              <strong>순위 {index + 1}</strong><br/>
              사용자 ID: {item.user || "정보 없음"}<br/>
              기록: {item.duration != null ? item.duration + ' 초' : "정보 없음"}</p>
          </li>
      ))}</ul>
    )}
  </div>
);

}

export default Top3RankingCard;