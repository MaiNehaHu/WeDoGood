const API_URL = import.meta.env.VITE_API_URL;

export const getAllReports = async () => {
    try {
        const response = await fetch(`${API_URL}/api/reports`);
        if (!response.ok) {
            console.error("Error fetching all reports:", response.status);
            return;
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error Fetching Reports:", error);
        throw error;
    }
};

export const postReport = async (values: any) => {
    try {
        const response = await fetch(`${API_URL}/api/report`, {
            method: "POST",
            body: JSON.stringify(values),
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            console.log("Error Posting New Report: ", response.status);
            return;
        }

        console.log("Successfully Added Report");
    } catch (error) {
        console.log("Failed to Add Report");
    }
};

export const getDashboardData = async (month: string) => {
    try {
        const response = await fetch(`${API_URL}/api/dashboard/${month}`);

        if (!response.ok) {
            console.log("Error Fetching Dashboard Data: ", response.status);
            return;
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.log("Error Fetching Dashboard Data: ", error);
    }
};
