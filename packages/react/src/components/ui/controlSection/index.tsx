import { SectionData } from '~/data/controlSections.data';
import FaceControl from '~/components/ui/controls/faceControl';
import HeadAngleControl from '~/components/ui/controls/headAngleControl';
import LedAnimationControl from '~/components/ui/controls/ledAnimationControl';
import PrimaryLedColorControl from '~/components/ui/controls/primaryLedColorControl';
import BuzzerAlarmControl from '~/components/ui/controls/buzzerAlarmControl';
import VideoActivationControl from '~/components/ui/controls/videoActivationControl';

function ControlComponent({ section }: { section: SectionData }) {
    switch (section.name) {
        case 'face':
            return <FaceControl />;
        case 'head':
            return <HeadAngleControl />;
        case 'ledAnimation':
            return <LedAnimationControl />;
        case 'lcdPrimary':
            return <PrimaryLedColorControl />;
        case 'buzzerAlarm':
            return <BuzzerAlarmControl />;
        case 'videoActivation':
            return <VideoActivationControl />;
        default:
            return null;
    }
}

export default ControlComponent;
