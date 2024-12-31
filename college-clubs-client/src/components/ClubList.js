const ClubDetails=({club})=>{
  return(
    <div className="club-card">
    <div className="club-image">
      <img src={club.imageUrl} alt={club.name} />
    </div>
    <div className="club-details">
      <h2>{club.name}</h2>
      <p>{club.description}</p>
      <div className="club-socials">
        <a href={`mailto:${club.email}`}><i className="fas fa-envelope"></i></a>
        <a href={club.facebook} target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
        <a href={club.instagram} target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
      </div>
    </div>
  </div>
  )
}

export default ClubDetails