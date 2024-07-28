import QRCode from "react-qr-code";
import { useQuery } from "@apollo/client";
import { BUSINESS_ME } from "../../utils/queries";


function QRCodePage () {
    
    const { loading, error, data} = useQuery(BUSINESS_ME);


    const url = "https://digital-coffee-card.onrender.com/user/stamp-card/"
    let QRLink = ""
    if (!loading) {
        QRLink = url + data.businessMe._id
    }


    if (loading) {
        return(<h1>Loading...</h1>)
    }

    if (error) {
        return(<h1>Sorry! Something went wrong...</h1>)
    }

    return(
        <>
        <h1>Stamp Card</h1>
        {<QRCode value={QRLink} />}
        </>
    )
}

export default QRCodePage