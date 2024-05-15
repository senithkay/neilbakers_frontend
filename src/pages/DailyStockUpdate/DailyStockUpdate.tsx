import StockTable from "../../components/StockTable/StockTable";
import styles from "./dailyStockUpdate.module.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { sendGET, sendPOST } from "../../utils/apiHelper.ts";
import {
    GET_PRODUCTS,
    GET_STOCK,
    SAVE_DAILY_STOCK,
} from "../../utils/apiRoute.ts";
import {history} from "../../utils/common.ts";

const DailyStockUpdate = () => {
    const [stock, setStock] = useState({} as any);
    const [stocks, setStocks] = useState([] as any);
    const [products, setProducts] = useState([]);
    const [price, setPrice] = useState(0);
    const [sold, setSold] = useState(0);
    const [sales, setSales] = useState(0);
    const [remainingCost, setRemainingCost] = useState(0);

    const { id } = useParams();

    function deleteStock(key: any) {
        const newStocks = stocks.filter((user: any) => user._id !== key);
        setStocks([...newStocks]);
    }
    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (id !== undefined && id.length > 0) {
            setStock({...stock, pricePerUnit:price})
            const payload = {
                branchId: id,
                stock: { ...stock, pricePerUnit: price },
            };
            sendPOST(SAVE_DAILY_STOCK, payload).then(async (jsonData) => {
                if (jsonData.data._id !== undefined) {
                    const newStocks = stocks.filter(
                        (stock: any) =>
                            stock.productId.productName !==
                                jsonData.data.productId.productName ||
                            stock.date !== jsonData.data.date
                    );
                    newStocks.push(jsonData.data);
                    setStocks(newStocks);
                    history.messageApi.open({
                        type: "success",
                        content: "\"Stock updated successfully",
                    });
                    setStock({...stock, productId: '', availableStock:0 , remainingStock:0});
                    setPrice(0)
                    setSold(0);
                    setSales(0);
                    setRemainingCost(0)
                }
            });
        }
    };
    const onProductChange = (id:any)=>{
        const product:any = products.find((product:any) => product._id === id);
        if (product!==undefined){
            setPrice(parseFloat(product.price))
            setSales(sold*product.price)
            setRemainingCost(stock.remainingStock * product.price)
        }
    }
    useEffect(() => {
        sendGET(GET_PRODUCTS, []).then((jsonData) => {
            setProducts(jsonData.data);
        });
        let filterDate = stock.date;
        if (filterDate===undefined){
            const date = new Date();
            filterDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
            setStock({...stock, date:filterDate});
        }
        const params = [{ key: "id", value: id }, {key: "date", value: filterDate }];
        sendGET(GET_STOCK, params).then((jsonData) => {
            setStocks(jsonData.data);
        });
    }, [id, stock.date]);
    return (
        <div className={styles.wrapper}>
            <div className={styles.mainContainer}>
                <div className={styles.topContainer}>
                    <p>Daily Stock Update</p>
                </div>
                <div className={styles.middleContainer}>
                    <div className={styles.inputWrapper}>
                        <label htmlFor="">Select product</label>
                        <select
                            value={stock.productId}
                            name=""
                            id=""
                            onChange={(event) => {
                                onProductChange(event.target.value)
                                setStock({
                                    ...stock,
                                    productId: event.target.value,
                                });
                            }}
                        >
                            <option value={""}></option>
                            {products.map((product: any) => {
                                return (
                                    <option value={product._id}>
                                        {product.productName}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className={styles.inputWrapper}>
                        <label htmlFor="">Select Date</label>
                        <input
                            type="date"
                            value={stock.date}
                            onChange={(event) => {
                                setStock({
                                    ...stock,
                                    date: event.target.value,
                                });
                            }}
                        />
                    </div>
                    <br />
                    <div className={styles.inputWrapper}>
                        <label htmlFor="">Available stock</label>
                        <input
                            type="number"
                            value={stock.availableStock}
                            onChange={(event:any) => {
                                setSold(event.target.value-stock.remainingStock)
                                setSales((event.target.value-stock.remainingStock)* price)
                                setStock({
                                    ...stock,
                                    availableStock: event.target.value,
                                });
                            }}
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <label htmlFor="">Remaining stock</label>
                        <input
                            type="number"
                            value={stock.remainingStock}
                            onChange={(event:any) => {
                                setSold(stock.availableStock-event.target.value)
                                setSales((stock.availableStock-event.target.value)* price)
                                setRemainingCost(event.target.value* price)
                                setStock({
                                    ...stock,
                                    remainingStock: event.target.value,
                                });
                            }}
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <label htmlFor="">Sold units</label>
                        <input disabled={true} type="number" value={sold}/>
                    </div>
                    <div className={styles.inputWrapper}>
                        <label htmlFor="">Price per unit</label>
                        <input
                            value={price.toFixed(2)}
                            type="number"
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <label htmlFor="">Total sales</label>
                        <input disabled={true} value={sales.toFixed(2)} type="number" />
                    </div>
                    <div className={styles.inputWrapper}>
                        <label htmlFor="">Cost of remaining stock</label>
                        <input disabled={true} value={remainingCost.toFixed(2)} type="number" />
                    </div>
                </div>
                <button className={styles.addButton} onClick={handleSubmit}>
                    Add
                </button>
                <StockTable onDelete={deleteStock} data={stocks} />
            </div>
        </div>
    );
};

export default DailyStockUpdate;
