import { useContext } from "react";
import { CartContext } from "../context/CartContext.ts";
import { getLoginUserName } from "../service/AuthService.ts";
import type { EnrolledCourseDto } from "../model/EnrolledCourseDto.ts";
import { enrollCourse } from "../service/NovaLearnService.ts";

export default function EnrolledSuccessComponent() {
    const { getCourseId, cartItems } = useContext(CartContext);
    const courseArray = getCourseId();
    const studentName = getLoginUserName()!;

    const enrolledCourseHandler = () => {
        const enrolledCourseDto: EnrolledCourseDto = {
            courseIdArray: courseArray,
            studentName: studentName
        };

        enrollCourse(enrolledCourseDto)
            .then(res => {
                console.log(res.data);
                // You might want to add a success notification here
            })
            .catch(err => {
                console.error('Enrollment failed:', err);
                // You might want to add an error notification here
            });
    }

    const totalCost = cartItems.reduce((total, item) => total + item.fees, 0);

    return (
        <div className="min-h-screen bg-purple-50 p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
                <h1 className="text-3xl font-bold text-purple-800 mb-6 text-center">
                    Your Course Enrollment
                </h1>

                <div className="space-y-4 mb-8">
                    {cartItems.map((item) => (
                        <div
                            key={item.courseId}
                            className="p-4 border border-purple-100 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors duration-200"
                        >
                            <h3 className="text-lg font-semibold text-purple-900">{item.title}</h3>
                            <p className="text-purple-700">${item.fees.toFixed(2)}</p>
                        </div>
                    ))}
                </div>

                <div className="border-t border-purple-200 pt-4">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-xl font-bold text-purple-900">Total:</span>
                        <span className="text-2xl font-bold text-purple-800">${totalCost.toFixed(2)}</span>
                    </div>

                    <button
                        onClick={enrolledCourseHandler}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                    >
                        Complete Enrollment
                    </button>
                </div>
            </div>
        </div>
    );
}