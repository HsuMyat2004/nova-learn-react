import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import type { CourseInfoDto } from "../model/CourseInfoDto.ts";
import { CourseContext } from "../context/CourseContext.ts";

// CourseCard component
function CourseCard({ course }: { course: CourseInfoDto }) {
    return (
        <div className="bg-white rounded-lg shadow-xl overflow-hidden transition duration-300 transform hover:scale-[1.02] hover:shadow-2xl border border-gray-100">
            {/* Course Image */}
            <div className="relative h-40 overflow-hidden">
                <img
                    src={`data:image/jpeg;base64,${course.imageBase64}`}
                    alt={course.title}
                    className="w-full h-full object-cover transition duration-500 ease-in-out hover:opacity-90"
                />
                {course.fees === 0 && (
                    <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md">
                        FREE
                    </span>
                )}
            </div>

            {/* Course Details */}
            <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 line-clamp-2 min-h-[3rem]">
                    {course.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1 mb-3">
                    By <span className="font-medium text-purple-700">{course.teacherName}</span>
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 mt-2 border-t pt-3">
                    <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                        </svg>
                        <span className="font-semibold text-gray-700">
                            {course.studentCount?.toLocaleString()}
                        </span>
                        <span className="ml-1">Students</span>
                    </div>
                    <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">
                        {course.category}
                    </span>
                </div>
            </div>

            {/* Price/Action Footer */}
            <div className="p-4 border-t bg-gray-50 flex justify-between items-center">
                <span className="text-xl font-extrabold text-gray-900">
                    {course.fees?.toLocaleString()} MMK
                </span>
                <Link
                    to={`/course/${course.courseId}`}
                    className="bg-purple-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-150 shadow-md"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
}

// Main Component
export default function HomeComponent() {
    const [searchTerm, setSearchTerm] = useState('');
    const { courses, searchCourses, searchCoursesByKeyWord } = useContext(CourseContext);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);
        searchCoursesByKeyWord(value);
    };

    const displayedCourses = searchTerm ? searchCourses : courses;

    return (
        <div className="min-h-screen bg-gray-50 py-10 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <header className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
                        Explore Our Top-Rated Courses
                    </h1>
                    <p className="mt-3 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-6">
                        Learn the latest skills in tech, business, and creativity from industry experts.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto mt-6">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search courses by title, category, or instructor..."
                                value={searchTerm}
                                onChange={handleSearch}
                                className="w-full px-6 py-3 border text-gray-400 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-base"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Course Grid Section */}
                <section className="mt-10">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-bold text-gray-800 border-l-4 border-purple-500 pl-3">
                            {searchTerm ? 'Search Results' : 'Popular Courses'}
                        </h2>
                        {searchTerm && (
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    searchCoursesByKeyWord('');
                                }}
                                className="text-sm text-purple-600 hover:text-purple-800"
                            >
                                Clear search
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {displayedCourses.length > 0 ? (
                            displayedCourses.map(course => (
                                <CourseCard key={course.courseId} course={course} />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-10">
                                <p className="text-lg text-gray-600">
                                    {searchTerm
                                        ? 'No courses found matching your search. Try different keywords.'
                                        : 'No courses are currently available. Check back soon!'
                                    }
                                </p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}