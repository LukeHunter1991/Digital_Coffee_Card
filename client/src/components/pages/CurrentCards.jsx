import CoffeeCard from '../CoffeeCard';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../../utils/queries';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Auth from '../../utils/auth'

function CurrentCards() {
    const { loading, error, data} = useQuery(GET_ME);

    if (loading) {
        return(<h1>Loading...</h1>)
    }

    if (error) {
        return(<h1>{error}</h1>)
    }

    if (!Auth.loggedIn) {
        return (
            <h1>Please log in to continue</h1>
        )
    }

    let currentCardHeader = 'Here are your current cards!'

    if (data.me.currentCards.length === 0) {
        currentCardHeader = 'You dont have any cards yet...'
    } 
    return(
        <>
        <h1>{currentCardHeader}</h1>
        <Container fluid >
            <Row>
                <Col >
                {data.me.currentCards.map((card, index)=>(
                    <CoffeeCard key={index} businessId={card.businessId} businessName={card.businessName} stampsRequired={card.stampsRequired} visitCount={card.visitCount} disabled={true}/>
                ))
                }
                </Col>
            </Row>
        </Container>
        </>
    )

}

export default CurrentCards;
