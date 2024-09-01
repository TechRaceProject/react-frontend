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
                    <div className="control-pannel-and-covered-distance">
                        <div className="control-pannel">
                            <span>Historique des mouvements</span>
                        </div>

                        <div className="covered-distance">
                            <InfoCard
                                icon="distance"
                                title="Distance parcourue"
                                value="4520 mètres"
                                style={{ border: 'none', boxShadow: 'none' }}
                            />
                        </div>
                    </div>
                </div>

                <div className="info-cards">
                    <InfoCard
                        icon="battery"
                        title="Autonomie du véhicule"
                        value="85%"
                    />
                    <InfoCard
                        icon="time"
                        title="Durée moyenne de vos courses"
                        value="1m32"
                    />
                    <InfoCard
                        icon="time"
                        title="Durée cumulée de vos courses"
                        value="5m41"
                    />
                    <InfoCard
                        icon="warning"
                        title="Temps passé en collision"
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
