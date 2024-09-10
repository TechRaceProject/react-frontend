import ProfileDefault from '~/assets/images/profile-default.svg';
import './style.css';
import { RankingProps } from '~/interfaces/other/ranking.interface';

function PodiumItem({
    position,
    name,
    start_time,
    username,
    profilePicture,
    vehicle,
}: RankingProps) {
    const getBorderColor = () => {
        switch (position) {
            case 1:
                return 'gold';
            case 2:
                return 'silver';
            case 3:
                return '#cd7f32';
            default:
                return 'var(--color-blue-light-50)';
        }
    };

    return (
        <div
            className={`podium-position position-${position}`}
            style={{ borderColor: getBorderColor() }}
        >
            <h3 style={{ color: getBorderColor() }}>
                # {position} - {name}
            </h3>
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

export default PodiumItem;
