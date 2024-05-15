import React, { useState } from "react";
import Styles from "./stockTableRow.module.scss";
import deleteIcon from "../../assets/Icons/delete-icon.svg"
import DeleteModal from "../DeleteModal/DeleteModal";

interface TableRowProps {
    product: React.ReactNode;
    availableStock: number;
    remainingStock: number;
    soldUnits: number;
    pricePerUnit: number;
    totalSales: number;
    onDelete: (id: string) => void;
    _id:string;
    type:string
}

const TableRow: React.FC<TableRowProps> = ({ product, availableStock, remainingStock , soldUnits , pricePerUnit , totalSales,  onDelete, _id, type}) => {
    const [openModal, setOpenModal] = useState(false);
    return (
        <tr className={Styles.tr}>
            <DeleteModal  type={type} deleteFunction={onDelete}
                         id={_id} open={openModal} onClose={() => setOpenModal(false)} />
            <div className={Styles.td}>
                <td className={Styles.td1}>{product}</td>
                <td className={Styles.td2}>{availableStock}</td>
                <td className={Styles.td3}>{remainingStock}</td>
                <td className={Styles.td4}>{soldUnits}</td>
                <td className={Styles.td5}>{pricePerUnit.toFixed(2)}</td>
                <td className={Styles.td6}>{totalSales.toFixed(2)}</td>
                <td className={Styles.td7}>
                    <img src={deleteIcon} alt="delete" onClick={() => setOpenModal(true)}/>
                </td>
            </div>
        </tr>
    );
};

export default TableRow;
