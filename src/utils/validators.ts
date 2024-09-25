export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export const validateEmail = (email: string): boolean => {
    return emailPattern.test(email);
};

export const validatePassword = (password: string): boolean => {
    return passwordPattern.test(password);
};
