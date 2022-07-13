import { Space, Spin as Spinner } from 'antd';
import "./styles.css"
import React from 'react';

const Spin: React.FC = () => (
  <Space className="spinner">
    <Spinner size="large" />
  </Space>
);

export default Spin;