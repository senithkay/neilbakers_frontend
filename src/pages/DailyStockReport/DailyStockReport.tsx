import DailyStockTable from "../../components/DailyStockTable/DailyStockTable";
import styles from "./dailyStockReport.module.scss";
import type { DatePickerProps } from "antd";
import { DatePicker } from "antd";
import dayjs from 'dayjs';
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {sendGET, sendGETPDF} from "../../utils/apiHelper.ts";
import {GET_DAILY_REPORT, GET_DAILY_REPORT_PDF} from "../../utils/apiRoute.ts";

const DailyStockReport = () => {
    const [stocks, setStocks] = useState([]);
    const [date, setDate] = useState<string>(getDefaultDate());;

    const {id} = useParams();
    useEffect(() => {
        if(!(date===undefined || date === '' || date === null) && id !== undefined){
            const params = [{key: 'id', value: id}, {key: 'date', value: date}];
            sendGET(GET_DAILY_REPORT, params)
                .then((jsonData) => {
                    setStocks(jsonData.data);
                });
        }
    }, [date, id]);
    const onChange: DatePickerProps["onChange"] = (_date, dateString) => {
        setDate(dateString.toString())
    };
    const handleGetPdf = ()=>{
        const params = [{key: 'id', value: id}, {key: 'date', value: date}];
        sendGETPDF(GET_DAILY_REPORT_PDF, params)
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
                    <p>Daily Stock Summary Report</p>
                </div>
                <div className={styles.selectDate}>
                    <DatePicker
                        defaultValue={dayjs()}
                        className={styles.datePicker}
                        onChange={onChange}
                    />
                </div>
                <DailyStockTable data={stocks} />
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.printButton} onClick={handleGetPdf}>Print</button>
            </div>
        </div>
    );
};

function getDefaultDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export default DailyStockReport;
