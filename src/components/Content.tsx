import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import { SitemarkIcon } from './CustomIcons';

import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import Groups3Icon from '@mui/icons-material/Groups3';
import LoyaltyIcon from '@mui/icons-material/Loyalty';

const items = [
  {
    icon: <AutoFixHighRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: '게스트 하우스 할인 쿠폰!',
    description:
      '미니 게임을 통해 게스트 하우스 할인 쿠폰을 획득하세요!!',
  },
  {
    icon: <AccessAlarmIcon sx={{ color: 'text.secondary' }} />,
    title: '빠르고 간편하게',
    description:
      '미니 게임은 수 초만에 끝납니다. 빠르고 간편하게 쿠폰을 얻어가세요',
  },
  {
    icon: <Groups3Icon sx={{ color: 'text.secondary' }} />,
    title: '랭킹에 따른 보상!',
    description:
      '시간에 따른 순위가 측정되고 순위에 따른 쿠폰 보상이!',
  },
  {
    icon: <LoyaltyIcon sx={{ color: 'text.secondary' }} />,
    title: '경제적',
    description:
      '경제적, 합리적으로 원하는 숙소를 저렴하게 예약할 수 있는 기회!',
  },
];

export default function Content() {
  return (
    <Stack
      sx={{ flexDirection: 'column', alignSelf: 'center', gap: 4, maxWidth: 450 }}
    >
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <SitemarkIcon />
      </Box>
      {items.map((item, index) => (
        <Stack key={index} direction="row" sx={{ gap: 2 }}>
          {item.icon}
          <div>
            <Typography gutterBottom sx={{ fontWeight: 'medium', textAlign: 'left' }}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {item.description}
            </Typography>
          </div>
        </Stack>
      ))}
    </Stack>
  );
}
