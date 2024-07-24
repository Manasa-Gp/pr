import { configureStore } from "@reduxjs/toolkit";
import modules from "./Courses/Modules/reducer";
import assignmentsReducer from "./Courses/Assignments/reducer";
import quizzesReducer from "./Courses/Quizzes/reducer"
import accountReducer from "./Account/reducer";
const store = configureStore({
  reducer: {
    modules,
    assignments: assignmentsReducer,
    quizzes: quizzesReducer,
    accountReducer,
  },
});
export default store;