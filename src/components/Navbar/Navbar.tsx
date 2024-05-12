import React, { useState, useRef, useEffect } from 'react';
import styles from "./navbar.module.scss";
import ProfileIcon from "../../assets/Images/profile-pic.png";
import { CaretDownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { GET_TEMP_USER, LOGOUT_USER } from "../../utils/apiRoute.ts";
import { sendGET } from "../../utils/apiHelper.ts";

const Navbar: React.FC = () => {
    const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
    const [isRotated, setIsRotated] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [user, setUser] = useState<any>({});
    const navigate = useNavigate();

    useEffect(() => {
        sendGET(GET_TEMP_USER, [])
            .then((jsonData) => {
                if (jsonData.data === undefined){
                    setUser({
                        username:''
                    });
                }
                setUser(jsonData.data);
            });
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownVisible(false);
                setIsRotated(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
        setIsRotated(!isRotated);
    };

    const handleSignOut = () => {
        sendGET(LOGOUT_USER, []).then(() => {
                navigate('/signin')
            });
    };

    const handleChangePassword = () => {
        navigate('/change-password');
        setDropdownVisible(false); // Close dropdown after navigation
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.navContainer}>
                <div className={styles.profileContainer}>
                    <img src={ProfileIcon} alt="Profile"/>
                    <p className={styles.profileName}>{user.username}</p>
                    <p className={styles.profileRole}>{user.isSuperAdmin ? 'Super Admin' : 'Admin'}</p>
                    <CaretDownOutlined className={`${styles.downArrow} ${isRotated ? styles.rotated : ''}`}
                                       onClick={toggleDropdown}/>
                </div>
                {dropdownVisible && (
                    <div ref={dropdownRef} className={styles.dropdownContainer}>
                        <button className={styles.changePW} onClick={handleChangePassword}>Change Password</button>
                        <button className={styles.signoutButton} onClick={handleSignOut}>Sign Out</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
