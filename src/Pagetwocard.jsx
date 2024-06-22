import { useState } from "react";

function PagetwoCard({title, id, image, author,likes, handleUpvoteKudoCard,handleDeleteKudoCard }) {
    return (
        <>
            <div className="card border-success mb-3" style={{maxWidth: "18rem"}}>
                <div className="card-header bg-transparent border-success">
                    Header
                </div>
                <div className="card-body text-success">
                    <h5 className="card-title">Success card title</h5>
                    <img src = {image}/>
                    <div> {title}</div>
                    <div> {author}</div>
                </div>
                <div className="card-footer bg-transparent border-success">
                    Footer
                    <button onClick={(event) => {handleDeleteKudoCard(id)}}> delete </button>
                    <div> 
                        <button onClick={(event) => {handleUpvoteKudoCard(id)}}> Upvote </button>{likes}
                    </div>
                </div>
            </div>
        </>
    );
}
export default PagetwoCard;
