declare interface ISearchState<T = number> {
	title: string | null;
	year: (T extends number ? number : T) | null;
	page?: number;
}

declare interface ISearchProps {
	loading?: boolean;
	onSearch: (search: ISearchState) => void;
}
