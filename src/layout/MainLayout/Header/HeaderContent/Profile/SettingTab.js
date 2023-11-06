import { useState } from 'react';
import * as React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

// assets
import { QuestionCircleOutlined, UserOutlined, DeleteOutlined } from '@ant-design/icons';

// third party
import axios from 'axios';

//project
import Alert from 'components/Alert';

// ==============================|| HEADER PROFILE - SETTING TAB ||============================== //

const SettingTab = () => {
  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [open, setOpen] = React.useState(false);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);

    if (index == 2) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOk = () => {
    setOpen(false);

    axios
      .delete('/api/chatHistory/removeChatHistoryList')
      .then((response) => {})
      .catch((error) => {alert(error)});
  };

  return (
    <>
      <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: theme.palette.grey[500] } }}>
        <ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
          <ListItemIcon>
            <QuestionCircleOutlined />
          </ListItemIcon>
          <ListItemText primary="지원" />
        </ListItemButton>
        <ListItemButton selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
          <ListItemIcon>
            <UserOutlined />
          </ListItemIcon>
          <ListItemText primary="계정설정" />
        </ListItemButton>
        <ListItemButton selected={selectedIndex === 2} onClick={(event) => handleListItemClick(event, 2)}>
          <ListItemIcon>
            <DeleteOutlined />
          </ListItemIcon>
          <ListItemText primary="대화이력삭제" />
        </ListItemButton>
      </List>
      <Alert
        open={open}
        handleClose={handleClose}
        handleOk={handleOk}
        title={'대화이력 삭제'}
        message={'대화이력을 삭제 하시겠습니까?'}
        useCancelYn={'Y'}
      />
    </>
  );
};

export default SettingTab;
