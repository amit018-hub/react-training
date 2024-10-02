

/* This code snippet defines an `authService` object in TypeScript that provides various methods related to handling authentication tokens and data storage using the browser's `localStorage`. Here's a breakdown of what each method does: */

import { httpClient } from "./HttpClient";

export const authService = {
    getItem: (name: string) => localStorage.getItem(name),
    delete: (name: string) => localStorage.removeItem(name),
    setItem: (name: string, data: string) => localStorage.setItem(name, data),
    deleteAll: () => localStorage.clear(),
    isAuthenticated: () => (authService.getItem("token") ? true : false),
    login: (data: any) => httpClient.post(`http://localhost:3005/login`, data),
};


