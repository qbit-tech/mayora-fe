const priceFormat = (price?: string|number)=>{
	if(price === undefined){
		return '-';
	}
	var formatter = new Intl.NumberFormat('id-ID', {
		style: 'currency',
		currency: 'IDR',
		maximumFractionDigits: 0
	});
	return formatter.format(Number(price));
}
export {
	priceFormat
}