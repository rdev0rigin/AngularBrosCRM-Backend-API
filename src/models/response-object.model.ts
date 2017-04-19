export interface ResponseObject {
	status: string;
	message: string;
	body: {
		[key: string]: {} | string;
	};
}

export interface QueryResponse {

}