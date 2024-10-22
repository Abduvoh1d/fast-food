import {
    Checkbox, CheckboxOptionType, Col, ColorPicker, DatePicker, Form, FormInstance, Input,
    InputNumber, Radio, Row, Select, SelectProps, TimePicker
} from "antd";
import UploadComponent from "@src/components/Upload";

export interface IForm {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    xxl?: number;
    rows?: number;
    span?: number;
    label?: string;
    message?: string;
    minLength?: number;
    maxLength?: number;
    required?: boolean;
    className?: string;
    disabled?: boolean;
    placeholder?: string;
    name?: string | string[];
    option?: SelectProps['options'];
    radioOptions?: CheckboxOptionType[];
    size?: 'small' | 'middle' | 'large';
    variant?: 'filled' | 'borderless' | 'outlined';
    type?: 'input' | 'textarea' | 'password' | 'checkbox' | 'email' |
        'datePicker' | 'number' | 'timePicker' | 'radio' | 'upload' |
        'url' | 'select' | 'phone' | 'colorPicker';
}

export interface AutoFormProps {
    props?: IForm[];
    form: FormInstance;
    className?: string;
    gutter?: [number, number];
    layout?: 'vertical' | 'horizontal';
    initialValues?: Record<string, unknown>;
    onFinish?: (values: any) => void;
}

export function AutoForm({
                             props,
                             layout = 'vertical',
                             gutter = [20, 0],
                             form,
                             className,
                             initialValues,
                             onFinish,
                         }: AutoFormProps) {

    function getInput(props: IForm) {
        const commonProps = {
            className: props.className,
            placeholder: props.placeholder,
            disabled: props.disabled,
        };

        const length = {
            minLength: props.minLength,
            maxLength: props.maxLength,
            size: props.size,
            variant: props.variant,
        };

        switch (props.type) {
            case 'input':
                return <Input {...commonProps} {...length} />;
            case 'textarea':
                return <Input.TextArea {...commonProps} {...length} rows={props.rows}/>;
            case 'password':
                return <Input.Password {...commonProps} {...length} />;
            case 'checkbox':
                return (
                    <Checkbox
                        className={props.className}
                    >
                        {props.label}
                    </Checkbox>
                );
            case 'email':
                return <Input type="email" {...commonProps} {...length} />;
            case 'datePicker':
                return <DatePicker {...commonProps} size={props.size}/>;
            case 'number':
                return <InputNumber {...commonProps} {...length} />;
            case 'timePicker':
                return <TimePicker {...commonProps} size={props.size}/>;
            case 'radio':
                return <Radio.Group options={props.radioOptions} {...commonProps} />;
            case 'upload':
                return <UploadComponent />;
            case 'url':
                return <Input type="url" {...commonProps} {...length} />;
            case 'select':
                return <Select options={props.option} {...commonProps} />;
            case 'phone':
                return <Input type="tel" {...commonProps} {...length} />;
            case 'colorPicker':
                return <ColorPicker {...commonProps} size={props.size} defaultValue="#395f94"/>;
            default:
                return <Input {...commonProps} {...length} size={props.size}/>;
        }
    }

    return (
        <Form
            form={form}
            layout={layout}
            className={className}
            initialValues={initialValues}
            onFinish={onFinish}
        >
            <Row gutter={gutter}>
                {props?.map((item, index) => (
                    <Col
                        span={item.span ?? 12}
                        key={index}
                        xs={item.xs}
                        sm={item.sm}
                        md={item.md}
                        lg={item.lg}
                        xl={item.xl}
                        xxl={item.xxl}
                    >
                        <Form.Item
                            label={item.type === 'checkbox' ? undefined : item.label}
                            name={item.name}
                            valuePropName={item.type === 'checkbox' ? 'checked' : 'value'}
                            rules={[
                                {
                                    required: item.required,
                                    message: item.message || `Please input ${item.label ?? item.name}!`,
                                },
                            ]}
                        >
                            {getInput(item)}
                        </Form.Item>
                    </Col>
                ))}
            </Row>
        </Form>
    );
}
