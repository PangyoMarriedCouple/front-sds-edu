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
    <div>
      <h2>🏠 게스트하우스 정보</h2>
      <p>이름: {guestHouse.name}</p>
      <p>위치: {guestHouse.location}</p>
      <p>가격: {guestHouse.price}원</p>
      <p>수용 가능 인원: {guestHouse.capacity}명</p>
    </div>
  );
};

export default GuestHouseResult;
