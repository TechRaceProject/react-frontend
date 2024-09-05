export interface SectionData {
    name: string;
    label: string;
}

export const controlSectionsData: SectionData[] = [
    { name: 'face', label: 'Visage' },
    { name: 'head', label: 'Angle de la Tête' },
    { name: 'ledAnimation', label: 'Animation des LED' },
    { name: 'lcdPrimary', label: 'Couleur Principale des LED' },
    { name: 'buzzerAlarm', label: 'Buzzer' },
    { name: 'videoActivation', label: 'Flux vidéo' },
];
