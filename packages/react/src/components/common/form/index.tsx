import { Fragment } from 'react';
import Input from '../input';
import Button from '../button';
import Select from '../select';
import Switch from '../switch';
import { FormProps } from '~/interfaces/components/common/form.interface';
import { Question } from '~/interfaces/other/question.interface';
import './style.css';

function Form({
    dataQuestion,
    handleSubmit,
    className,
    dataArr,
    setDataArr,
    label,
    outline,
}: FormProps) {
    const linkedInput = (name: string, value: string | boolean) => {
        setDataArr((prevFormData: any) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    return (
        <form className={className} onSubmit={handleSubmit}>
            {dataQuestion.map((question: Question) => (
                <Fragment key={question.id}>
                    {[
                        'email',
                        'number',
                        'text',
                        'tel',
                        'date',
                        'month',
                        'range',
                        'search',
                        'time',
                        'url',
                        'week',
                        'password',
                    ].includes(question.type) && (
                        <Input
                            id={question.name}
                            name={question.name}
                            label={question.label}
                            type={question.type}
                            value={String(dataArr[question.name] || '')}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => linkedInput(question.name, e.target.value)}
                            icon={question.icon}
                            placeholder={question.placeholder}
                        />
                    )}
                    {question.type === 'switch' && (
                        <Switch
                            isChecked={Boolean(dataArr[question.name])}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => linkedInput(question.name, e.target.checked)}
                            label={question.label}
                        />
                    )}
                    {question.type === 'select' && (
                        <Select
                            id={question.name}
                            name={question.name}
                            label={question.label}
                            value={String(
                                (dataArr as any)[question.name] || ''
                            )}
                            options={question.options || []}
                            onChange={(
                                e: React.ChangeEvent<HTMLSelectElement>
                            ) => linkedInput(question.name, e.target.value)}
                            icon={question.icon}
                        />
                    )}
                </Fragment>
            ))}
            <Button text={label} outline={outline} submit />
        </form>
    );
}

export default Form;
