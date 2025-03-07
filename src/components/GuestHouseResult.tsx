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
    <div style={{
      display:"flex",
      flexDirection:"column",
      // justifyContent:"space-between",
      // justifyContent:"left",
      alignItems:"center",
      height:"100%",
      padding:"20px"
    }}>

      <h1 style={{ textAlign: "center", marginBottom: "20px"}}>
        {guestHouse.name}의 정보가 궁금하다면 ?</h1>
      <div style={{
        display: "flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        width: "100%",
        maxWidth: "80%",
      }}>
        <div style={{width:"20%"}}>
          <p>이름: {guestHouse.name}</p>
          <p>위치: {guestHouse.location}</p>
          <p>가격: {guestHouse.price}원</p>
          <p>수용 가능 인원: {guestHouse.capacity}명</p>
        </div>
        <div style={{width:"80%", display:"flex", justifyContent:"center"}}>
          <img
            src={`../static/gh${guestHouseId}.jpg`}
            style={{width:"450px", height:"300px", objectFit:"cover",borderRadius:"10px"}}
          ></img>
        </div>
      </div>
      
    </div>

  );
};

export default GuestHouseResult;
