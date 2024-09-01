import { TitleProps } from '~/interfaces/components/common/title.interface';
import './style.css';

function Title({ label, balise = 'h1', hasBorderBottom = false }: TitleProps) {
    const TagName = balise as keyof JSX.IntrinsicElements;
    let titleClass = 'title';
    if (hasBorderBottom) {
        titleClass += ' gradient-border';
    }

    return <TagName className={titleClass}>{label}</TagName>;
}

export default Title;
