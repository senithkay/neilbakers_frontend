import FileUpload from "../../components/FileUploader/FileUploader";
import styles from "./viewProduct.module.scss";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {sendGET, sendPUT} from "../../utils/apiHelper.ts";
import {EDIT_PRODUCT, GET_BRANCHES} from "../../utils/apiRoute.ts";

const ViewProducts: React.FC = () => {
    const { id } = useParams();
    const [inputData, setInputData] = useState<any>({});
    const navigate = useNavigate()

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const params:any = [{ key: id, value: inputData._id }];
        sendPUT(EDIT_PRODUCT, params ,inputData).then(async (jasonData) => {
            if (jasonData.data._id !== undefined) {
                navigate("/products");
            }
        });
    };

    useEffect(() => {
        if (id !== undefined){
            const userData = JSON.parse(id);
            setInputData(userData);
        }
    }, []);
    return (
        <form className={styles.wrapper}>
            <div className={styles.topContainer}>
                <p className={styles.pageTitle}>Edit Product</p>
            </div>
            <div className={styles.middleContainer}>
                <div className={styles.inputContainer}>
                    <div className={styles.inputWrapper}>
                        <label>Product Name</label>
                        <input
                            value={inputData.productName}
                            type="text"
                            onChange={(event) => {
                                setInputData({
                                    ...inputData,
                                    productName: event.target.value,
                                });
                            }}
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <label>SKU</label>
                        <input
                            value={inputData.sku}
                            type="text"
                            onChange={(event) => {
                                setInputData({
                                    ...inputData,
                                    sku: event.target.value,
                                });
                            }}
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <label>Price</label>
                        <input
                            value={inputData.price}
                            type="text"
                            onChange={(event) => {
                                setInputData({
                                    ...inputData,
                                    price: event.target.value,
                                });
                            }}
                        />
                    </div>
                </div>
                <div className={styles.inputWrapper}>
                    <label className={styles.descriptionText}>
                        Description
                    </label>
                    <textarea
                        value={inputData.description}
                        onChange={(event) => {
                            setInputData({
                                ...inputData,
                                description: event.target.value,
                            });
                        }}
                    />
                </div>
            </div>
            <button
                className={styles.submitButton}
                type="submit"
                onClick={handleSubmit}
            >
                Submit
            </button>
        </form>
    );
};

export default ViewProducts;
