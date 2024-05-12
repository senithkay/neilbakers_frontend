import styles from "./changePassword.module.scss";
import Logo from "../../assets/Logo/logo.png";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {sendPOST} from "../../utils/apiHelper.ts";
import { CHANGE_PASSWORD} from "../../utils/apiRoute.ts";

const ChangePassword = () => {
    const [credentials, setCredentials] = useState<any>({});
    const navigate = useNavigate();
    const handleChangePassword = (event:any)=>{
        event.preventDefault();
        if (credentials.newPassword !== credentials.confirmPassword) {
            alert("New password and current password does not match")
        }
        else{
            sendPOST(CHANGE_PASSWORD, credentials)
                .then((result)=>{
                    if (result.data._id){
                        alert("Password reset successful")
                        navigate('/')
                    }
                })
        }
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
                            <p className={styles.title}>Change your Password</p>
                            <p className={styles.description}>Change your current password</p>
                        </div>
                        <form action="" className={styles.form}>
                            <div className={styles.passwordContainer}>
                                <label htmlFor="password">Current Passowrd</label>
                                <input type="password" id="password"  onChange={(event) => {
                                    setCredentials({...credentials, oldPassword: event.target.value});
                                }}/>
                            </div>
                            <div className={styles.passwordContainer}>
                                <label htmlFor="username">New Password</label>
                                <input type="text" id="username" onChange={(event) => {
                                    setCredentials({...credentials, newPassword: event.target.value});
                                }}/>
                            </div>
                            <div className={styles.passwordContainer}>
                                <label htmlFor="password">Confirm New Password</label>
                                <input type="password" id="password" onChange={(event) => {
                                    setCredentials({...credentials, confirmPassword: event.target.value});
                                }}/>
                            </div>
                            <button className={styles.createButton} onClick={handleChangePassword}>
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
