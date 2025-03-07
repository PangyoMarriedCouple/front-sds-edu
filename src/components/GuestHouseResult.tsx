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
      display: 'flex',
      paddingTop:'5px',
      paddingLeft:'15px',
      // justifyContent: 'center', // 이미지 가운데 정렬
    },
    image: {
      width: '500px',
      height: 'auto',
      objectFit: 'cover',
      borderRadius: '10px',
    },
    infoText: {
      width: '200px',
      //marginTop: '20px', // 사진과 정보 사이 간격 추가
      textAlign: 'left', // 텍스트 가운데 정렬
      paddingLeft: '20px',
    },
    name:{
      fontSize: '20px',
      fontStyle: 'strong',
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
          <p>가격: {guestHouse.price}원</p>
        </div>
      </div>
    </div>
  );

};

export default GuestHouseResult;
