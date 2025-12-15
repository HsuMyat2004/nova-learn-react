import {BrowserRouter, Route, Routes} from "react-router-dom";
import NavbarComponent from "./component/NavbarComponent.tsx";
import HomeComponent from "./component/HomeComponent.tsx";
import FooterComponent from "./component/FooterComponent.tsx";
import LoginComponent from "./component/LoginComponent.tsx";
import RegisterComponent from "./component/RegisterComponent.tsx";
import AdminDashboard from "./component/admin-dashboard/AdminDashboard.tsx";
import CourseDetails from "./component/admin-dashboard/CourseDetails.tsx";
import CategoryEntry from "./component/admin-dashboard/CategoryEntry.tsx";
import CourseEntry from "./component/admin-dashboard/CourseEntry.tsx";
import CourseEdit from "./component/admin-dashboard/CourseEdit.tsx";
import LessonEntry from "./component/admin-dashboard/LessonEntry.tsx";
import LessonEdit from "./component/admin-dashboard/LessonEdit.tsx";

export default function App() {
    return (
        <>
           <BrowserRouter>
               <NavbarComponent />
              <Routes>
                  <Route path="/" element={<HomeComponent />} />
                  <Route path="/login" element={<LoginComponent />} />
                  <Route path="/register" element={<RegisterComponent />} />
                  <Route path="/admin-dashboard" element={<AdminDashboard />} >
                        <Route path="" element={<CourseDetails />} />
                        <Route path="category-entry" element={<CategoryEntry />} />
                        <Route path ="course-entry" element={<CourseEntry />} />
                        <Route path ="course-edit" element={<CourseEdit />} />
                        <Route path="lessons-entry/:id" element={<LessonEntry />} />
                        <Route path="lessons-edit/:id" element={<LessonEdit />}/>
                  </Route>
              </Routes>
               <FooterComponent />
           </BrowserRouter>
            </>
    );
}
