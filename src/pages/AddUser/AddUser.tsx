import styles from "./addUser.module.scss";
import Logo from "../../assets/Logo/logo.png";
import { useEffect, useState } from "react";
import { sendGET, sendPOST } from "../../utils/apiHelper.ts";
import { GET_BRANCHES, SAVE_USER } from "../../utils/apiRoute.ts";
import { useNavigate } from "react-router-dom";
import Select  from "react-select";
import {history} from "../../utils/common.ts";

interface Option {
  value: string;
  label: string;
}



const AddUser = () => {
    const [user, setUser] = useState({});
    // const [locations, setLocations] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
    const [options, setOptions] = useState<Option[]>([]);
    const navigate = useNavigate();
    const handleSubmit = (event: any) => {
        event.preventDefault();
        sendPOST(SAVE_USER, user).then(async (jasonData) => {
            if (jasonData.data._id !== undefined) {
                navigate("/users");
                history.messageApi.open({
                    type: "success",
                    content: "User added successfully",
                });
            }
        });
    };

    const handleOnChange = (selectedOptions:any) => {
      setSelectedOptions(selectedOptions);
      const locationsArray = selectedOptions.map((option:Option) => {
          return option.value
      })

        setUser({
            ...user,
            location: locationsArray,
        });
    }

    useEffect(() => {
        sendGET(GET_BRANCHES, []).then((jsonData) => {
            // setLocations(jsonData.data);
            const loationOptions:Option[] = [];
            jsonData.data.forEach((location: { _id: string; name: string }) => {
                loationOptions.push({
                    value: location._id,
                    label: location.name,
                });
            });
            setOptions([...loationOptions]);
        });
      
    }, []);

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
                                create an admin
                            </p>
                        </div>
                        <form action="" className={styles.form}>
                            <div className={styles.nameContainer}>
                                <label htmlFor="name">Email</label>
                                <input
                                    type="email"
                                    id="name"
                                    onChange={(event) => {
                                        setUser({
                                            ...user,
                                            email: event.target.value,
                                        });
                                    }}
                                />
                            </div>
                            <div className={styles.locationContainer}>
                                <label htmlFor="location">Location</label>
                                <Select
                                    options={options}
                                    value={selectedOptions}
                                    onChange={handleOnChange}
                                    isMulti
                                />
                            </div>
                            <div className={styles.usernameContainer}>
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    onChange={(event) => {
                                        setUser({
                                            ...user,
                                            username: event.target.value,
                                        });
                                    }}
                                />
                            </div>
                            <div className={styles.passwordContainer}>
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    onChange={(event) => {
                                        setUser({
                                            ...user,
                                            password: event.target.value,
                                        });
                                    }}
                                />
                            </div>
                            <button
                                onClick={handleSubmit}
                                className={styles.createButton}
                            >
                                Create
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

export default AddUser;
