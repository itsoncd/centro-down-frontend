// hooks/useGetEvaluationsByStudent.ts
import { useQuery } from "@tanstack/react-query";
import type { EvaluationData, ItemData } from "../types";

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNzg3NjU3MDAxLCJleHAiOjE3ODc2NjA2MDEsIm5iZiI6MTc4NzY1NzAwMSwianRpIjoiWm1kc2VNYTJWREtGWEZkMyIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3IiwiZW1haWwiOiJhZG1pbkBleGFtcGxlLmNvbSIsInJvbGVzIjpbImFkbWluIl19.gB_N3akh326vCtcuExccFke4o_ognNLHe22FLAY_5B4"

export const mapEvaluationFromApi = (apiEval: any): EvaluationData => {
  const template = apiEval.evaluation_template;
  const latestVersion = template?.versions?.find((v: any) => v.latest === 1);

  return {
    id: apiEval.id,
    evaluation_id: apiEval.id,
    student_id: apiEval.student_id,
    user_id: apiEval.user_id,
    template_id: apiEval.evaluation_template_id,
    items: (latestVersion?.item_versions ?? []).map((iv: any): ItemData => ({
      item_id: iv.id,
      name: iv.version_name,
      grade: "",
      comments: "",
      templateFiles: iv.files ?? [],
      responseFiles: []
    })),
    status: apiEval.status,
    titulo: template?.name ?? `Evaluación ${apiEval.id}`,
    result: Number(apiEval.result) ?? 0,
    type: template?.type ?? "Académica",
    updated_at: new Date(apiEval.updated_at),
    created_at: new Date(apiEval.created_at),
  };
};

export const useGetEvaluationsByStudent = (studentId: number | null) => {
  return useQuery({
    queryKey: ["evaluations", studentId],
    queryFn: async () => {
      if (!studentId) return [];
      const res = await fetch(`http://127.0.0.1:8000/api/evaluations/student/${studentId}`, {
            headers: { Authorization: `Bearer ${token}` }
            });
      const json = await res.json();
      return json.data.map(mapEvaluationFromApi);
    },
    enabled: !!studentId,
  });
};
