import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import Button from "../../components/button/button.component";

const SignIn = () => {
    //Remember: whenever you make a call to a database, this is going to be asynchronous
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }
    return (
        <div>
            <h1>Sign In page</h1>
            <Button onClick={logGoogleUser}>Sign in with Google Popup</Button>
            <SignUpForm />
        </div>
    )
}

export default SignIn;