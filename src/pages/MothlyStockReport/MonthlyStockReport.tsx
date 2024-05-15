import styles from "./monthlyStockReport.module.scss";
import type { DatePickerProps } from "antd";
import { DatePicker } from "antd";
import dayjs from 'dayjs';
import MonthlyStockTable from "../../components/MonthlyStockTable/MonthlyStockTable";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {sendGET, sendGETPDF} from "../../utils/apiHelper.ts";
import {GET_DASHBOARD_MONTHLY_REPORT, GET_MONTHLY_REPORT_PDF} from "../../utils/apiRoute.ts";

const MonthlystockReport = () => {
    const [stocks, setStocks] = useState([]);
    const [date, setDate] = useState<string>();

    const {id} = useParams();
    useEffect(() => {
        let filterDate = date
        if (filterDate===undefined){
            const currentDate = new Date();
            filterDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`
            setDate(filterDate)
        }
        if(!(date===undefined || date === '' || date === null)){
            const params = [{key: 'id', value: id}, {key: 'date', value: filterDate}];
            sendGET(GET_DASHBOARD_MONTHLY_REPORT, params).then((jsonData) => {
                    setStocks(jsonData.data);
                });
        }
    }, [date, id]);
    const onChange: DatePickerProps["onChange"] = (_date, dateString) => {
        setDate(dateString.toString())
    };
    const handleGetPdf = ()=>{
        const params = [{key: 'id', value: id}, {key: 'date', value: date}];
        sendGETPDF(GET_MONTHLY_REPORT_PDF, params)
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
                    <p>Monthly Stock Summary Report</p>
                </div>
                <div className={styles.selectDate}>
                    <DatePicker
                        defaultValue={dayjs()}
                        className={styles.datePicker}
                        onChange={onChange}
                        picker="month"
                    />
                </div>
                <MonthlyStockTable data={stocks} />
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.printButton} onClick={handleGetPdf}>Print</button>
            </div>
        </div>
    );
};


export default MonthlystockReport;
