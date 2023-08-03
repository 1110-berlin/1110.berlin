import React from "react";
import { AuthProvider } from "oidc-react";


const oidcConfig = {
    onSignIn: async (response) => {
        alert(
            "You logged in :" +
            response.profile.given_name +
            " " +
            response.profile.family_name
        );
        window.location.hash = "";
    },
    authority: "http://10.102.0.18:8080/",
    clientId: "225795549150838787@1110.berlin",
    responseType: "code",
    redirectUri: "http://localhost:8000/user/dashboard",
    scope: "openid profile email",
};

function User() {
    return (
        <AuthProvider {...oidcConfig}>
            <div className="App">
                <header className="App-header">
                    <p>Hello World</p>
                </header>
            </div>
        </AuthProvider>
    );
}

export default User;