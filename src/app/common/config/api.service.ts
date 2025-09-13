import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { DataService } from "../services/data/data.service";
// import { ApiEndpoint } from "./api.endpoints";

@Injectable({
	providedIn: "root",
})
export class ApiService {
	constructor(
		public data: DataService,
	) { }


	getInfo(url: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.getData(url, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(() => { new Error(err) });
				})
			);
	}


	//Delete Info

	deleteInfo(url: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.deleteData(url, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(() => { new Error(err) });
				})
			);
	}

	authenticateuser(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData('login', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}

	clearAllSession(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData('clear/user/allsessions/byrequest', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}

	checkandinit(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data.postData('checkandinitialize/defaults', body, options).pipe(
			finalize(() => this.data.serviceCompleted()),
			catchError((err) => {
				options.hideErrorMethod ? "" : this.data.errorMethod(err);
				return throwError(err);
			})
		);
	}

	authorizeLogin(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData('authorizelogin', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}


	uniqueids(val: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data.getData("api/uniqueid" + val, options).pipe(
			finalize(() => this.data.serviceCompleted()),
			catchError((err) => {
				options.hideErrorMethod ? "" : this.data.errorMethod(err);
				return throwError(err);
			})
		);
	}

	salespersonwiselist(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data.postData('dashboard/salespersonwiseentrysummary', body, options).pipe(

			finalize(() => this.data.serviceCompleted()),
			catchError((err) => {
				options.hideErrorMethod ? "" : this.data.errorMethod(err);
				return throwError(err);
			})
		);
	}

	dashboardsummary(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data.postData('dashboard/sfa/summary', body, options).pipe(

			finalize(() => this.data.serviceCompleted()),
			catchError((err) => {
				options.hideErrorMethod ? "" : this.data.errorMethod(err);
				return throwError(err);
			})
		);
	}

	recentorderlists(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data.postData('reports/order/amountwise', body, options).pipe(

			finalize(() => this.data.serviceCompleted()),
			catchError((err) => {
				options.hideErrorMethod ? "" : this.data.errorMethod(err);
				return throwError(err);
			})
		);
	}

	tasklists(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data.postData('task', body, options).pipe(

			finalize(() => this.data.serviceCompleted()),
			catchError((err) => {
				options.hideErrorMethod ? "" : this.data.errorMethod(err);
				return throwError(err);
			})
		);
	}

	addexpenses(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data.postData('personexpense/update', body, options).pipe(

			finalize(() => this.data.serviceCompleted()),
			catchError((err) => {
				options.hideErrorMethod ? "" : this.data.errorMethod(err);
				return throwError(err);
			})
		);
	}

	responseslists(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data.postData('task/response', body, options).pipe(

			finalize(() => this.data.serviceCompleted()),
			catchError((err) => {
				options.hideErrorMethod ? "" : this.data.errorMethod(err);
				return throwError(err);
			})
		);
	}

	tasksummaryslists(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data.postData('tasksummary', body, options).pipe(

			finalize(() => this.data.serviceCompleted()),
			catchError((err) => {
				options.hideErrorMethod ? "" : this.data.errorMethod(err);
				return throwError(err);
			})
		);
	}



	contactslist(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data.postData('contacts', body, options).pipe(

			finalize(() => this.data.serviceCompleted()),
			catchError((err) => {
				options.hideErrorMethod ? "" : this.data.errorMethod(err);
				return throwError(err);
			})
		);
	}

	saleslists(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data.postData('reports/sales/billwise', body, options).pipe(

			finalize(() => this.data.serviceCompleted()),
			catchError((err) => {
				options.hideErrorMethod ? "" : this.data.errorMethod(err);
				return throwError(err);
			})
		);
	}

	getCustomers(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData('customers', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}

	getCustomersWithoutSpin(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData1('customers', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}


	collecetionlist(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData('receipts', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}

	expenseslist(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData('reports/personexpenses', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}

	removeexpensesentrys(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData('personexpense/remove', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}

	orderamountwise(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData('reports/order/amountwise', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}

	getSalesList(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data.postData('reports/sales/billwise', body, options).pipe(
			finalize(() => this.data.serviceCompleted()),
			catchError((err) => {
				options.hideErrorMethod ? "" : this.data.errorMethod(err);
				return throwError(err);
			})
		);
	}

	receivablesbillwise(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data.postData('reports/receivables/billwise', body, options).pipe(
			finalize(() => this.data.serviceCompleted()),
			catchError((err) => {
				options.hideErrorMethod ? "" : this.data.errorMethod(err);
				return throwError(err);
			})
		);
	}

	receivalesonlys(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data.postData('reports/receivables', body, options).pipe(
			finalize(() => this.data.serviceCompleted()),
			catchError((err) => {
				options.hideErrorMethod ? "" : this.data.errorMethod(err);
				return throwError(err);
			})
		);
	}


	salesDet(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data.postData('sales/detail', body, options).pipe(
			finalize(() => this.data.serviceCompleted()),
			catchError((err) => {
				options.hideErrorMethod ? "" : this.data.errorMethod(err);
				return throwError(err);
			})
		);
	}

	receiptbillwise(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data.postData('reports/receipts/amountwise', body, options).pipe(
			finalize(() => this.data.serviceCompleted()),
			catchError((err) => {
				options.hideErrorMethod ? "" : this.data.errorMethod(err);
				return throwError(err);
			})
		);
	}

	receiptbillwiseupdates(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data.postData('receipts', body, options).pipe(
			finalize(() => this.data.serviceCompleted()),
			catchError((err) => {
				options.hideErrorMethod ? "" : this.data.errorMethod(err);
				return throwError(err);
			})
		);
	}


	involvedvouchers(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data.postData('entry/involved/vouchersdetail', body, options).pipe(
			finalize(() => this.data.serviceCompleted()),
			catchError((err) => {
				options.hideErrorMethod ? "" : this.data.errorMethod(err);
				return throwError(err);
			})
		);
	}


	receiptadjustments(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data.postData('voucher/adjusted/billsdetail', body, options).pipe(
			finalize(() => this.data.serviceCompleted()),
			catchError((err) => {
				options.hideErrorMethod ? "" : this.data.errorMethod(err);
				return throwError(err);
			})
		);
	}

	//search items
	searchItems(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data.postData('items', body, options).pipe(
			finalize(() => this.data.serviceCompleted()),
			catchError((err) => {
				options.hideErrorMethod ? "" : this.data.errorMethod(err);
				return throwError(err);
			})
		);
	}

	orderitemsadd(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData('order/items/add', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}

	ordercalculate(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData('order/calculate/itemvalues', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}

	orderDetail(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData('order/detail', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}


	salesDetail(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData('sales/detail', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}


	orderitemstore(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData('order/itemrestore', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}

	orderitemremove(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData('order/item/remove', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}

	custQuickSummary(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData('dashboard/customer/quicksummary', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}

	getCustomerOrderSalesRec(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData('dashboard/customer/orders_sales_receipts', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}

	getItemSummary(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData('reports/sales/itemqtyvalue/summary', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}

	getItemSummaryDetail(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData('reports/sales/itemqtyvalue/withentryinfo', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}

	getCategoriesList(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData('categories', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}

	orderConfirm(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData('order/confirm', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}

	sendopttocuts(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData('send/loginotp', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}

	getCustomerReceivables(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData('customer/receivables', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}

	orderdiscountchrg(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData('order/discountandcharges', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}

	orderotheritems(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData('update/order/otherdetails', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}

	getAccounts(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData('accounts', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}


	expansesgraph(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData('dashboard/personcollections', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}

	expesesentrygraphs(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData('dashboard/personexpenses', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}

	ordersentrygraphs(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData('dashboard/personorders', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}

	salesentrygraphs(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData('dashboard/personsales', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}

	putCustomer(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.putData('customer', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}

	postCustomer(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData('customer', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}

	getCustImg(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData('customer/image', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}

	getCityList(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData('cities/list', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}


	modifyAddre(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.putData('customer', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}



	changeCustomer(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data.postData('orderentry/customer/change', body, options).pipe(
			finalize(() => this.data.serviceCompleted()),
			catchError((err) => {
				options.hideErrorMethod ? "" : this.data.errorMethod(err);
				return throwError(err);
			})
		);
	}

	deleteOrder(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData('order/remove', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}

	deletesales(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData('sales/remove', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}

	salesNewDispNo(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data.postData('sales/newdisplayno', body, options).pipe(
			finalize(() => this.data.serviceCompleted()),
			catchError((err) => {
				options.hideErrorMethod ? "" : this.data.errorMethod(err);
				return throwError(err);
			})
		);
	}


	salesItemRestore(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data.postData('sales/itemrestore', body, options).pipe(
			finalize(() => this.data.serviceCompleted()),
			catchError((err) => {
				options.hideErrorMethod ? "" : this.data.errorMethod(err);
				return throwError(err);
			})
		);
	}

	salesCalcItemValues(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data.postData('sales/calculate/itemvalues', body, options).pipe(
			finalize(() => this.data.serviceCompleted()),
			catchError((err) => {
				options.hideErrorMethod ? "" : this.data.errorMethod(err);
				return throwError(err);
			})
		);
	}

	getGodownSetup(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data.postData('setup/transgodowns', body, options).pipe(
			finalize(() => this.data.serviceCompleted()),
			catchError((err) => {
				options.hideErrorMethod ? "" : this.data.errorMethod(err);
				return throwError(err);
			})
		);
	}

	salesItemsAdd(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data.postData('sales/items/add', body, options).pipe(
			finalize(() => this.data.serviceCompleted()),
			catchError((err) => {
				options.hideErrorMethod ? "" : this.data.errorMethod(err);
				return throwError(err);
			})
		);
	}

	removeSalesItem(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data.postData('sales/item/remove', body, options).pipe(
			finalize(() => this.data.serviceCompleted()),
			catchError((err) => {
				options.hideErrorMethod ? "" : this.data.errorMethod(err);
				return throwError(err);
			})
		);
	}

	salesDiscandCharges(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data.postData('sales/discountandcharges', body, options).pipe(
			finalize(() => this.data.serviceCompleted()),
			catchError((err) => {
				options.hideErrorMethod ? "" : this.data.errorMethod(err);
				return throwError(err);
			})
		);
	}

	updSalesOtherDet(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data.postData('update/sales/otherdetails', body, options).pipe(
			finalize(() => this.data.serviceCompleted()),
			catchError((err) => {
				options.hideErrorMethod ? "" : this.data.errorMethod(err);
				return throwError(err);
			})
		);
	}

	confirmSales(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data.postData('sales/confirm', body, options).pipe(
			finalize(() => this.data.serviceCompleted()),
			catchError((err) => {
				options.hideErrorMethod ? "" : this.data.errorMethod(err);
				return throwError(err);
			})
		);
	}

	custLastSaleRate(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data.postData('customer/lastsalerate', body, options).pipe(
			finalize(() => this.data.serviceCompleted()),
			catchError((err) => {
				options.hideErrorMethod ? "" : this.data.errorMethod(err);
				return throwError(err);
			})
		);
	}

	getItemSerialDet(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data.postData('item/serialdetails', body, options).pipe(
			finalize(() => this.data.serviceCompleted()),
			catchError((err) => {
				options.hideErrorMethod ? "" : this.data.errorMethod(err);
				return throwError(err);
			})
		);
	}

	getItemRatewiseStock(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data.postData('item/ratewisestock', body, options).pipe(
			finalize(() => this.data.serviceCompleted()),
			catchError((err) => {
				options.hideErrorMethod ? "" : this.data.errorMethod(err);
				return throwError(err);
			})
		);
	}

	getBatchStockDet(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data.postData('batchstockdetails', body, options).pipe(
			finalize(() => this.data.serviceCompleted()),
			catchError((err) => {
				options.hideErrorMethod ? "" : this.data.errorMethod(err);
				return throwError(err);
			})
		);
	}


	receiptConfirm(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData('receipt/confirm', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}

	itemstocks(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData('get/itemstocks', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}

	converttoinvoice(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData('soitems/convert/draftsalesitems', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}

	getAdvOrderPendings(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData('customer/advancependingorders', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}


	statelistdata(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData('states/list', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}

	citydataall(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData('cities/list', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}

	contactList(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData('contacts', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}

	updCustomerImage(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.putData('customer/image', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}


	receiptDetail(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData('receipt/detail', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}

	smsToCustomer(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData('receipt/send/sms/tocustomer', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}

	whatsappToCustomer(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData('receipt/send/whatsapp/tocustomer', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}

	getDocList(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData('documents/list', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}

	getRoutesList(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData('routelist ', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}

	searchItemStocks(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData('search/itemstocks ', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}

	getReportingToPesrons(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData('reportingpersons', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}

	receiptdelete(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData('receipt/remove', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}

	notifications(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData('notifications', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}


	pendingorderlist(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData('reports/sopending/abstract', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}

	pendingorderitemwise(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData('reports/pendingorder/itemwise', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}

	custAdvances(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data.postData('customer/advances', body, options).pipe(
			finalize(() => this.data.serviceCompleted()),
			catchError((err) => {
				options.hideErrorMethod ? "" : this.data.errorMethod(err);
				return throwError(err);
			})
		);
	}


	updTask(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data

			.putData('task', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}

	sopendingdetails(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData('reports/sopending/detail', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}




	delTask(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData('task/remove', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}

	getCustAdvRep(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData('reports/customeradvance', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}

	getSalesbalance(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data.postData('salesbalance/abstract', body, options).pipe(

			finalize(() => this.data.serviceCompleted()),
			catchError((err) => {
				options.hideErrorMethod ? "" : this.data.errorMethod(err);
				return throwError(err);
			})
		);
	}
	salesItemsConvertDraftSalesRetItems(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data.postData('salesitems/convert/draftsalesreturnitems', body, options).pipe(
			finalize(() => this.data.serviceCompleted()),
			catchError((err) => {
				options.hideErrorMethod ? "" : this.data.errorMethod(err);
				return throwError(err);
			})
		);
	}

	salesRetDet(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data.postData('salesreturn/detail', body, options).pipe(
			finalize(() => this.data.serviceCompleted()),
			catchError((err) => {
				options.hideErrorMethod ? "" : this.data.errorMethod(err);
				return throwError(err);
			})
		);
	}

	salesRetItemRemove(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data.postData('salesreturn/item/remove', body, options).pipe(
			finalize(() => this.data.serviceCompleted()),
			catchError((err) => {
				options.hideErrorMethod ? "" : this.data.errorMethod(err);
				return throwError(err);
			})
		);
	}

	salesRetItemEdit(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data.postData('salesreturn/items/edit', body, options).pipe(
			finalize(() => this.data.serviceCompleted()),
			catchError((err) => {
				options.hideErrorMethod ? "" : this.data.errorMethod(err);
				return throwError(err);
			})
		);
	}

	confirmSalesRet(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data.postData('salesreturn/confirm', body, options).pipe(
			finalize(() => this.data.serviceCompleted()),
			catchError((err) => {
				options.hideErrorMethod ? "" : this.data.errorMethod(err);
				return throwError(err);
			})
		);
	}

	salesRetSendWhatsapp(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data.postData('salesreturn/send/whatsapp/tocustomer', body, options).pipe(
			finalize(() => this.data.serviceCompleted()),
			catchError((err) => {
				options.hideErrorMethod ? "" : this.data.errorMethod(err);
				return throwError(err);
			})
		);
	}

	checkinfunc(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data.postData('user/mark/loggedin', body, options).pipe(
			finalize(() => this.data.serviceCompleted()),
			catchError((err) => {
				options.hideErrorMethod ? "" : this.data.errorMethod(err);
				return throwError(err);
			})
		);
	}

	checkoutfunc(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data.postData('user/mark/loggedout', body, options).pipe(
			finalize(() => this.data.serviceCompleted()),
			catchError((err) => {
				options.hideErrorMethod ? "" : this.data.errorMethod(err);
				return throwError(err);
			})
		);
	}


	checkinoutlist(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data.postData('user/loginhistory', body, options).pipe(
			finalize(() => this.data.serviceCompleted()),
			catchError((err) => {
				options.hideErrorMethod ? "" : this.data.errorMethod(err);
				return throwError(err);
			})
		);
	}

	corpvalidate(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData('corporate/checkvalid', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}

	userimageupdate(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.putData('user/image', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}

	bulkUpdLocationLogs(body: any, options?: any): Observable<any> {
		this.data.serviceStarted();
		options === undefined
			? (options = this.data.defaultOptions)
			: (options = this.data.setOptions(options));
		return this.data
			.postData('bulkupdate/user/locationlogs', body, options)
			.pipe(
				finalize(() => this.data.serviceCompleted()),
				catchError((err) => {
					options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
					return throwError(err);
				})
			);
	}
}

