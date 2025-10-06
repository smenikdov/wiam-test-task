import React from 'react';
import { Form, Select, AutoComplete, Row, Col } from 'antd';
import { MaskedInput } from 'antd-mask-input';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { useNameSuggestions } from '../hooks/useDadata';
import { MALE, FEMALE } from '../constants';
import FormContainer from '../components/FormContainer';

const { Option } = Select;

const PersonalData: React.FC = observer(() => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const nameOptions = useNameSuggestions('NAME');
    const surnameOptions = useNameSuggestions('SURNAME');

    const onFinish = () => {
        navigate('/form/address');
    };

    return (
        <FormContainer
            title="Шаг 1. Личные данные"
            onFinish={onFinish}
            form={form}
            description="Заполните ваши личные данные."
            currentStep={1}
            totalSteps={3}
        >
            <Form.Item
                name="phone"
                label="Телефон"
                rules={[
                    { required: true, message: 'Пожалуйста, введите телефон' },
                    {
                        pattern: /^0\d{3}\s\d{3}\s\d{3}$/,
                        message: 'Неверный формат телефона',
                    },
                ]}
            >
                <MaskedInput mask="\0000 000 000" type="tel" />
            </Form.Item>

            <Row gutter={16}>
                <Col xs={24} md={12}>
                    <Form.Item
                        name="lastName"
                        label="Фамилия"
                        rules={[{ required: true, message: 'Пожалуйста, введите фамилию' }]}
                    >
                        <AutoComplete {...surnameOptions} />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item
                        name="firstName"
                        label="Имя"
                        rules={[{ required: true, message: 'Пожалуйста, введите имя' }]}
                    >
                        <AutoComplete {...nameOptions} />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item
                name="gender"
                label="Пол"
                rules={[{ required: true, message: 'Пожалуйста, выберите пол' }]}
            >
                <Select placeholder="Выберите пол">
                    <Option value={MALE}>Мужской</Option>
                    <Option value={FEMALE}>Женский</Option>
                </Select>
            </Form.Item>
        </FormContainer>
    );
});

export default PersonalData;
