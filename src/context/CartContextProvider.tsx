import {useState} from "react";
import type {CourseInfoDto} from "../model/CourseInfoDto.ts";
import {CartContext} from "./CartContext.ts";


interface Props{
    children : React.ReactNode
}

export default function CartContextProvider({children}:Props) {
    const [cartItems, setCartItems] = useState<CourseInfoDto[]>([]);
    const addToCart = (course:CourseInfoDto) => {
        if(duplicateDetect(course)){
            return;
        }
        setCartItems([...cartItems, course]);
    }

    const duplicateDetect= (course:CourseInfoDto) =>{
        return cartItems.some(item => item.courseId === course.courseId);
    }

    const removeFromCart = (courseId:number) => {
        setCartItems(cartItems.filter(item => item.courseId !== courseId));
    }

    const clearCart = () => {
        setCartItems([]);
    }

    const getCourseId = () => {
        return cartItems.map(item => item.courseId);
    }
    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCourseId
    }
    return (
        <>
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
        </>
    );
}
