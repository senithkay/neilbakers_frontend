import styles from "./addLocation.module.scss";
import Logo from "../../assets/Logo/logo.png";
// import {useState} from "react";

const AddLocation = () => {
    // const [location, setLocation] = useState({});
    return (
       
        <div className={styles.wrapper}> 
            <div className={styles.mainContainer}>
                <div className={styles.leftContainer}>
                    <div className={styles.companyDetails}>
                        <img src={Logo} />
                        <p>Neil Bakery</p>
                    </div>
                    <div className={styles.formContainer}>
                        <div className={styles.textContainer}>
                            <p className={styles.title}>Hi ! Super Admin</p>
                            <p className={styles.description}>
                                create an Location
                            </p>
                        </div>
                        <form action="" className={styles.form}>
                            <div className={styles.nameContainer}>
                                <label htmlFor="name"> Location Name</label>
                                <input type="text" id="name" />
                            </div>
                            <button className={styles.createButton}>
                                Create Location
                            </button>
                        </form>
                    </div>
                </div>
                <div className={styles.rightContainer}>
                    <img src={Logo} />
                </div>
            </div>
        </div>
    );
};

export default AddLocation;
