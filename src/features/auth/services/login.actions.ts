import { api, ensureCsrf } from "@/lib/axios";
import type { ApiEnvelope } from "@/types";
import type { AuthUser, LoginFormType } from "../types";


export const loginActions = {

    // Login only establishes the server session, so the authenticated user
    // (and its roles) has to be read from /auth/user afterwards.
    login: async (body: LoginFormType): Promise<AuthUser> => {
        await ensureCsrf();

        const response = await api.post('/login', body);

        if (response.status !== 204) {
            throw new Error(`Unexpected login response: ${response.status}`);
        }

        return loginActions.getCurrentUser();
    },

    getCurrentUser: async (): Promise<AuthUser> => {
        const { data } = await api.get<ApiEnvelope<AuthUser>>('/auth/user');
        return data.data;
    },

    logout: async (): Promise<void> => {
        await api.post('/logout');
    }
};
