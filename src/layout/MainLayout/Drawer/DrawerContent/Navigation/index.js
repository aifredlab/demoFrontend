// material-ui
import { Box, Typography } from '@mui/material';

// project import
import NavGroup from './NavGroup';
import menuItem from 'menu-items';
import { useSelector } from 'react-redux';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

const Navigation = () => {
  const chatHistory = useSelector((state) => state.chatHistory);
  console.log(chatHistory.length);

  // const chatHistoryItem = [
  //   {
  //     id: 'chatList',
  //     title: '채팅목록',
  //     type: 'group',
  //     children: chatHistory
  //   }
  // ];

  // const menuItem = { items: chatHistoryItem };

  const navGroups = menuItem.items.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Navigation Group
          </Typography>
        );
    }
  });

  return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
};

export default Navigation;