import Auth from '../../utils/auth';

function BusinessHomePage() {
   
    return(
    <>
        {Auth.loggedIn() ? (
        <h1>Welcome to your Business HomePage</h1>

        ): 
        <h1>Please log in to continue</h1>

    }
    </>
    )
}


export default BusinessHomePage