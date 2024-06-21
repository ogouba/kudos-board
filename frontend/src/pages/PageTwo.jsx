import { useParams } from "react-router-dom";
// import KudosCard from "../kudoscard"

function boardpage() {
    const { id } = useParams();

    return (
        <>
            <header className="boardheader">
                <h1>Kudos board</h1>
            </header>
            <div className="body">
                {/* <KudoCard>

            </KudoCard> */}
                <button> delete</button>
                <button> upvote</button>
            </div>
            <footer className="footer">
                {" "}
                <p>&copy; kudosboard.com All rights reserved </p>{" "}
            </footer>
        </>
    );
}
export default boardpage;
