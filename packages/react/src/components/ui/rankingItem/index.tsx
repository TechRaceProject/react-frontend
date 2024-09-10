import ProfileDefault from '~/assets/images/profile-default.svg';
import './style.css';
import { RankingProps } from '~/interfaces/other/ranking.interface';

function RankingItem({
    position,
    name,
    start_time,
    username,
    profilePicture,
    vehicle,
}: RankingProps) {
    return (
        <div className="ranking-item">
            <p>
                # {position} - {name}
            </p>
            <img
                src={profilePicture || ProfileDefault}
                alt={username}
                className="profile-picture"
            />
            <p>{username}</p>
            <p>{vehicle}</p>
            <p>{new Date(start_time).toLocaleDateString()}</p>
        </div>
    );
}

export default RankingItem;
