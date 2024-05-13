import styles from "./resetPassword.module.scss";
import Logo from "../../assets/Logo/logo.png";
import {useState} from "react";
import {sendPOST} from "../../utils/apiHelper.ts";
import {AUTH_RESET_PASSWORD} from "../../utils/apiRoute.ts";
import {useNavigate} from "react-router-dom";

const ResetPassword = () => {
    const [credentials, setCredentials] = useState({});

    const navigate = useNavigate()
    const handleSignin = (event:any)=>{
        event.preventDefault();
        sendPOST(AUTH_RESET_PASSWORD, credentials)
            .then((result)=>{
                if (result.data._id){
                    alert('Password reset successful')
                    navigate('/signin')
                }
            })
    }
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
                            <p className={styles.title}>Enter New Password</p>
                            <p className={styles.description}>
                                Enter your new password and confirm it to reset your password
                            </p>
                        </div>
                        <form action="" className={styles.form}>
                            <div className={styles.emailConatainer}>
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" onChange={(event) => {
                                    setCredentials({...credentials, email: event.target.value});
                                }}/>
                            </div>
                            <div className={styles.passwordContainer}>
                                <label htmlFor="password">New Password</label>
                                <input type="password" id="password" onChange={(event) => {
                                    setCredentials({...credentials, password: event.target.value});
                                }}/>
                            </div>
                            <button className={styles.siginButton} onClick={handleSignin}>
                                Reset Password
                            </button>
                        </form>
                    </div>
                </div>
                <div className={styles.rightContainer}>
                    <img src={Logo}/>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
