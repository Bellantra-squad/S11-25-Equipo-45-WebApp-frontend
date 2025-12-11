// import { httpApi } from "../refine/api/httpApi";
// import { AxiosRequestConfig } from "axios";

// interface CsvExportConfig {
//     url: string; 
//     params?: Record<string, string | number>;   
//     filenameFallback?: string;
// }

// export const useExportFile = () => {

//     const exportCsv = async (config: CsvExportConfig) => {
//         try {
//             const axiosConfig: AxiosRequestConfig = {
//                 responseType: "blob",
//                 params: config.params ?? {},
//             };

//             const response = await httpApi.get(config.url, axiosConfig);

//             const blob = new Blob([response.data], { type: "text/csv" });
          
//             let filename = config.filenameFallback || "export.csv";

//             const cd = response.headers["content-disposition"];
//             if (cd) {
//                 const match = cd.match(/filename="(.+)"/);
//                 if (match) filename = match[1];
//             }
          
//             const url = URL.createObjectURL(blob);
//             const link = document.createElement("a");

//             link.href = url;
//             link.download = filename;
//             link.click();

//             URL.revokeObjectURL(url);
//         } catch (error) {
//             console.error("Error exportando CSV:", error);
//         }
//     };

//     return { exportCsv };
// };


import { useState, useCallback } from "react";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { httpApi } from "../refine/api/httpApi";

// Tipado de parámetros opcionales
type ExportParams = Record<string, string | number | boolean | undefined>;

export interface UseExportOptions {
    url: string;
    params?: ExportParams;
    filenameFallback?: string;
    method?: "GET" | "POST";
}

interface UseExportReturn {
    exportCsv: (options: UseExportOptions) => Promise<void>;
    exportPdf: (options: UseExportOptions) => Promise<void>;
    isLoading: boolean;
}

/**
 * Hook personalizado para exportar CSV y PDF usando Axios con tipado completo.
 */
export const useExportFile = (): UseExportReturn => {
    const [isLoading, setIsLoading] = useState(false);

    /**
     * Descarga archivo Blob en el navegador
     */
    const downloadBlob = useCallback((blob: Blob, fallbackName: string, header?: string) => {
        let filename = fallbackName;

        // Si viene filename desde el header (ej: content-disposition)
        if (header) {
            const match = header.match(/filename="?([^"]+)"?/);
            if (match?.[1]) {
                filename = match[1];
            }
        }

        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement("a");

        a.href = downloadUrl;
        a.download = filename;
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();

        window.URL.revokeObjectURL(downloadUrl);
        a.remove();
    }, []);

    /**
     * Exportar CSV
     */
    const exportCsv = useCallback(
        async ({ url, params, filenameFallback = "export.csv", method = "GET" }: UseExportOptions) => {
            try {
                setIsLoading(true);

                const config: AxiosRequestConfig = {
                    url,
                    method,
                    params,
                    responseType: "blob",
                };

                const response: AxiosResponse<Blob> = await httpApi(config);

                const blob = new Blob([response.data], { type: "text/csv" });

                downloadBlob(blob, filenameFallback, response.headers?.["content-disposition"]);
            } catch (error) {
                console.error("Error exporting CSV:", error);
            } finally {
                setIsLoading(false);
            }
        },
        [downloadBlob]
    );

    /**
     * Exportar PDF
     */
    const exportPdf = useCallback(
        async ({ url, params, filenameFallback = "export.pdf", method = "GET" }: UseExportOptions) => {
            try {
                setIsLoading(true);

                const config: AxiosRequestConfig = {
                    url,
                    method,
                    params,
                    responseType: "blob",
                };

                const response: AxiosResponse<Blob> = await httpApi(config);

                const blob = new Blob([response.data], { type: "application/pdf" });

                downloadBlob(blob, filenameFallback, response.headers?.["content-disposition"]);
            } catch (error) {
                console.error("Error exporting PDF:", error);
            } finally {
                setIsLoading(false);
            }
        },
        [downloadBlob]
    );

    return { exportCsv, exportPdf, isLoading };
};
