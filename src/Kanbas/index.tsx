import "./styles.css";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router-dom";
import Courses from "./Courses";
import * as client from "./Courses/client";
import { useState, useEffect } from "react";
import store from "./store";
import { Provider } from "react-redux";
import { UserProvider } from "./UserContext";
import Account from "./Account";
import ProtectedRoute from "./ProtectedRoute";

export default function Kanbas() {
  const [courses, setCourses] = useState<any[]>([]);
  const fetchCourses = async () => {
    const courses = await client.fetchAllCourses();
    setCourses(courses);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const [course, setCourse] = useState<any>({
    _id: "1234", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15", description: "New Description",
  });

  const addNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    setCourses([...courses, newCourse]);
  };

  const deleteCourse = async (courseId: any) => {
    await client.deleteCourse(courseId);
    setCourses(courses.filter((course) => course._id !== courseId));
  };

  const updateCourse = async () => {
    await client.updateCourse(course);
    setCourses(
      courses.map((c) => c._id === course._id ? course : c)
    );
  };

  return (
    <Provider store={store}>
      <UserProvider> {/* 使用 UserProvider 包裹应用内容 */}
        <div id="wd-kanbas" className="h-100">
          <div className="d-flex h-100">
            <div className="d-none d-md-block bg-black h-100">
              <KanbasNavigation />
            </div>
            <div className="flex-fill p-4">
              <Routes>
                <Route path="/" element={<Navigate to="/Kanbas/Dashboard" />} />
                <Route path="/Account/*" element={<Account />} />
                <Route path="/Dashboard" element={
                    <Dashboard
                      courses={courses}
                      course={course}
                      setCourse={setCourse}
                      addNewCourse={addNewCourse}
                      deleteCourse={deleteCourse}
                      updateCourse={updateCourse}
                    />
                } />
                <Route path="/Courses/*" element={<Courses courses={courses} />} />
                <Route path="/Calendar" element={<h1>Calendar</h1>} />
                <Route path="/Inbox" element={<h1>Inbox</h1>} />
              </Routes>
            </div>
          </div>
        </div>
      </UserProvider>
    </Provider>
  );
}
