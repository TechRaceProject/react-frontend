import { Question } from '~/interfaces/question.interface';

export interface FormProps {
    dataQuestion: Question[];
    handleSubmit: () => void;
    dataArr: any;
    setDataArr: any;
    label: string;
}
