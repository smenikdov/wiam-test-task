import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => (
    <Result
        status="404"
        title="404"
        subTitle="Извините, страница, которую вы посетили, не существует."
        extra={<Link to="/"><Button type="primary">Вернуться на главную</Button></Link>}
    />
);

export default NotFound;
