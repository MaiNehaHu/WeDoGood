import { useEffect, useState } from 'react';
import { getAllReports, getDashboardData } from "../services/api";
import ReportCard from '../components/ReportTable';
import NavBar from '../components/NavBar';
import { FaBuildingNgo, FaRupeeSign } from 'react-icons/fa6';
import { FaCalendarAlt, FaUserFriends } from 'react-icons/fa';
import { BsFillCalendar2EventFill } from 'react-icons/bs';

interface Report {
    ngoId: string;
    month: string;
    peopleHelped: number;
    eventsConducted: number;
    fundsUtilized: number;
}

interface DashboardReport {
    totalNGOs: string;
    month: string;
    totalPeopleHelped: number;
    totalEvents: number;
    totalFunds: number;
}

function padZero(value: number) {
    return value < 10 ? `0${value}` : value;
}

const Dashboard = () => {
    const [allReports, setAllReports] = useState<Report[]>([]);
    const [filteredReports, setFilteredReports] = useState<Report[]>([]);
    const [dashboardRecord, setDashboardRecord] = useState<DashboardReport>();
    const [inputMonth, setInputMonth] = useState('');
    const [error, setError] = useState('');

    const [loadingList, setLoadingList] = useState(false);
    const [loadingTotal, setLoadingTotal] = useState(false);

    const today = new Date();
    const defaultMonth = `${today.getFullYear()}-${padZero(today.getMonth() + 1)}`;

    useEffect(() => {
        const fetchData = async () => {
            setLoadingList(true);

            const data = await getAllReports();
            setAllReports(data);
            setFilteredReports(data.filter((r: { month: string }) => r.month === defaultMonth));
            setLoadingList(false);
        };

        fetchData();
        setInputMonth(defaultMonth);
        getFilteredDateData(defaultMonth);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputMonth(e.target.value);
        setError('');
    };

    const handleShow = () => {
        const isValid = /^\d{4}-(0[1-9]|1[0-2])$/.test(inputMonth);
        if (!isValid) {
            setError('Please enter a valid month in YYYY-MM format');
            return;
        }

        getFilteredDateData(inputMonth);
        const filtered = allReports.filter(r => r.month === inputMonth);
        setFilteredReports(filtered);
    };

    const getFilteredDateData = async (month: string) => {
        try {
            setLoadingTotal(true);
            const result = await getDashboardData(month);
            setDashboardRecord(result);
            setLoadingTotal(false)
        } catch (error) {
            console.log("Error");
        }
    };

    return (
        <>
            <NavBar currentPage={"dashboard"} />

            <div className='w-full p-10 min-h-screen'>
                <div className="relative flex justify-center items-center gap-4 mb-8 flex-wrap">
                    <input
                        type="month"
                        value={inputMonth}
                        max={defaultMonth}
                        onChange={handleInputChange}
                        className="border border-gray-400 rounded-lg px-3 py-2 cursor-pointer hover:bg-blue-100"
                    />
                    <button
                        onClick={handleShow}
                        className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Show
                    </button>
                </div>
                {error && (
                    <p className="text-red-500 text-center mb-8">{error}</p>
                )}

                <h1 className='font-semibold text-3xl mb-8'>Get Monthly Reports</h1>


                <section className='flex flex-row justify-center items-start mb-8'>
                    <div className="flex flex-wrap gap-6 w-full">
                        {/* Total Users */}
                        <div className='flex flex-1 flex-col gap-2 items-start p-4 rounded-xl border-2 border-gray-300'>
                            <div className='border-blue-400 bg-blue-300 rounded-lg border p-3'>
                                <FaBuildingNgo className='text-2xl text-blue-600' />
                            </div>
                            <p className='text-base font-medium text-gray-600'>Total NGOs:</p>
                            {!loadingTotal
                                ? <p className='text-3xl font-semibold'>
                                    {dashboardRecord?.totalNGOs}
                                </p>
                                : <NumberSkeleton />
                            }
                        </div>

                        {/* Report Month */}
                        <div className='flex flex-1 flex-col gap-2 items-start p-4 rounded-xl border-2 border-gray-300'>
                            <div className='border-blue-400 bg-blue-300 rounded-lg border p-3'>
                                <FaCalendarAlt className='text-2xl text-blue-600' />
                            </div>
                            <p className='text-base font-medium text-gray-600'>Report Month:</p>
                            {!loadingTotal
                                ? <p className='text-3xl font-semibold'>
                                    {dashboardRecord?.month}
                                </p>
                                : <NumberSkeleton />
                            }
                        </div>

                        {/* Active Users */}
                        <div className='flex flex-1 flex-col gap-2 items-start p-4 rounded-xl border-2 border-gray-300'>
                            <div className='border-blue-400 bg-blue-300 rounded-lg border p-3'>
                                <FaUserFriends className='text-2xl text-blue-600' />
                            </div>
                            <p className='text-base font-medium text-gray-600'>People Helped:</p>
                            {!loadingTotal
                                ? <p className='text-3xl font-semibold'>
                                    {dashboardRecord?.totalPeopleHelped}
                                </p>
                                : <NumberSkeleton />
                            }
                        </div >

                        {/* Features Used */}
                        < div className='flex flex-1 flex-col gap-2 items-start p-4 rounded-xl border-2 border-gray-300' >
                            <div className='border-blue-400 bg-blue-300 rounded-lg border p-3'>
                                <BsFillCalendar2EventFill className='text-2xl text-blue-600' />
                            </div>
                            <p className='text-base font-medium text-gray-600'>Events Conducted:</p>
                            {!loadingTotal ?
                                <p className='text-3xl font-semibold' >
                                    {dashboardRecord?.totalEvents}
                                </p >
                                : <NumberSkeleton />
                            }
                        </div >

                        {/* Revenue Generated */}
                        < div className='flex flex-1 flex-col gap-2 items-start p-4 rounded-xl border-2 border-gray-300' >
                            <div className='border-blue-400 bg-blue-300 rounded-lg border p-3'>
                                <FaRupeeSign className='text-2xl text-blue-600' />
                            </div>
                            <p className='text-base font-medium text-gray-600'>Funds Utilized:</p>
                            {!loadingTotal ?
                                <p className='text-3xl font-semibold'>
                                    {`₹${dashboardRecord?.totalFunds}`}
                                </p>
                                : <NumberSkeleton />
                            }
                        </div >
                    </div >
                </section >

                <h1 className='font-semibold text-3xl mb-8'>List of Reports</h1>

                <section className='flex flex-row gap-4 flex-wrap justify-center'>
                    {!loadingList ?
                        <ReportCard reports={filteredReports} />
                        : <TableSkeleon />
                    }
                </section>
            </div >
        </>
    );
};

const NumberSkeleton = () => {
    return (
        <div className='w-full rounded-xl bg-blue-100 h-10'></div>
    )
}

const TableSkeleon = () => {
    return (
        <div className='bg-blue-100 flex-1 h-40 rounded-2xl w-full' />
    )
}

export default Dashboard;
