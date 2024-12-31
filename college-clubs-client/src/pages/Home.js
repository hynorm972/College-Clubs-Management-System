import {useEffect, useState} from 'react'
import ClubList from '../components/ClubList'
import AddClub from '../components/AddClub'

const Home = () => {
    const[clubs,setclubs]=useState(null)

    useEffect(()=>{
        const fetchClubs = async ()=>{
            const response = await fetch('/api/clubs')
            const json = await response.json()
            if(response.ok){
                setclubs(json)
            }
        }
        fetchClubs()
    },[])

    return(
        <div className="home">
            <div className="clubs">
                {clubs && clubs.map((club)=>(
                    <ClubList key={club._id} club={club}/>
                ))}
            </div>
            <AddClub/>
        </div>
    )
}
export default Home