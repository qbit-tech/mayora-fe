const SELECT_SEARCH_PROPS = {
	showSearch: true,
	optionFilterProp: "children",
	filterOption: (input: string, option: any) =>{
		if(option.label){
			return option.label.toLowerCase().includes(input.toLowerCase()) || option?.value?.toLowerCase().includes(input.toLowerCase())
		}else if(option.children){
	      return String(option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
		}
	}
}
export default SELECT_SEARCH_PROPS;