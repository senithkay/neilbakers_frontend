import styles from "./locations.module.scss";
import Logo from "../../assets/Logo/logo.png";
import EditIcon from "../../assets/Icons/pen-icon.svg";
import DeleteIcon from "../../assets/Icons/delete-gray-icon.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import DeleteModal from "../../components/DeleteModal/DeleteModal";

const Locations = () => {
    const [openModal, setOpenModal] = useState(false);

    return (
        <div className={styles.wrapper}>
            <DeleteModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                id={undefined}
                deleteFunction={function (id: string) {
                    throw new Error("Function not implemented.");
                }}
                type="locations"
            />
            <div className={styles.mainContainer}>
                <div className={styles.leftContainer}>
                    <div className={styles.companyDetails}>
                        <img src={Logo} />
                        <p>Neil Bakery</p>
                    </div>
                    <div className={styles.userList}>
                        <div className={styles.user}>
                            <p>Location 1</p>
                            <div className={styles.action}>
                                <button>
                                    <img src={EditIcon} />
                                </button>
                                <button onClick={() => setOpenModal(true)}>
                                    <img src={DeleteIcon} />
                                </button>
                            </div>
                        </div>
                        <div className={styles.user}>
                            <p>Location 2</p>
                            <div className={styles.action}>
                                <button>
                                    <img src={EditIcon} />
                                </button>
                                <button onClick={() => setOpenModal(true)}>
                                    <img src={DeleteIcon} />
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
