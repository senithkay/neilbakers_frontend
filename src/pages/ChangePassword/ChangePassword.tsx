import styles from "./changePassword.module.scss";
import Logo from "../../assets/Logo/logo.png";

const ChangePassword = () => {
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
                            <p className={styles.title}>Change your Password</p>
                            <p className={styles.description}>Change your current password</p>
                        </div>
                        <form action="" className={styles.form}>
                            <div className={styles.passwordContainer}>
                                <label htmlFor="password">Current Passowrd</label>
                                <input type="password" id="password"  />
                            </div>
                            <div className={styles.passwordContainer}>
                                <label htmlFor="username">New Password</label>
                                <input type="text" id="username" />
                            </div>
                            <div className={styles.passwordContainer}>
                                <label htmlFor="password">Confirm New Password</label>
                                <input type="password" id="password" />
                            </div>
                            <button className={styles.createButton}>
                                Change Password
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

export default ChangePassword;
