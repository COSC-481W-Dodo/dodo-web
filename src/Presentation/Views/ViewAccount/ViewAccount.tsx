import React, {useState} from "react";
import { auth } from "../../../Data/DataSource/firebase";
import {onAuthStateChanged} from "firebase/auth";

function ViewAccount() {
    const [user, setUser] = useState({});
    React.useEffect(() => {
        onAuthStateChanged(auth, (currentUser: any) => {setUser(currentUser);})  
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