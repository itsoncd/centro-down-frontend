import { api } from "@/lib/axios";
import type { EvaluationItem, EvaluationTemplatePayload } from "../types"

export const getEvaluationTemplatesPage = async (page: number = 1,
     perPage: number = 5,
      sortBy: string = "id",
       direction: string = "desc"): 
       Promise<any> => {
    const { data } = await api.get(`http://localhost:8000/api/evaluation-templates/page`, {
                params: {
                    page,
                    per_page: perPage,
                    sort_by: sortBy,
                    direction,
                },
            });
    return data;
}

export const getInstrumentList = async (type: string): Promise<any> => {
    const { data } = await api.get(`http://localhost:8000/api/evaluation-templates/list/${type}`);
    return data;
}

export const getInstrumentById = async (id: string): Promise<any> => {
    const { data } = await api.get(`http://localhost:8000/api/evaluation-templates/${id}`);
    return data;
}

export const createItem = async (item: EvaluationItem) => {
    const formData = new FormData();
    formData.append("name", item.name);

    item.files.forEach((file) => {
        formData.append("files[]", file);
    });

    const response = await api.post("http://localhost:8000/api/items", formData, { headers: { "Content-Type": "multipart/form-data" } });
    
    return response.data.data;
};

export const createEvaluationTemplate = async (payload: EvaluationTemplatePayload) => {
    const response = await api.post("http://localhost:8000/api/evaluation-templates",
         payload, 
        {
            headers: {
                "Content-Type": "application/json",
            },
        })
    
    return response.data;
};

export const updateEvaluationTemplate = async (id: number, formData: FormData) => {
    const response = await api.post(`http://localhost:8000/api/evaluation-templates/${id}`,
        formData, 
        { headers: { "Content-Type": "multipart/form-data" } });
    return response;
}

export const deleteEvaluationTemplateVersion = async (id: number) => {
    const response = await api.delete(`http://localhost:8000/api/evaluation-templates/${id}`);
    return response;
}