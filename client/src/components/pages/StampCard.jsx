import { useMutation } from "@apollo/client";
import { ADD_STAMP } from "../../utils/mutations";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const StampCard = () => {

    const [addNewStamp] = useMutation(ADD_STAMP);
    const { scannedId } =  useParams()

    useEffect(()=>{

        console.log(scannedId);
       const main = async ()=> {
            await addNewStamp({
            variables: { scannedId }
        }

        )
        window.location = '/user/current-cards'
    }

        main()

    }, [])


    return (
        <h1>Stamp Added!</h1>
    )

}

export default StampCard