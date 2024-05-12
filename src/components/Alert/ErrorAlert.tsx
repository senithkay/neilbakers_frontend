import React from 'react';
import { Alert } from 'antd';

interface SuccessAlertProps {
  description: string;
}

const ErrorAlert: React.FC<SuccessAlertProps> = ({ description }) => (
  <Alert
    message="Error"
    description={description}
    type="error"
    showIcon
  />
);

export default ErrorAlert;
