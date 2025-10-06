import React from 'react';
import { Card, Form, Button, Progress, Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import { formStore } from '../store/formStore';
import type { FormInstance } from 'antd/es/form';

interface FormContainerProps {
    form: FormInstance;
    title: string;
    children: React.ReactNode;
    nextButtonText?: string;
    onFinish: () => void;
    onBack?: () => void;
    description?: React.ReactNode;
    currentStep: number;
    totalSteps: number;
    isSubmitting?: boolean;
}

const containerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
};

const cardStyle: React.CSSProperties = {
    maxWidth: '90vw',
    width: '600px',
};

const FormContainer: React.FC<FormContainerProps> = observer(
    ({
        title,
        children,
        onFinish,
        nextButtonText = 'Далее',
        onBack,
        form,
        description,
        currentStep,
        totalSteps,
        isSubmitting,
    }) => {
        return (
            <main style={containerStyle}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    onValuesChange={(_, values) => formStore.setFormData(values)}
                    initialValues={formStore.formData}
                >
                    <Card
                        title={title}
                        style={cardStyle}
                        cover={
                            <Progress
                                percent={(currentStep / totalSteps) * 100}
                                style={{ fontSize: 0 }}
                                strokeLinecap="butt"
                                success={{ percent: 0 }}
                                showInfo={false}
                            />
                        }
                        actions={[
                            <div style={{ textAlign: 'right', paddingRight: '16px' }}>
                                {onBack && (
                                    <Button onClick={onBack} style={{ marginRight: 8 }}>
                                        Назад
                                    </Button>
                                )}
                                <Button type="primary" htmlType="submit" loading={isSubmitting}>
                                    {nextButtonText}
                                </Button>
                            </div>,
                        ]}
                    >
                        {description && (
                            <Typography.Text type="secondary" style={{ display: 'block', marginBottom: 25 }}>
                                {description}
                            </Typography.Text>
                        )}
                        {children}
                    </Card>
                </Form>
            </main>
        );
    }
);

export default FormContainer;
