export const patchUserVehicleState = async (
    vehicleStateId: number,
    patchData: any
): Promise<any> => {
    try {
        // @TODO : fix Url
        const response = await fetch(
            `http://10.0.2.2:8000/api/vehicle-states/${vehicleStateId}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    // @TODO : fix Authorization token
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJleHAiOjE3MjYyODA0NjJ9.n_XYVw6MCDvFwysy7JtvBWU7ShHYp_nX92vSzYMRCNQ`,
                },
                body: JSON.stringify(patchData),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message ||
                    "Erreur lors de la mise à jour de l'état du véhicule"
            );
        }

        return data;
    } catch (error) {
        console.error(
            'Erreur API:',
            error instanceof Error ? error.message : error
        );
        throw error;
    }
};
