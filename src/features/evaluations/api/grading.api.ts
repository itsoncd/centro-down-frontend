import { api } from "@/lib/axios";
import type { GradingWorkspace, SavedGradedItem } from "../types/grading";

interface ApiEnvelope<T> {
  statusCode: number;
  message: string;
  data: T;
  timestamp?: string;
}

// Whole grading workspace of one evaluation: items, instruments, evidence and progress.
export const getGradingWorkspace = async (evaluationId: number): Promise<GradingWorkspace> => {
  const { data } = await api.get<ApiEnvelope<GradingWorkspace>>(
    `/evaluations/${evaluationId}/grading`,
  );
  return data.data;
};

// Saves one instrument's grading. The body is multipart, so the instance-wide JSON
// content type is dropped for this request and the browser sets the boundary.
export const saveInstrumentGrading = async (
  evaluationId: number,
  instrumentId: number,
  body: FormData,
): Promise<SavedGradedItem> => {
  const { data } = await api.post<ApiEnvelope<SavedGradedItem>>(
    `/evaluations/${evaluationId}/instruments/${instrumentId}/grading`,
    body,
    { headers: { "Content-Type": undefined } },
  );
  return data.data;
};

// Raw bytes of one instrument. Fetched as a blob so the SPA can build a same-origin
// object URL: a cross-port iframe cannot render a PDF in Chrome or Firefox.
export const getInstrumentContent = async (instrumentId: number): Promise<Blob> => {
  const { data } = await api.get<Blob>(`/instruments/${instrumentId}`, {
    responseType: "blob",
  });
  return data;
};
