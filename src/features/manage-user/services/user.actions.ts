import { api } from "@/lib/axios";
import type { HTTPResponseUsers, HTTPResponseUser, CreateUserFormType } from "../types";


export const getAllUser = async () => {
    try {
        const { data } = await api.get<HTTPResponseUsers>('/users');
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const createUser = async ( user: CreateUserFormType ) => {
    try {
        const { data } = await api.post<HTTPResponseUser>('/users', user);
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getUser = async (id: number) => {
    try {
        const { data } = await api.get<HTTPResponseUser>(`/user/${id}`);
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};