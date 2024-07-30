import Auth from "../../utils/auth"
import { useQuery } from "@apollo/client"
import { GET_ME } from "../../utils/queries"
import { Container } from "react-bootstrap";
import { Card, CardHeader, CardBody, Col, Row} from 'react-bootstrap';

function UserHomePage() {

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

    return(
        <Container className="text-center">
            <h1 className="display-1">Hi {data.me.username}!</h1>
            <Container >
                <Row>
                    <Col lg={6} className="text-center">
                        <Card>
                            <CardHeader className="display-3">Current Cards</CardHeader>
                            <CardBody className="display-1">{data.me.currentCards.length}</CardBody>
                            <CardBody className="display-6">Keep stamping these cards!</CardBody>
                        </Card>
                    </Col>
                    <Col lg={6} className="text-center">
                        <Card>
                            <CardHeader className="display-3">Completed Cards</CardHeader>
                            <CardBody className="display-1">{data.me.completedCards.length}</CardBody>
                            <CardBody className="display-6">These cards are ready to redeem!</CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <section className="display-6 my-4">Scan the QR code presented at affiliated businesses whenever you make a purchase to stamp your cards.</section>
        </Container>

    )
}

export default UserHomePage