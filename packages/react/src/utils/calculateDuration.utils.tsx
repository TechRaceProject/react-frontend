export const calculateDuration = (
    startTime: string,
    endTime: string | null
) => {
    if (!endTime) return 'En cours';
    const start = new Date(startTime);
    const end = new Date(endTime);
    const durationMs = end.getTime() - start.getTime();
    const durationHours = Math.floor(durationMs / (1000 * 60 * 60));
    const durationMinutes = Math.floor(
        (durationMs % (1000 * 60 * 60)) / (1000 * 60)
    );
    const durationSeconds = Math.floor((durationMs % (1000 * 60)) / 1000);
    return `${durationHours}h ${durationMinutes}m ${durationSeconds}s`;
};
