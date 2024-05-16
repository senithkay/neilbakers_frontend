import styles from "./signInForm.module.scss";
import Logo from "../../assets/Logo/logo.png";
import {useState} from "react";
import {AUTH_USER} from "../../utils/apiRoute.ts";
import {sendPOST} from "../../utils/apiHelper.ts";
import {message} from "antd";
import { useNavigate } from "react-router-dom";


const SignInForm = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [credentials, setCredentials] = useState<any>({});
    const navigate = useNavigate();
    const handleSignin = (event:any)=>{
        event.preventDefault();
        if (credentials.email === undefined || credentials.email === ''){
            messageApi.open({
                type: "error",
                content: "Please enter your email",
            });
            return;
        }
        if (credentials.password === undefined || credentials.password === ''){
            messageApi.open({
                type: "error",
                content: "Please enter a your password",
            });
            return;
        }
        sendPOST(AUTH_USER, credentials)
        .then((result)=>{
            if (result.status === 0){
                messageApi.open({
                    type: "error",
                    content: result.description,
                });
            }
            else{
                navigate('/')
            }
        })
    }

    return (
            <div className={styles.formContainer}>
                {contextHolder}
                <div className={styles.companyDetails}>
                    <img src={Logo}/>
                    <p>Neil Bakery</p>
                </div>
                <div className={styles.textContainer}>
                    <p className={styles.title}>Sign In</p>
                    <p className={styles.description}>Sign in to stay connected.</p>
                </div>
                <form action="" className={styles.form}>
                    <div className={styles.emailConatainer}>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={(event) => {
                            setCredentials({...credentials, email: event.target.value});
                        }}/>
                    </div>
                    <div className={styles.passwordContainer}>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={(event) => {
                            setCredentials({...credentials, password: event.target.value});
                        }}/>
                    </div>
                    <div className={styles.forgotContainer}>
                        <div className={styles.rememberContainer}>
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember">Remember me ?</label>
                        </div>
                        <a href="/forgot-password">
                            <p>Forgot Password?</p>
                        </a>
                    </div>
                    <button className={styles.siginButton} onClick={handleSignin}>
                        Sign In
                    </button>
                </form>
            </div>

    );
};

// const mapStateToProps = (state: any) => {
// };
//
// const dispatchToProps = (dispatch: any) => ({
//     setUser: () => dispatch({
//         type: ACTION_TYPES.USER_AUTHORIZED,
//         payload: {description: 'Saved all changes', extra: {user: 'me'}}
//     }),
// })
//
// export default connect(mapStateToProps, dispatchToProps)(SignInForm);
//

export default SignInForm;