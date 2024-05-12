import React from 'react';
import { Alert } from 'antd';

interface SuccessAlertProps {
  description: string;
}

const SuccessAlert: React.FC<SuccessAlertProps> = ({ description }) => (
  <Alert
    message="Success"
    description={description}
    type="success"
    showIcon
  />
);

export default SuccessAlert;
