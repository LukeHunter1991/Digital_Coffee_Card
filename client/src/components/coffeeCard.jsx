import { useMutation } from '@apollo/client';
import { REDEEM_CARD } from '../utils/mutations';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function CoffeeCard(props) {

    let visits = []
    let stampsNeeded = []
    let stamped = 0

    for (let i = 0; i < props.stampsRequired; i++) {
        if (stamped < props.visitCount) {
            visits.push('✅')
            stamped++
        } else {
            stampsNeeded.push('❌')
        }

    }

    const [redeem] = useMutation(REDEEM_CARD);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const businessId = event.target.id;
        
        try {
            await redeem({
                variables: {businessId},
              });

              location.reload()

        } catch (err) {
            console.log(err);
        }

    }
    
    return (
    <Card>
        <Card.Body>
            <Card.Title>{props.businessName}</Card.Title>
            <Container>
                <Row>
                    { visits.map((stamp, index) => {
                        return(
                        <Col key={index}>{stamp}</Col>
                        )
                    })
                    }
                    { stampsNeeded.map((stamp, index) => {
                        return(
                        <Col key={index}>{stamp}</Col>
                        )
                    })
                    }
                </Row>
            </Container>
            <Button disabled={props.disabled}
                      type='click'
                      id={props.businessId}
                      onClick={handleFormSubmit}
                      variant='success'
                      >Redeem</Button>
            </Card.Body>
        </Card>
    )
}