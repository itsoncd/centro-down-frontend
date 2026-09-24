import { api } from "@/lib/axios";

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