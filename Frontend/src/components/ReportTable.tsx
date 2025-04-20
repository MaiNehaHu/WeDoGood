// import React from 'react'

interface Report {
    ngoId: string;
    month: string;
    peopleHelped: number;
    eventsConducted: number;
    fundsUtilized: number;
}

interface ReportTableProps {
    reports: Report[];
}

const ReportTable = ({ reports }: ReportTableProps) => {
    return (
        <div className="overflow-x-auto w-full pb-4">
            <div className="bg-white w-full border border-blue-300 shadow rounded-xl mx-auto">
                <table className="min-w-full text-left">
                    <thead className="bg-blue-200 text-blue-700 text-sm font-semibold">
                        <tr>
                            <th className="py-3 px-4 text-nowrap rounded-tl-xl">User ID</th>
                            <th className="py-3 px-4 text-nowrap">Month</th>
                            <th className="py-3 px-4 text-nowrap">Active Users</th>
                            <th className="py-3 px-4 text-nowrap">Features Used</th>
                            <th className="py-3 px-4 text-nowrap rounded-tr-xl">Revenue Generated</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.length > 0 ? reports.map((report, index) => (
                            <tr
                                key={index}
                                className={"bg-white border-b" + ` ${index !== reports.length - 1 ? "border-blue-300" : "border-transparent"}`}
                            >
                                <td className={`py-3 px-4 text-sm font-medium text-gray-800 ${index === reports.length - 1 ? "rounded-bl-xl" : ""}`}>{report.ngoId}</td>
                                <td className="py-3 px-4 text-sm font-medium text-gray-800">{report.month}</td>
                                <td className="py-3 px-4 text-sm font-medium text-gray-800">{report.peopleHelped}</td>
                                <td className="py-3 px-4 text-sm font-medium text-gray-800">{report.eventsConducted}</td>
                                <td className={`py-3 px-4 text-sm font-medium text-gray-800 ${index === reports.length - 1 ? "rounded-br-xl" : ""}`}>₹{report.fundsUtilized}</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={5} className="text-center py-6 text-gray-500">No Reports Found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ReportTable;
