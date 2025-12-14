import axios from "axios";
import {getToken} from "./AuthService.ts";
import type {CategoryDto} from "../model/CategoryDto.ts";
import type {CourseInfoDto} from "../model/CourseInfoDto.ts";
import type {CourseEdit} from "../model/CourseEdit.ts";

axios.interceptors.request.use(function (config) {
        // Do something before request is sent

    config.headers['Authorization'] = getToken();
        return config;
    }, function (error) {
        return Promise.reject(error);
    },
    { synchronous: true, runWhen: () => true }
);

const BACKEND_DOMAIN_ENTRY_URL = "http://localhost:8080/api/domain-entry";
const BACKEND_COURSE_URL = "http://localhost:8080/api/course-infos";

export const getAllCourses = (teacherName:string) =>
    axios.get<CourseInfoDto[]>(`${BACKEND_COURSE_URL}/${teacherName}`);

export const createCategory= (categoryDto: CategoryDto) =>
     axios.post<string>(`${BACKEND_DOMAIN_ENTRY_URL}/create-category`,categoryDto);

export const getAllCategories = () =>
    axios.get<CategoryDto[]>(`${BACKEND_DOMAIN_ENTRY_URL}/list-category`);


export const createCourse = (course: FormData) =>
    axios.post<string>(`${BACKEND_DOMAIN_ENTRY_URL}/create-course`,course);

export const updateCourse = (courseEdit: CourseEdit,id : number) =>
    axios.put<CourseInfoDto>(`${BACKEND_COURSE_URL}/edit/${id}`,courseEdit);