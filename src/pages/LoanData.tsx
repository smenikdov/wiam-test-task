import React, { useEffect, useState } from 'react';
import { Form, Slider, Modal } from 'antd';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { formStore } from '../store/formStore';
import { submitApplication } from '../api/dummyApi';
import { LOAN_AMOUNT, LOAN_TERM } from '../constants';
import FormContainer from '../components/FormContainer';
import { formatCurrency } from '../utils/numbers';

const LoanData: React.FC = observer(() => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const loanAmountValue = Form.useWatch('loanAmount', form) || formStore.formData.loanAmount;
    const loanTermValue = Form.useWatch('loanTerm', form) || formStore.formData.loanTerm;

    useEffect(() => {
        if (!formStore.isPersonalDataValid) {
            navigate('/form/personal', { replace: true });
        } else if (!formStore.isAddressDataValid) {
            navigate('/form/address', { replace: true });
        }
    }, [navigate]);

    const onFinish = async () => {
        setIsSubmitting(true);
        const { firstName, lastName, loanAmount, loanTerm } = formStore.formData;

        try {
            const response = await submitApplication(`${firstName} ${lastName}`);
            if (response) {
                Modal.success({
                    title: 'Заявка успешно отправлена',
                    content: `Поздравляем, ${lastName} ${firstName}. Вам одобрена ${formatCurrency( loanAmount)} на ${loanTerm} дней.`,
                    onOk() {
                        // ...
                        console.log('OK');
                    },
                    onCancel() {
                        // ...
                        console.log('Cancel');
                    },
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const onBack = () => {
        navigate('/form/address');
    };

    return (
        <FormContainer
            title="Шаг 3. Параметры займа"
            onFinish={onFinish}
            onBack={onBack}
            form={form}
            nextButtonText="Подать заявку"
            description="Выберите желаемые условия займа."
            currentStep={3}
            totalSteps={3}
            isSubmitting={isSubmitting}
        >
            <Form.Item
                name="loanAmount"
                label={`Сумма займа: ${formatCurrency(loanAmountValue)}`}
                rules={[{ required: true, message: 'Пожалуйста, выберите сумму займа' }]}
            >
                <Slider
                    min={LOAN_AMOUNT.MIN}
                    max={LOAN_AMOUNT.MAX}
                    step={LOAN_AMOUNT.STEP}
                    tooltip={{ formatter: formatCurrency }}
                />
            </Form.Item>

            <Form.Item
                name="loanTerm"
                label={`Срок займа: ${loanTermValue} дней`}
                rules={[{ required: true, message: 'Пожалуйста, выберите срок займа' }]}
            >
                <Slider min={LOAN_TERM.MIN} max={LOAN_TERM.MAX} step={LOAN_TERM.STEP} />
            </Form.Item>
        </FormContainer>
    );
});

export default LoanData;
