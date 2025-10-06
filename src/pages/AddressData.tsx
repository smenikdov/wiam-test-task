import React, { useEffect } from 'react';
import { AutoComplete, Form, Select } from 'antd';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { formStore } from '../store/formStore';
import { workPlacesStore } from '../store/workPlacesStore';
import { useAddressSuggestions } from '../hooks/useDadata';
import FormContainer from '../components/FormContainer';

const { Option } = Select;

const AddressData: React.FC = observer(() => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const addressOptions = useAddressSuggestions();

    useEffect(() => {
        if (!formStore.isPersonalDataValid) {
            navigate('/form/personal', { replace: true });
            return;
        }

        workPlacesStore.load();
    }, [navigate]);

    const onFinish = () => {
        navigate('/form/loan');
    };

    const onBack = () => {
        navigate('/form/personal');
    };

    return (
        <FormContainer
            title="Шаг 2. Адрес и место работы"
            onFinish={onFinish}
            onBack={onBack}
            form={form}
            description="Укажите ваш адрес и место работы."
            currentStep={2}
            totalSteps={3}
        >
            <Form.Item
                name="workPlace"
                label="Место работы"
                rules={[{ required: true, message: 'Пожалуйста, выберите место работы' }]}
            >
                <Select placeholder="Выберите место работы" loading={workPlacesStore.isLoading}>
                    {workPlacesStore.places.map((place) => (
                        <Option key={place.slug} value={place.name}>
                            {place.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                name="address"
                label="Адрес проживания"
                rules={[{ required: true, message: 'Пожалуйста, введите адрес' }]}
            >
                <AutoComplete {...addressOptions} />
            </Form.Item>
        </FormContainer>
    );
});

export default AddressData;
