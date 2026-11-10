import { useQuery } from "@tanstack/react-query";
import { getInstrumentContent } from "../api/grading.api";

// Fetches the instrument's bytes through the session client. The caller turns the blob
// into an object URL and is responsible for revoking it.
export const useInstrumentBlob = (instrumentId: number | null) => {
    const instrumentQuery = useQuery({
        queryKey: ["instruments", instrumentId, "content"],
        queryFn: () => getInstrumentContent(instrumentId as number),
        enabled: instrumentId !== null,
        staleTime: Infinity,
        gcTime: 0,
    });

    return { instrumentQuery };
};
