import './style.css';
import VideoFeed from '~/assets/images/placeholders/video_feed.png';


export default function Home() {
    return (
        <div className="dashboard">


            <div className="top-section">
                <div className="video-feed" >
                        <img 
                        src={VideoFeed}
                        alt="video feed placeholder"
                        />
                </div>
                <div className="movement-history">
                    <div className="history-header">
                        Historique des mouvements
                    </div>
                    <div className="progress-bar">Distance parcourue</div>
                </div>
            </div>


            <div className="info-cards">
                <div className="card">Autonomie du véhicule</div>
                <div className="card">
                    Temps passé en moyenne sur une course
                </div>
                <div className="card">
                    Temps total effectué sur toutes les courses
                </div>
                <div className="card">Nombre de collisions effectuées</div>
            </div>



            <div className="charts-section">
                <div className="chart">Suivie de la ligne</div>
                <div className="chart">Vitesse maximale et moyenne</div>
                <div className="vehicle-image">Image du véhicule</div>
            </div>


        </div>
    );
}
