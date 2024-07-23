import { TGroupedQuestions, TQuestion } from '@/types/questions';
import { format, isToday, isYesterday, parseISO } from 'date-fns';

export const groupQuestionsByDate = (questions: TQuestion[]): TGroupedQuestions => {
    return questions.reduce((acc, question) => {
        const date = parseISO(question.created);
        let dateLabel;

        if (isToday(date)) {
            dateLabel = `Today ${format(date, 'do MMMM, yyyy')}`;
        } else if (isYesterday(date)) {
            dateLabel = `Yesterday ${format(date, 'do MMMM, yyyy')}`;
        } else {
            dateLabel = format(date, 'do MMMM, yyyy');
        }

        if (!acc[dateLabel]) {
            acc[dateLabel] = { label: dateLabel, questions: [] };
        }
        acc[dateLabel].questions.push(question);

        return acc;
    }, {} as TGroupedQuestions);
};
