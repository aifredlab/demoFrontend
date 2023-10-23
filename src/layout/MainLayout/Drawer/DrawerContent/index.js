// project import
import Navigation from './Navigation';
import SimpleBar from 'components/third-party/SimpleBar';
import ChatHistory from './ChatHistory';

// ==============================|| DRAWER CONTENT ||============================== //

const DrawerContent = () => (
  <SimpleBar
    sx={{
      '& .simplebar-content': {
        display: 'flex',
        flexDirection: 'column'
      }
    }}
  >
    <Navigation />
    <ChatHistory />
  </SimpleBar>
);

export default DrawerContent;
