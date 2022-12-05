import React, {useState} from "react";
import { auth } from "../../../Data/DataSource/firebase";
import {onAuthStateChanged} from "firebase/auth";
import { useNavigate } from 'react-router-dom';

function ViewAccount() {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    React.useEffect(() => {
        // when auth changes, set the current user
        // if not logged in, redirect to login page
        onAuthStateChanged(auth, (currentUser: any) => {currentUser ? setUser(currentUser) : navigate("/login");})
      },[]);

      return (
        <div>
            <h1>View Account Page</h1>
            <div>
                <ul>
                    <li><b>Current Username:</b> {auth.currentUser?.displayName}</li>
                    <li><b>Current Email:</b> {auth.currentUser?.email}</li>
                    </ul>
            </div>

        </div>
    );
}

export default ViewAccount;