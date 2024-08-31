import './style.css';
import VideoFeed from '~/assets/images/placeholders/video_feed.png';
import InfoCard from '~/components/common/info_card';

export default function Home() {
    return (
        <div className="dashboard-container">
            <div className="dashboard">
                <div className="top-section">
                    <div className="video-feed">
                        <img src={VideoFeed} alt="video feed placeholder" />
                    </div>
                    <div className="movement-history">
                        <div className="history-header">
                            <span>Historique des mouvements</span>
                        </div>
                        <div className="progress-bar">
                            <span>Distance parcourue</span>
                        </div>
                    </div>
                </div>

                <div className="info-cards">
                    <InfoCard
                        icon="document"
                        title="Autonomie du véhicule"
                        value="85%"
                    />
                    <InfoCard
                        icon="social"
                        title="Temps passé en moyenne sur une course"
                        value="1m32"
                    />
                    <InfoCard
                        icon="star"
                        title="Temps total effectué sur toutes les courses"
                        value="5m41"
                    />
                    <InfoCard
                        icon="warning"
                        title="Nombre de collisions effectuées"
                        value={14}
                    />
                </div>

                <div className="charts-section">
                    <div className="chart">
                        <span>Suivie de la ligne</span>
                    </div>
                    <div className="chart">
                        <span>Vitesse maximale et moyenne</span>
                    </div>
                    <div className="vehicle-image">
                        <span>Image du véhicule</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
