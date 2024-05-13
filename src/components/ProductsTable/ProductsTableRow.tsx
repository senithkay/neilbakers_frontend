import React, { useState } from "react";
import Styles from "./productsTableRow.module.scss";
import EditIcon from "../../assets/Icons/pen-icon.svg";
import DeleteIcon from "../../assets/Icons/delete-gray-icon.svg";
import DeleteModal from "../DeleteModal/DeleteModal";
import {Link} from "react-router-dom";


interface TableRowProps {
    product: React.ReactNode;
    sku: string;
    id:string
    onDelete: (id: string) => void;
    description: string;
    price: string;
}

const TableRow: React.FC<TableRowProps> = ({
    product,
    sku,
    id,
    onDelete,
    description,
    price
}) => {
    const [openModal, setOpenModal] = useState(false);

    return (
        <tr className={Styles.tr}>
            <DeleteModal  type="product" deleteFunction={onDelete}
                         id={id} open={openModal} onClose={() => setOpenModal(false)} />
            <div className={Styles.td}>
                <td className={Styles.td1}>
                    {product}
                </td>
                <td className={Styles.td2}>{sku}</td>
                <td className={Styles.td3}>
                    <div className={Styles.action}>
                        <Link to={`/add-products/${JSON.stringify({productName:product, description:description, price:price, sku:sku,_id:id})}`}>
                            <button>
                                <img src={EditIcon}/>
                            </button>
                        </Link>
                        <button onClick={() => setOpenModal(true)}>
                        <img src={DeleteIcon} />
                        </button>
                    </div>
                </td>
            </div>
        </tr>
    );
};

export default TableRow;
