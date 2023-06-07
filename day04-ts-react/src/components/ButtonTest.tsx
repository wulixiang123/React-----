import './App.css';
import { Button } from 'antd';
import {SearchOutlined} from '@ant-design/icons'
function App() {
  return (
    <div>
      <Button type="primary">Primary Button</Button>
      <Button disabled type="primary">Primary Button</Button>
      <Button loading  type="primary">Primary Button</Button>
      <Button danger  type="primary">Primary Button</Button>
      <Button ghost  type="primary">Primary Button</Button>
      <Button href='http://baidu.com'  type="primary">Primary Button</Button>
      <Button icon={<SearchOutlined />} type="primary">Primary Button</Button>
    </div>
  );
}

export default App;
