import * as yup from "yup";

export const registerSchema = yup.object(
    {
        fullName: yup.string().required("Full Name is required").min(3, "Full Name must be at least 3 characters"),
        userName: yup.string().required("User Name is required").min(3, "User Name must be at least 3 characters"),
        email: yup.string().email("Invalid email format").required("Email is required"),
        password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters")
        .min(6, "Password must be at least 6 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(/[@$!%*?&]/, "Password must contain at least one special character"),
        phoneNumber: yup.string().required("Phone Number is required").matches(/^05\d{8}$/, "Phone Number must be 10 digits"),
    })
    export const loginSchema = yup.object({
        email: yup.string().email("Invalid email format").required("Email is required"),
        password: yup.string().required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(/[@$!%*?&]/, "Password must contain at least one special character")
    })
