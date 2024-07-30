import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { CardHeader, CardText, } from 'react-bootstrap';

function HomePage() {
    return(
        <Container fluid className="my-4">
            <h1 className="display-1 my-4 mx-2">Welcome to my Digital Coffee Card!</h1>
            <Card className='my-4 mx-2'>
                <CardHeader className="display-3 my-4 mx-2">Please sign up or log in to use this application</CardHeader>
                <CardText className='display-6 my-4 mx-2'>As a customer you can sign up to receive a digital coffee card. You stamp the card by scanning a QR code each time you make a purchase 
                    at an affiliated business. Just like any other coffee card, once your card is fully stamped you are entitled to a free coffee.
                </CardText>
                <CardText className='display-6 my-4 mx-2'>As a business you can sign up to become an affiliate. We will create a QR code that your customers can scan to create/stamp their digital coffee card
                    for your business. 
                </CardText>
            </Card>
        </Container>


    )
}

export default HomePage