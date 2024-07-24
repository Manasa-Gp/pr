import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Question {
    questionText: string;
    options: string[];
    correctAnswer: number;
}

interface Quiz {
    _id: string;
    title: string;
    description: string;
    quizType: string;
    points: number;
    assignmentGroup: string;
    shuffleAnswers: boolean;
    timeLimit: number;
    multipleAttempts: boolean;
    showCorrectAnswers: string;
    accessCode: string;
    oneQuestionAtATime: boolean;
    webcamRequired: boolean;
    lockQuestionsAfterAnswering: boolean;
    dueDate: Date;
    availableDate: Date;
    untilDate: Date;
    questions: Question[];
}

const initialState: { quizzes: Quiz[] } = {
    quizzes: [],
};

const quizzesSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        setQuizzes: (state, action: PayloadAction<Quiz[]>) => {
            state.quizzes = action.payload;
        },
        addQuiz: (state, action: PayloadAction<Quiz>) => {
            state.quizzes = [...state.quizzes, action.payload];
        },
        deleteQuiz: (state, action: PayloadAction<string>) => {
            state.quizzes = state.quizzes.filter(quiz => quiz._id !== action.payload);
        },
        updateQuiz: (state, action: PayloadAction<Quiz>) => {
            const index = state.quizzes.findIndex(quiz => quiz._id === action.payload._id);
            if (index !== -1) {
                state.quizzes[index] = { ...state.quizzes[index], ...action.payload };
            }
        },
        setQuizDetails: (state, action: PayloadAction<Quiz>) => {
            const index = state.quizzes.findIndex(quiz => quiz._id === action.payload._id);
            if (index !== -1) {
                state.quizzes[index] = action.payload;
            } else {
                // Optionally handle the case where the quiz isn't found in the array
                console.error("Quiz not found in the state");
            }
        },
    },
});

// Export the automatically generated action creators
export const { setQuizzes, addQuiz, deleteQuiz, updateQuiz, setQuizDetails } = quizzesSlice.actions;
export default quizzesSlice.reducer;
