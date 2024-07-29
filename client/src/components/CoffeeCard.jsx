import { useMutation } from '@apollo/client';
import { REDEEM_CARD } from '../utils/mutations';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Alert } from 'react-bootstrap';

import { useState } from 'react';
import './CoffeeCard.css';

export default function CoffeeCard(props) {

    const [isShaking, setShaking] = useState(false);

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

            // Trigger animation by setting the state
            setShaking(true);

        // Remove card and reset animation after a delay
        setTimeout(()=>{redeemCardAnimate(businessId)}, 1000);
        };  
        
        async function redeemCardAnimate(businessId) {
            try {
            
                await redeem({
                    variables: {businessId},
                  });
    
                setShaking(false);
            } catch (err) {
                console.log(err);
             <Alert>Sorry! Something went wrong, please try again.</Alert>
            }
            
        }


    
    return (
    <Card   className={isShaking ? 'shake' : ''}>
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