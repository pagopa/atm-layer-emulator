const checks = () => {
	const isInvalidField = (field:any) => (
		field === undefined ||
        field === null ||
        (typeof field === "string" && !field.trim()) ||
        (typeof field === "number" && field < 0)
	);

	// const isValidFiscalCode = (e: string) => {
	// 	const fiscalCodeRegex = /^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/;
	// 	return fiscalCodeRegex.test(e);
	// };

	const cfIsValid = (value: string) => {
		// eslint-disable-next-line functional/no-let, prefer-const
		let cfRegex =/^([A-Za-z]{6}[0-9lmnpqrstuvLMNPQRSTUV]{2}[abcdehlmprstABCDEHLMPRST]{1}[0-9lmnpqrstuvLMNPQRSTUV]{2}[A-Za-z]{1}[0-9lmnpqrstuvLMNPQRSTUV]{3}[A-Za-z]{1})$/;
		return cfRegex.test(value);
	};

	return{
		isInvalidField,
		// isValidFiscalCode
		cfIsValid
	};
};
export default checks;