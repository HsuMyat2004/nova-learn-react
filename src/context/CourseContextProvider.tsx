import {fetchAllCourses} from "../service/NovaLearnService.ts";
import {useState, useEffect} from "react";
import type {CourseInfoDto} from "../model/CourseInfoDto.ts";
import {CourseContext} from "./CourseContext.ts";

interface Props {
    children: React.ReactNode;
}

export default function CourseContextProvider({children}: Props) {
    const [courses, setCourses] = useState<CourseInfoDto[]>([]);
    const [searchCourses, setSearchCourses] = useState<CourseInfoDto[]>([]);


    useEffect(() => {
        fetchAllCourses()
            .then(res => {
                setCourses(res.data);
                setSearchCourses(res.data); // Initialize searchCourses with all courses
            })
            .catch(err => {
                console.error("Error fetching courses:", err);
            });
    }, []);

    const getCourseById = (id: number) => {
        return courses.find(course => course.courseId == id) as CourseInfoDto;
    }

    // CourseContextProvider.tsx
    const searchCoursesByKeyWord = (keyword: string) => {
        if (!keyword.trim()) {
            setSearchCourses(courses); // If search is empty, show all courses
            return;
        }

        const lowerKeyword = keyword.toLowerCase();
        const filteredCourses = courses.filter(course =>
            course.title?.toLowerCase().includes(lowerKeyword) ||
            course.category?.toLowerCase().includes(lowerKeyword) ||
            course.teacherName?.toLowerCase().includes(lowerKeyword)
        );
        setSearchCourses(filteredCourses); // Update searchCourses, not courses
    };

    const value = {
        courses,
        searchCourses,
        searchCoursesByKeyWord,
        getCourseById
    };

    return (
        <CourseContext.Provider value={value}>
            {children}
        </CourseContext.Provider>
    );
}