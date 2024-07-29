import { useMutation } from "@apollo/client";
import { ADD_STAMP } from "../../utils/mutations";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Auth from "../../utils/auth";

import { Alert } from "react-bootstrap";

const StampCard = () => {

    const [addNewStamp] = useMutation(ADD_STAMP);
    const { scannedId } =  useParams()



    useEffect(()=>{

       const main = async ()=> {
           const data = await addNewStamp({
            variables: { scannedId }
        }

        )

        function redirectUser() {
            return window.location = '/user'
        }

        setTimeout(redirectUser, 3000);

        if (!data) {
            return (
                <>
                 <Alert>Sorry! Something went wrong. Plese try</Alert>
                </>
            );
        }

    }   

        main()

    }, [])

    if (!Auth.loggedIn) {
        return (
            <h1>Please log in to continue</h1>
        )
    }
        return (
            <>
             <Alert>Stamp Added!</Alert>
            </>
        );


}

export default StampCard