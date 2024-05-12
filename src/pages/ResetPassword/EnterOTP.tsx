import styles from "./enterOTP.module.scss";
import Logo from "../../assets/Logo/logo.png";
import { Link } from "react-router-dom";

const EnterOTP = () => {
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
                            <p>OTP sent to your email. Check your email adress soon. </p>
                        </div>
                        <form action="" className={styles.form}>
                            <div className={styles.emailConatainer}>
                                <label htmlFor="number">Enter your OTP</label>
                                <input type="email" id="email" />
                            </div>
                            <Link to={"/reset-password"}>
                                <button className={styles.resetButton}>
                                    Reset
                                </button>
                            </Link>
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

export default EnterOTP;
