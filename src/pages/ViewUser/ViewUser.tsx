import styles from "./viewUser.module.scss";
import Logo from "../../assets/Logo/logo.png";
import {useEffect, useState} from "react";
import {sendGET, sendPUT} from "../../utils/apiHelper.ts";
import {EDIT_USER, GET_BRANCHES} from "../../utils/apiRoute.ts";
import {useParams, useNavigate} from "react-router-dom";
import Select from "react-select";

interface Option {
    value: string;
    label: string;
}
const ViewUser = () => {
    const [user, setUser] = useState<any>({});
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
    const [options, setOptions] = useState<Option[]>([]);
    const { id } = useParams();
    const navigate = useNavigate()

    const handleSubmit = (event: any) => {
        event.preventDefault();
        alert(JSON.stringify(user))
        const params:any = [{ key: id, value: user._id }];
        sendPUT(EDIT_USER, params ,user).then(async (jasonData) => {
            if (jasonData.data._id !== undefined) {
                navigate("/users");
            }
        });
    };

    const handleOnChange = (selectedOptions:any) => {
        console.log(selectedOptions)
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
        if (id !== undefined){
            const userData = JSON.parse(id);
            console.log(userData)
            const locationIds = userData.location.map((item:any)=>{
                return item._id
            })
            console.log(locationIds)
            const newUser = {
                email : userData.email,
                username: userData.username,
                _id: userData._id,
                location: locationIds,
            }
            setUser(newUser);

            const selectedLocationList:Option[] = []
            userData.location.forEach((location: { _id: string; name: string; })=>{
                const branch = {
                    value: location._id,
                    label: location.name,
                }
                selectedLocationList.push(branch)
            })
            setSelectedOptions(selectedLocationList);

        }

        sendGET(GET_BRANCHES, []).then((jsonData) => {
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
                            <div className={styles.locationContainer}>
                                <label htmlFor="location">Location</label>
                                <Select
                                    options={options}
                                    value={selectedOptions}
                                    onChange={handleOnChange}
                                    isMulti
                                    className={styles.select}
                                    styles={{
                                        control: (baseStyles, state) => ({
                                          ...baseStyles,
                                          borderColor: state.isFocused ? '#b28e00' : '#b28e00',
                                        }),
                                      }}
                                />
                            </div>
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
