import React from "react";
import styles from './monthlyStockTable.module.scss';

interface DailyStockItem {
    productName: string;
    openingStock: number;
    soldStock: number;
    balanceStock: number;
    pricePerUnit: number;
    totalSales: number;
    date:string;
}

interface Props {
    data: DailyStockItem[];
}

const MonthlyStockTable: React.FC<Props> = ({ data }) => {
    const totalSales = data.reduce((acc, item) => acc + item.totalSales, 0);
    return (
        <div className={styles.table}>
            <table>
                <thead>
                <tr>
                    <th>Serial No</th>
                    <th>Product Name</th>
                    <th>Opening Stock Qty</th>
                    <th>Sold Stock Qty</th>
                    <th>Balance Qty</th>
                    <th>Stock Date</th>
                    <th>Price per Unit</th>
                    <th>Total Sales</th>
                </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.productName}</td>
                            <td>{item.openingStock}</td>
                            <td>{item.soldStock}</td>
                            <td>{item.balanceStock}</td>
                            <td className={styles.price}>{item.date}</td>
                            <td className={styles.price}>{item.pricePerUnit.toFixed(2)}</td>
                            <td className={styles.price}>{item.totalSales.toFixed(2)}</td>
                        </tr>
                    ))}
                    {/* Display 10 empty rows */}
                    {Array.from({ length: 10 - data.length }).map((_, index) => (
                        <tr key={index + data.length}>
                            <td>{index + data.length + 1}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={7}>Total</td>
                        <td className={styles.price}>{totalSales.toFixed(2)}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default MonthlyStockTable;
