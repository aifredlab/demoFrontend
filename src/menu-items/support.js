// assets
import { ChromeOutlined, QuestionOutlined, CodeOutlined } from '@ant-design/icons';

// icons
const icons = {
  ChromeOutlined,
  QuestionOutlined,
  CodeOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const support = {
  id: 'support',
  title: 'Support',
  type: 'group',
  children: [
    {
      id: 'sample-page',
      title: 'Sample Page',
      type: 'item',
      url: '/sample-page',
      icon: icons.ChromeOutlined
    },
    // {
    //   id: 'documentation',
    //   title: 'Documentation',
    //   type: 'item',
    //   url: 'https://codedthemes.gitbook.io/mantis/',
    //   icon: icons.QuestionOutlined,
    //   external: true,
    //   target: true
    // },
    {
      id: 'demoBackend',
      title: 'demoBackend',
      type: 'item',
      url: 'https://github.com/aifredlab/demoBackend',
      icon: icons.CodeOutlined,
      external: true,
      target: true
    },
    {
      id: 'demoFrontend',
      title: 'demoFrontend',
      type: 'item',
      url: 'https://github.com/aifredlab/demoFrontend',
      icon: icons.CodeOutlined,
      external: true,
      target: true
    },
    {
      id: 'demoCore',
      title: 'demoCore',
      type: 'item',
      url: 'https://github.com/aifredlab/demoCore',
      icon: icons.CodeOutlined,
      external: true,
      target: true
    }
  ]
};

export default support;
