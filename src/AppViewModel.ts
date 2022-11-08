import { useState } from 'react';
import { User } from 'firebase/auth';

export default function AppViewModel() {
    
    const [user, setUser] = useState<User | null>();

    return {
        user,
        setUser
    }
}