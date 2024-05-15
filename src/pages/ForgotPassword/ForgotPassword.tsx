import styles from "./forgotPassword.module.scss";
import Logo from "../../assets/Logo/logo.png";
import {sendGET} from "../../utils/apiHelper.ts";
import {SEND_EMAIL} from "../../utils/apiRoute.ts";
import {useState} from "react";
import {message} from "antd";
import {useNavigate} from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate()
    const handleSend = (event:any) => {
        event.preventDefault()
        const params = [{key: "email", value: email}];
        sendGET(SEND_EMAIL, params).then((jsonData) => {
            console.log(jsonData)
        });

        messageApi.open({
            type: "success",
            content: 'If you are an admin, you will receive and email containing instructions on how to reset your password.',
        }).then(()=>{
            navigate('/signin')
        });
    }
    return (
        <div className={styles.wrapper}>
            {contextHolder}
            <div className={styles.mainContainer}>
                <div className={styles.leftContainer}>
                    <div className={styles.companyDetails}>
                        <img src={Logo} />
                        <p>Neil Bakery</p>
                    </div>
                    <div className={styles.formContainer}>
                        <div className={styles.textContainer}>
                            <p className={styles.title}>Reset Password</p>
                            <p className={styles.description}>
                                Enter your email address and we’ll send you an
                                email with instructions to reset your password
                            </p>
                        </div>
                        <form  className={styles.form}>
                            <div className={styles.emailConatainer}>
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" onChange={(event) => {
                                    setEmail(event.target.value);
                                }}/>
                            </div>
                            <button className={styles.resetButton} onClick={handleSend}>
                                Send recovery link
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

export default ForgotPassword;
