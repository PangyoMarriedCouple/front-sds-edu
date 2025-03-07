import React, { useEffect, useState } from 'react';

interface GuestHouseRes {
  name: string;
  location: string;
  price: number;
  capacity: number;
  totalRooms: number;
  bookedRooms: number;
}


const GuestHouseResult = ({ guestHouseId }: { guestHouseId: number }) => {

  guestHouseId = ((guestHouseId - 1) % 12) + 1;
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      paddingLeft: '20px',
      paddingTop: '10px',
    },
    infoContainer: {
      display: 'flex',
      flexDirection: 'row', // 세로 정렬
      alignItems: 'center', // 가운데 정렬
      width: '100%',
      maxWidth: '80%',
      color: 'rgb(95, 61, 31)',
      fontSize: '17px',
    },
    imageContainer: {
      width: '80%',
      height: 'auto',
      display: 'flex',
      paddingTop:'20px',
      paddingLeft:'15px',
      // justifyContent: 'center', // 이미지 가운데 정렬
    },
    image: {
      width: '100%',
      height: 'auto',
      objectFit: 'cover',
      borderRadius: '10px',
    },
    infoText: {
      width: '200px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end', // 내용을 아래쪽으로 정렬
      height: '100%', // 부모 컨테이너의 전체 높이를 사용
      textAlign: 'left',
      paddingLeft: '20px',
    },
    name:{
      fontSize: '20px',
      fontStyle: 'strong',
      margin: '0',
      padding:'0',
    },
    location:{
      margin: '0',
      padding:'0',
      fontSize: '15px',
    },
    price:{
      margin:'0',
      padding:'0',
      fontSize:'15px',
    }
  };

  const [guestHouse, setGuestHouse] = useState<GuestHouseRes | null>(null);

  useEffect(() => {
    const fetchGuestHouseInfo = async () => {
      try {
        const response = await fetch(`http://localhost:8080/end/${guestHouseId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch guest house info');
        }
        const data: GuestHouseRes = await response.json();
        setGuestHouse(data);
      } catch (error) {
        console.error('Error fetching guest house info:', error);
      }
    };

    if (guestHouseId) {
      fetchGuestHouseInfo();
    }
  }, [guestHouseId]);

  if (!guestHouse) {
    return <p>로딩 중...</p>;
  }

  return (
    <div style={styles.container}>
      <h2 style={{ color: '#432B1F' }}>
        이 게스트하우스의 정보가 궁금하다면...?
      </h2>
      
      <div style={styles.infoContainer}>
        {/* 이미지 섹션 */}
        <div style={styles.imageContainer}>
          <img
            src={`../static/gh${guestHouseId}.jpg`}
            alt="게스트하우스 이미지"
            style={styles.image}
          />
        </div>

        {/* 정보 섹션 */}
        <div style={styles.infoText}>
          <h3 style={styles.name}>{guestHouse.name}</h3>
          <h5>{guestHouse.location}</h5>
          <p style={styles.price}>₩ {guestHouse.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} / 박</p>
        </div>
      </div>
    </div>
  );

};

export default GuestHouseResult;
