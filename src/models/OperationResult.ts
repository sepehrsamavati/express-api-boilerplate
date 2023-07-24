export default class OperationResult {
	public ok = false;
	public message = "";

	public succeeded(message = "ok"){
		this.ok = true;
		this.message = message;
		return this;
	}

	public failed(message = "failed"){
		this.ok = false;
		this.message = message;
		return this;
	}
};
