import './kudoscard.css';
import { Link }from "react-router-dom";

function KudosCard({title, category, image, description, author, onDelete, id}) {
// const Kudoscard = ()
    return(
        <>
            <div className = "kudosCard">
                <img id="kudosCardImage" src ='https://www.pngmart.com/files/22/Carl-Jimmy-Neutron-PNG-File.png'></img>
                <h3 className= "kudosCardTitle">title: {title}</h3>
                <h3 className= "kudosCardCategory">category: {category}</h3>
                <h3 className= "kudosCardDescription">description:{description}</h3>            
                <h3 className= "kudosCardAuthor">author:{author}</h3>
                {/* <button className='KudosCardButtonView'< >View Board </button> */}
                <Link to={`/kudoCard/${id}`}> View Board</Link>
                <button className='KudosCardButtonCreate' onClick={onDelete} > Delete Board </button>
            </div>
        </>
    )
}

export default KudosCard
