import {useEffect, useState} from "react";
import type {CourseInfoDto} from "../../model/CourseInfoDto.ts";
import {getAllCourses, updateCourse} from "../../service/NovaLearnService.ts";
import {getLoginUserName} from "../../service/AuthService.ts";
import type {CourseEdit} from "../../model/CourseEdit.ts";
import {Link} from "react-router-dom";

export default function CourseEdit() {
    const [courseInfoDtos, setCourseInfoDtos] = useState<CourseInfoDto[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<CourseInfoDto | null>(null);

    const [title, setTitle] = useState<string>('');
    const [fees, setFees] = useState<number>(0);

    const fetchAllCourses = () => {
        getAllCourses(getLoginUserName()!)
            .then((res) =>
                setCourseInfoDtos(res.data))
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        fetchAllCourses();
    }, [])


    const openEditModal = (course: CourseInfoDto) => {
        setSelectedCourse(course);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCourse(null);
        setTitle('');  // Reset form fields
        setFees(0);    // Reset form fields
    };

    const courseEditHandler = () => {
        if (!selectedCourse?.courseId) {
            console.error('No course selected for editing');
            return;
        }

        const newTitle = title || selectedCourse.title;
        const newFees = fees > 0 ? fees : selectedCourse.fees;

        const courseEdit: CourseEdit = {
            title: newTitle,
            fees: newFees
        };

        updateCourse(courseEdit, selectedCourse.courseId)
            .then((res) => {
                console.log('Course updated successfully:', res.data);
                fetchAllCourses();
                closeModal();
            })
            .catch((err) => {
                console.error('Error updating course:', err);
                // Optionally show an error message to the user
            });
    };


        return (
            <>
                <h1 className="text-3xl font-bold mb-6 text-center">Course Edit</h1>

                <div
                    className="max-w-6xl mx-auto mt-8 rounded-2xl shadow-[0_0_30px_rgba(168,85,247,0.35)] bg-white p-6">
                    <div className="overflow-x-auto rounded-xl">
                        <table className="min-w-[1000px] border-collapse rounded-xl overflow-hidden">
                            <thead>
                            <tr className="bg-purple-50">
                                <th className="px-6 py-4 border">ID</th>
                                <th className="px-6 py-4 border">Title</th>
                                <th className="px-6 py-4 border">Category</th>
                                <th className="px-6 py-4 border">Fees</th>
                                <th className="px-6 py-4 border">Image</th>
                                <th className="px-6 py-4 border">Actions</th>
                            </tr>
                            </thead>

                            <tbody>
                            {courseInfoDtos.map((course, index) => (
                                <tr key={course.courseId} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 border">{index + 1}</td>
                                    <td className="px-6 py-4 border">{course.title}</td>
                                    <td className="px-6 py-4 border">{course.category}</td>
                                    <td className="px-6 py-4 border">{course.fees.toLocaleString()} MMK</td>
                                    <td className="px-6 py-4 border">
                                        <img
                                            src={`data:image/jpeg;base64,${course.imageBase64}`}
                                            className="h-14 w-14 rounded-lg object-cover"
                                        />
                                    </td>
                                    <td className="px-6 py-4 border">
                                        <button
                                            onClick={() => openEditModal(course)}
                                            className="px-4 py-2 mr-3 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
                                        >
                                            Edit
                                        </button>
                                        <Link to={`/admin-dashboard/lessons-entry/${course.courseId}`}> <button
                                            className="px-4 py-2 mr-3 rounded bg-amber-700 text-white text-sm hover:bg-amber-700">
                                            Add Lessons
                                    </button></Link>
                                        <Link to={`/admin-dashboard/lessons-edit/${course.courseId}`}> <button
                                            className="px-4 py-2 rounded bg-green-700 text-white text-sm hover:bg-green-700">
                                            Edit Lessons
                                    </button></Link>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* ✅ EDIT MODAL */}
                {isModalOpen && selectedCourse && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-white w-full max-w-lg rounded-xl shadow-xl p-6 animate-fadeIn">
                            <h2 className="text-xl font-bold mb-4 text-purple-700">
                                Edit Course – {selectedCourse.title}
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium">Title</label>
                                    <input onChange={(e) => setTitle(e.target.value)}
                                           type="text"
                                           defaultValue={selectedCourse.title}
                                           className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium">Fees</label>
                                    <input
                                        onChange={(e) => setFees(Number(e.target.value))}
                                        type="number"
                                        defaultValue={selectedCourse.fees}
                                        className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end mt-6">
                                <button
                                    onClick={closeModal}
                                    className="px-4 py-2 mr-3 rounded bg-gray-300 text-gray-800 hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={courseEditHandler}
                                    className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </>
        );

}