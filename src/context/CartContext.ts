import type {CourseInfoDto} from "../model/CourseInfoDto.ts";
import {createContext} from "react";


export interface CartContext{
    cartItems: CourseInfoDto[];
    addToCart: (course: CourseInfoDto) => void;
    removeFromCart: (courseId: number) => void;
    clearCart: () => void;
}

export const CartContext = createContext<CartContext>(
    {
        cartItems: [],
        addToCart: () => {},
        removeFromCart: () => {},
        clearCart: () => {}
    }

)