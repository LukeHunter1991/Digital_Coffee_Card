import Auth from '../../utils/auth';
import { Card, CardHeader, CardText, Container } from 'react-bootstrap';


function BusinessHomePage() {
   
    return(
    <>
        {Auth.loggedIn() ? (
        <Container fluid className="my-4">
        <h1 className="display-1 my-4 mx-2">Welcome to your business home page!</h1>
        <Card className='my-4 mx-2'>
            <CardHeader className="display-4 my-4 mx-2">Click the Stamp Card link to generate a QR code</CardHeader>
            <CardText className='display-6 my-4 mx-2'> Make sure your QR code is accessible by customers. They will scan the code with their camera to stamp their card
                each time they make a purchase. We recomend either printing the code and placing it somewhere visible or use a phoen or tablet at point of sale.
            </CardText>
        </Card>
    </Container>
        ): 
        <h1>Please log in to continue</h1>

    }
    </>
    )
}


export default BusinessHomePage