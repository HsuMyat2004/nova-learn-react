/*
private long courseId;
	private String title;
	private String description;
	private BigDecimal fees;
	private String category;
	private String imageBase64;
	private String teacherName;
	private int studentCount;
 */

export interface CourseInfoDto{
    courseId: number;
    title: string;
    description: string;
    fees: number;
    category: string;
    imageBase64: string;
    teacherName: string;
    studentCount: number;
}