import { Question } from '~/interfaces/other/question.interface';

export interface FormProps {
    dataQuestion: Question[];
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    dataArr: any;
    setDataArr: any;
    label: string;
    className?: string;
    outline?: boolean;
}
