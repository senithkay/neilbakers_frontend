import styles from "./locations.module.scss";
import Logo from "../../assets/Logo/logo.png";
import EditIcon from "../../assets/Icons/pen-icon.svg";
import DeleteIcon from "../../assets/Icons/delete-gray-icon.svg";
import { Link } from "react-router-dom";
import {useEffect, useState} from "react";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import {sendGET} from "../../utils/apiHelper.ts";
import {GET_BRANCHES} from "../../utils/apiRoute.ts";

const Locations = () => {
    const [openModal, setOpenModal] = useState(false);
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);

    function deletLocation(key: any) {
        const newUsers = locations.filter((location: any) => location._id !== key);
        setLocations([...newUsers]);
    }

    useEffect(() => {
        sendGET(GET_BRANCHES, [])
            .then((jsonData) => {
                if(jsonData.data.map === undefined){
                    setLocations([]);
                }
                setLocations(jsonData.data);
            });
    }, []);



    return (
        <div className={styles.wrapper}>
            <DeleteModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                id={selectedLocation}
                deleteFunction={deletLocation}
                type="branch"
            />
            <div className={styles.mainContainer}>
                <div className={styles.leftContainer}>
                    <div className={styles.companyDetails}>
                        <img src={Logo} />
                        <p>Neil Bakery</p>
                    </div>
                    <div className={styles.userList}>
                        {locations.map((location:any)=>{
                            return (
                                <div className={styles.user}>
                                    <p>{location.name}</p>
                                    <div className={styles.action}>
                                        <button>
                                            <img src={EditIcon}/>
                                        </button>
                                        <button onClick={() => {
                                            setSelectedLocation(location._id);
                                            setOpenModal(true)}}>
                                            <img src={DeleteIcon}/>
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                        <div className={styles.user}>
                            <p>Location 2</p>
                            <div className={styles.action}>
                                <button>
                                    <img src={EditIcon}/>
                                </button>
                                <button onClick={() => setOpenModal(true)}>
                                    <img src={DeleteIcon}/>
                                </button>
                            </div>
                        </div>
                    </div>
                    <Link to={"/add-location"}>
                        <button className={styles.addUserButton}>
                            Add Location
                        </button>
                    </Link>
                </div>
                <div className={styles.rightContainer}>
                    <img src={Logo} />
                </div>
            </div>
        </div>
    );
};

export default Locations;
