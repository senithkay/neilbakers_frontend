import {useEffect, useState} from "react";
import styles from "./weeklyStockReport.module.scss";
import WeeklyStockTable from "../../components/WeeklyStockTable/WeeklyStockTable";
import DateRangePicker from "../../components/RangePicker/RangePicker";
import dayjs from 'dayjs';
import {useParams} from "react-router-dom";
import {sendGET, sendGETPDF} from "../../utils/apiHelper.ts";
import {GET_WEEKLY_REPORT, GET_WEEKLY_REPORT_PDF} from "../../utils/apiRoute.ts";

const WeeklyStockReport = () => {
    const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null);
    const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null);
    const [stocks, setStocks] = useState([]);

    const {id} = useParams();
    useEffect(() => {
        let fromDate = '2123-02-08'
        let toDate = '2123-02-08'
        if (startDate){
            fromDate =  startDate.format('YYYY-MM-DD');
        }
        if (endDate){
            toDate =  endDate.format('YYYY-MM-DD');
        }
        const params = [{key : 'id', value: id}, {key : 'fromDate', value: fromDate}, {key : 'toDate', value: toDate}]
        sendGET(GET_WEEKLY_REPORT, params)
            .then((jsonData) => {
                setStocks(jsonData.data);
            });
    }, [startDate, endDate, id]);

    const handleDateRangeChange = (start: dayjs.Dayjs | null, end: dayjs.Dayjs | null) => {
        setStartDate(start);
        setEndDate(end);
    };

    const handleGetPdf = ()=>{
        let fromDate = '2123-02-08'
        let toDate = '2123-02-08'
        if (startDate){
            fromDate =  startDate.format('YYYY-MM-DD');
        }
        if (endDate){
            toDate =  endDate.format('YYYY-MM-DD');
        }
        const params = [{key : 'id', value: id}, {key : 'fromDate', value: fromDate}, {key : 'toDate', value: toDate}]
        sendGETPDF(GET_WEEKLY_REPORT_PDF, params)
            .then((blob:any) => {
                const url = window.URL.createObjectURL(blob);
                const newWindow = window.open(url);
                if (newWindow === null) {
                    alert('error printing report')
                    return;
                }
                newWindow.onload = () => {
                    newWindow.print();
                };
            });
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.mainContainer}>
                <div className={styles.topContainer}>
                    <p>Weekly Stock Summary Report</p>
                </div>
                <div className={styles.selectDate}>
                    <DateRangePicker
                        startDate={startDate}
                        endDate={endDate}
                        onDateRangeChange={handleDateRangeChange}
                    />
                </div>
                <WeeklyStockTable data={stocks} />
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.printButton} onClick={handleGetPdf}>Print</button>
            </div>
        </div>
    );
};

export default WeeklyStockReport;