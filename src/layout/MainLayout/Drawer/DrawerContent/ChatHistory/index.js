// material-ui
import { Box, Typography } from '@mui/material';

// project import
import ChatGroup from './ChatGroup';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { hasChatHistoryUpdate } from 'store/reducers/updateChecker';

// assets
import { ChromeOutlined, QuestionOutlined, CodeOutlined } from '@ant-design/icons';

import axios from 'axios';
// ==============================|| DRAWER CONTENT - CHAT HISTORY ||============================== //

const ChatHistory = () => {
  const updateChecker = useSelector((state) => state.updateChecker);
  const [menuItem, setMenuItem] = useState({});

  useEffect(() => {
    console.log('ChatHistory() starts.................');

    //if (hasChatHistoryUpdate == true) {
    axios
      .get('/api/chatHistory/getChatHistoryList')
      .then((response) => {
        console.log('response=' + JSON.stringify(response));
        //const chatHistoryList = response?.data?.map((item) => ({ ...item, type: 'item', icon: CodeOutlined }));
        const chatHistoryList = response?.data?.map((item) => ({ ...item, type: 'item' }));

        const chatHistoryItem = [
          {
            id: 'chatList',
            title: '대화이력',
            type: 'group',
            children: chatHistoryList
          }
        ];

        setMenuItem({ items: chatHistoryItem });
        console.log('menuItem=' + JSON.stringify(menuItem));
      }) //end of then
      .catch((error) => {
        console.error('Error:', error);
      });
    //}
  }, [updateChecker]);

  return (
    <Box sx={{ pt: 2 }}>
      {menuItem.items?.map((item) => {
        switch (item.type) {
          case 'group':
            return <ChatGroup key={item.id} item={item} />;
          default:
            return (
              <Typography key={item.id} variant="h6" color="error" align="center">
                Fix - Navigation Group
              </Typography>
            );
        }
      })}
    </Box>
  );
};

export default ChatHistory;
