import { api } from "@/lib/axios";
import type { HTTPLoginResponse, LoginFormType } from "../types";


export const loginActions = {

    login: async (body: LoginFormType): Promise<HTTPLoginResponse> => {
        try {
            const { data } = await api.post<HTTPLoginResponse>('/login', body);
            return data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
};