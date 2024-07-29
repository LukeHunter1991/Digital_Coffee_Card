import CoffeeCard from '../CoffeeCard';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../../utils/queries';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Auth from '../../utils/auth';

function CompletedCards() {
    const { loading, error, data} = useQuery(GET_ME);

    if (loading) {
        return(<h1>Loading...</h1>)
    }

    if (error) {
        return(<h1>Sorry! Something went wrong...</h1>)
    }

    if (!Auth.loggedIn) {
        return (
            <h1>Please log in to continue</h1>
        )
    }

    let completedCardHeader = 'These cards are ready to redeem!'

    if (data.me.currentCards.length === 0) {
        completedCardHeader = 'You dont have any cards that are ready to redeem yet...'
    } 

    return(
        <>
        <h1>{completedCardHeader}</h1>
        <Container fluid>
            <Row>
                <Col>
                {data.me.completedCards.map((card, index)=>(
                    <CoffeeCard key={index} businessId={card.businessId} businessName={card.businessName} stampsRequired={card.stampsRequired} visitCount={card.visitCount} disabled={false}/>
                ))
                }
                </Col>
            </Row>
        </Container>
        </>
    )

}

export default CompletedCards;