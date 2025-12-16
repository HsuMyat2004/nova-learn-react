import type { CourseInfoDto } from "../model/CourseInfoDto.ts";
import { createContext } from "react";

export interface CourseContext {
    courses: CourseInfoDto[];
    searchCourses: CourseInfoDto[];
    searchCoursesByKeyWord: (keyword: string) => void;
    getCourseById: (id: number) => CourseInfoDto;
}

export const CourseContext = createContext<CourseContext>({
    courses: [],
    searchCourses: [],
    searchCoursesByKeyWord: () => {},
    getCourseById: () => {
        return {} as CourseInfoDto
    }
});