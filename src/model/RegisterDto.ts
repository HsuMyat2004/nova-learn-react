
/*
	String username, String password, String email, String address, String education, String userType, List<String> expertises

 */

export interface RegisterDto{
    username: string;
    password: string;
    email: string;
    address: string;
    education: string;
    userType: string;
    expertises: string[];
}