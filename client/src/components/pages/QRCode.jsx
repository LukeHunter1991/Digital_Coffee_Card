import QRCode from "react-qr-code";



function QRCodePage () {

    console.log(window.location.pathname)
    return(
        <>
        <h1>Stamp Card</h1>
        {<QRCode value="www.test.com.au" />}
        </>
    )
}

export default QRCodePage