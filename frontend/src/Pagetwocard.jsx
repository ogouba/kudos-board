import propTypes from "prop-types";

function PagetwoCard(props) {
    return (
        <>
            <div className="card border-success mb-3" style={{maxWidth: "18rem"}}>
                <div className="card-header bg-transparent border-success">
                    Header
                </div>
                <div className="card-body text-success">
                    <h5 className="card-title">Success card title</h5>
                    <img src="https://picsum.photos/200/300" />
                    <p className="card-text">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                    </p>
                    <div> {props.title}</div>
                    <div> {props.author}</div>
                </div>
                <div className="card-footer bg-transparent border-success">
                    Footer
                    <button> delete </button>
                    <button> upvote</button>
                </div>
            </div>
        </>
    );
}
export default PagetwoCard;
