let transactionCounter = 0;

export function generateTransactionID() {
	const today = new Date();
	const yy = today.getFullYear().toString().slice(-2);
	const mm = String(today.getMonth() + 1).padStart(2, '0');
	const dd = String(today.getDate()).padStart(2, '0');
	const uniqueNumber = String(transactionCounter).padStart(2, '0');

	transactionCounter++;

	return `TXN${yy}${mm}${dd}${uniqueNumber}`;
}
