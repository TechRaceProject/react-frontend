import Button from '~/components/common/button';
import { SectionData } from '~/data/controlSections.data';
import './style.css';
interface ButtonGroupProps {
    sections: SectionData[];
    onSectionClick: (sectionName: string) => void;
}

function ButtonGroup({ sections, onSectionClick }: ButtonGroupProps) {
    return (
        <div className="group-buttons">
            {sections.map((section) => (
                <Button
                    key={section.name}
                    onClick={() => onSectionClick(section.name)}
                    text={section.label}
                    outline={true}
                />
            ))}
        </div>
    );
}

export default ButtonGroup;
