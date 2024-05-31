/* eslint-disable functional/no-let */
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
		
		if (value.length !== 16) {return false;}

		const isLetter = (char: string) => /^[A-Z]$/i.test(char);
		for (let i = 0; i < 6; i++) {
			if (!isLetter(value[i])) {return false;}
		}
	
		const isDigit = (char: string) => /^[0-9]$/.test(char);
		for (let i = 6; i < 8; i++) {
			if (!isDigit(value[i])) {return false;}
		}
	
		const validMonthChars = "ABCDEHLMPRST";
		if (!validMonthChars.includes(value[8].toUpperCase())) {return false;}
	
		for (let i = 9; i < 11; i++) {
			if (!isDigit(value[i])) {return false;}
		}
	
		if (!isLetter(value[11])) {return false;}
	
		for (let i = 12; i < 15; i++) {
			if (!isDigit(value[i])) {return false;}
		}
	
		if (!isLetter(value[15])) {return false;}
	
		return true;
	};

	const ibanIsValid = (value: string) => {
		const ibanRegex = /^IT[A-Z0-9]{25}$/;
		return ibanRegex.test(value);
	};

	const panIsValid = (value: string) => {
		const panRegex = /^[0-9]{16,19}$/;
		return panRegex.test(value);
	};

	const isValidInputValue = (value:string, pattern:string) => {
		const regex = new RegExp(pattern);
		return (regex.test(value));
	};

	return{
		isInvalidField,
		// isValidFiscalCode
		cfIsValid,
		ibanIsValid,
		panIsValid,
		isValidInputValue
	};
};
export default checks;