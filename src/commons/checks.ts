const checks = () => {
	const isInvalidField = (field:any) => (
		field === undefined ||
        field === null ||
        (typeof field === "string" && !field.trim()) ||
        (typeof field === "number" && field < 0)
	);

	return{isInvalidField};
};
export default checks;