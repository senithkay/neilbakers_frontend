import styles from "./addLocation.module.scss";
import Logo from "../../assets/Logo/logo.png";
import {useState} from "react";
import {sendPOST} from "../../utils/apiHelper.ts";
import {SAVE_LOCATION} from "../../utils/apiRoute.ts";
import {useNavigate} from "react-router-dom";
import {history} from "../../utils/common.ts";
// import {useState} from "react";

const AddLocation = () => {
    const [location, setLocation] = useState('');
    const navigate = useNavigate();
    const handleLocationChange = (event:any) => {
        setLocation(event.target.value);
    }
    const handleSubmit = (event:any)=>{
        event.preventDefault()
        if(location === ""){
            alert('Please Enter a location name')
        }
        else{
            sendPOST(SAVE_LOCATION, {name: location})
                .then((result:any)=>{
                    if (result.data._id !== undefined) {
                        navigate("/products");
                        history.messageApi.open({
                            type: "success",
                            content: "Location added successfully",
                        });
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
                            <p className={styles.title}>Hi ! Super Admin</p>
                            <p className={styles.description}>
                                create an Location
                            </p>
                        </div>
                        <form action="" className={styles.form}>
                            <div className={styles.nameContainer}>
                                <label htmlFor="name"> Location Name</label>
                                <input type="text" id="name" required={true} onChange={handleLocationChange}/>
                            </div>
                            <button className={styles.createButton} onClick={handleSubmit}>
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
