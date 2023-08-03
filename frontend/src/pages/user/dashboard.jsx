import { useAuth } from 'oidc-react';
import React from 'react';

export default function Dashboard() {
    const auth = useAuth();

    return <p>Hello {auth.profile.name}!</p>;
};