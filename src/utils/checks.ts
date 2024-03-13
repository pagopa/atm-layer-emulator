const checks = () => {
	const isInvalidField = (field:any) => (
		field === undefined ||
        field === null ||
        (typeof field === "string" && !field.trim()) ||
        (typeof field === "number" && field < 0)
	);

	const isValidFiscalCode = (e: string) => {
		const fiscalCodeRegex = /^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/;
		return fiscalCodeRegex.test(e);
	};

	return{
		isInvalidField,
		isValidFiscalCode
	};
};
export default checks;