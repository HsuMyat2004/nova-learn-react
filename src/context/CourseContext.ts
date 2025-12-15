import type {CourseInfoDto} from "../model/CourseInfoDto.ts";
import {createContext} from "react";

export interface CourseContext {
    courses: CourseInfoDto[];
    searchCourses: CourseInfoDto[];
    searchCoursesByKeyWord: (keyword: string) => void;
}

export const CourseContext = createContext<CourseContext>({
    courses: [],
    searchCourses: [],
    searchCoursesByKeyWord: () => {}
});