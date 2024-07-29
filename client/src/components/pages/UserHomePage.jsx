import Auth from "../../utils/auth"
import { useQuery } from "@apollo/client"
import { GET_ME } from "../../utils/queries"
import { Container } from "react-bootstrap";
import { Card, CardHeader, CardBody} from 'react-bootstrap';

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
            <h1>Hi {data.me.username}!</h1>
            <Container>
                <Card>
                    <CardHeader>Current Cards</CardHeader>
                    <CardBody>{data.me.currentCards.length}</CardBody>
                    <CardBody>Keep stamping these cards to get a free coffee</CardBody>
                </Card>
                <Card>
                    <CardHeader>Completed Cards</CardHeader>
                    <CardBody>{data.me.completedCards.length}</CardBody>
                    <CardBody>These cards are ready to redeem!</CardBody>
                </Card>
            </Container>
            <section>Scan the QR code presented at affiliated businesses whenever you make a purchase to stamp your cards.</section>
        </Container>

    )
}

export default UserHomePage