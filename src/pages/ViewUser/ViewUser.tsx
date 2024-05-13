import styles from "./viewUser.module.scss";
import Logo from "../../assets/Logo/logo.png";
import {useEffect, useState} from "react";
import {sendGET, sendPUT} from "../../utils/apiHelper.ts";
import {EDIT_USER, GET_BRANCHES} from "../../utils/apiRoute.ts";
import {useParams, useNavigate} from "react-router-dom";

const ViewUser = () => {
    const [user, setUser] = useState<any>({});
    const [locations, setLocations] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate()

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const params:any = [{ key: id, value: user._id }];
        sendPUT(EDIT_USER, params ,user).then(async (jasonData) => {
            if (jasonData.data._id !== undefined) {
                navigate("/users");
            }
        });
    };

    useEffect(() => {
        if (id !== undefined){
            const userData = JSON.parse(id);
            setUser(userData);
        }

        sendGET(GET_BRANCHES, [])
            .then((jsonData) => {
                setLocations(jsonData.data);
            });
    }, []);
    return (
        <div className={styles.wrapper}>
            <div className={styles.mainContainer}>
                <div className={styles.leftContainer}>
                    <div className={styles.companyDetails}>
                        <img src={Logo}/>
                        <p>Neil Bakery</p>
                    </div>
                    <div className={styles.formContainer}>
                        <div className={styles.textContainer}>
                            <p className={styles.title}>Hi ! Super Admin</p>
                            <p className={styles.description}>Edit an admin</p>
                        </div>
                        <form action='' className={styles.form}>
                            <div className={styles.nameContainer}>
                                <label htmlFor='name'>Email</label>
                                <input
                                    value={user.email}
                                    type='text'
                                    id='name'
                                    onChange={(event) => {
                                        setUser({...user, email: event.target.value});
                                    }}
                                />
                            </div>
                            {/* <div className={styles.locationContainer}>
                                <label htmlFor='location'>Location</label>
                                <select
                                    value={user.location}
                                    onChange={(event) => {
                                        setUser({...user, location: event.target.value});
                                    }}
                                >
                                    <option value={""}></option>
                                    {locations.map((location: { _id: string; name: string }) => {
                                        return (
                                            <option value={location._id}>{location.name}</option>
                                        );
                                    })}
                                </select>
                            </div> */}
                            <div className={styles.usernameContainer}>
                                <label htmlFor='username'>Username</label>
                                <input
                                    value={user.username}
                                    type='text'
                                    id='username'
                                    onChange={(event) => {
                                        setUser({...user, username: event.target.value});
                                    }}
                                />
                            </div>

                            <button onClick={handleSubmit} className={styles.createButton}>
                                Create
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

export default ViewUser;
