import { useParams, Link } from "react-router-dom";
import { CourseContext } from "../context/CourseContext";
import { useContext } from "react";
import {CartContext} from "../context/CartContext.ts";

export default function CourseDetailsComponent() {
    const { id } = useParams();
    const { getCourseById } = useContext(CourseContext);
    const course = getCourseById(Number(id));
    const {addToCart} = useContext(CartContext);
    if (!course) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-gray-600 text-lg">Course not found.</p>
            </div>
        );
    }

    // Handle image source with proper base64 format
    const imageSrc = course.imageBase64
        ? `data:image/jpeg;base64,${course.imageBase64}`
        : 'https://via.placeholder.com/600x400?text=No+Image';



    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6">
            <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
                {/* Image */}
                <div className="w-full h-64 bg-gray-100">
                    <img
                        src={imageSrc}
                        alt={course.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://via.placeholder.com/600x400?text=Image+Not+Available';
                            target.onerror = null; // Prevent infinite loop
                        }}
                    />
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6 space-y-4">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                        {course.title}
                    </h1>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-gray-600">
                        <p className="text-md">
                            <span className="font-semibold">Teacher: </span>
                            <span className="capitalize text-gray-800">
                                {course.teacherName}
                            </span>
                        </p>
                        <p className="text-md">
                            <span className="font-semibold">Category: </span>
                            <span className="text-gray-800">{course.category}</span>
                        </p>
                    </div>

                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {course.description}
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 pt-4 border-t border-gray-100">
                        <p className="text-xl font-semibold text-green-600">
                            ${course.fees.toFixed(2)}
                        </p>
                        <p className="text-gray-500">
                            {course.studentCount.toLocaleString()} students enrolled
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-6 pt-4 border-t border-gray-100">
                        <button
                            onClick={() => addToCart(course)}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition
                                      hover:shadow-md active:scale-95 cursor-pointer"
                        >
                            Add to Cart
                        </button>

                        <Link
                            to="/"
                            className="flex-1 text-center bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-semibold
                                      transition hover:shadow-md active:scale-95 cursor-pointer"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}