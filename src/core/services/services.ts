import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { environment } from '../global';
import { Observable } from 'rxjs/Observable';
/*
  Generated class for the CoreApiServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicesProvider {

  headers: any;
  @Output() getLoginStatus: EventEmitter<any> = new EventEmitter();
  @Output() getCartNumberStatus: EventEmitter<any> = new EventEmitter();
  @Output() getlocUpdateStatus: EventEmitter<any> = new EventEmitter();
  @Output() getaddressStatus: EventEmitter<any> = new EventEmitter();


  constructor(public http: HttpClient) {
    let login = 'admin';
    let password = '12345';
    this.headers = new HttpHeaders().set('x-api-key', 'Shyam@12345').set('Authorization', "Basic " + btoa(login + ':' + password));
  }

  loginStatus(status) {
    this.getLoginStatus.emit(status);
  }
  cartNumberStatus(data): Observable<any> {
    if (data) {
      this.getCartNumberStatus.emit(data);
      return
    }
  }
  addressStatus(data): Observable<any> {
    if (data) {
      this.getaddressStatus.emit(data);
      return
    }
  }

  locUpdateStatus(data): Observable<any> {
    if (data) {
      this.getlocUpdateStatus.emit(data);
      return
    }
  }

  getCartCount(data) {
    return this.http.post(environment.apiEndpoint + 'cartcount/', data, { headers: this.headers });
  }

 

  getGeneralList() {
    return this.http.get(environment.apiEndpoint + 'generallist/', { headers: this.headers });
  }

  getFaqList() {
    return this.http.get(environment.apiEndpoint + 'faqlist/', { headers: this.headers });
  }

  getCategoryList() {
    return this.http.get(environment.apiEndpoint + 'productcategorylist/', { headers: this.headers });
  }

  getSubCategoryList(id) {
    return this.http.get(environment.apiEndpoint + 'productsubcategorylist/' + id, { headers: this.headers });
  }

  getTopStaples(limit, pageno, data) {
    return this.http.post(environment.apiEndpoint + 'productslist/' + limit + '/' + pageno, data, { headers: this.headers });
  }

  getDiscountProduct(limit, pageno,data) {
    return this.http.post(environment.apiEndpoint + 'discountproductslist/' + limit + '/' + pageno, data, { headers: this.headers });
  }

  getDeliverSlot() {
    return this.http.get(environment.apiEndpoint + 'deliveryslotlist/', { headers: this.headers });
  }

  getDeliverSlotHome() {
    return this.http.get(environment.apiEndpoint + 'deliveryslotlistforhome/', { headers: this.headers });
  }

  getDeliverSlotOthers() {
    return this.http.get(environment.apiEndpoint + 'deliveryslotlistforothers/', { headers: this.headers });
  }

  addtoCart(data) {
    return this.http.post(environment.apiEndpoint + 'manageCart/', data, { headers: this.headers });
  }

  getCartList(data) {
    return this.http.post(environment.apiEndpoint + 'manageCart/', data, { headers: this.headers });
  }

  // userLogin(str) {
  //   return this.http.post(environment.apiEndpoint + 'usersigninsignupotp/', str, { headers: this.headers });
  // }
  userLoginFinal(str) {
    return this.http.post(environment.apiEndpoint + 'usersigninsignup/', str, { headers: this.headers });
  }

  getCustomerAddressList(id): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'cusaddlistbycusid/' + id, { headers: this.headers });
  }

  getUserDetails(id) {
    return this.http.get(environment.apiEndpoint + 'userprofile/' + id, { headers: this.headers });
  }

  addOrder(str) {
    return this.http.post(environment.apiEndpoint + 'addorder/', str, { headers: this.headers });
  }

  getOrderDetails(id) {
    return this.http.get(environment.apiEndpoint + 'orderdetailsbyid/' + id, { headers: this.headers });
  }

  getOrderList(id) {
    return this.http.get(environment.apiEndpoint + 'orderlistbycustid/' + id, { headers: this.headers });
  }

  getOrderListByStatus(id, status) {
    return this.http.get(environment.apiEndpoint + 'orderlistbystatus/' + id + '/' + status, { headers: this.headers });
  }

  addAddress(str) {
    return this.http.post(environment.apiEndpoint + 'addcustomeraddress/', str, { headers: this.headers });
  }

  repeatOrder(data) {
    return this.http.post(environment.apiEndpoint + 'reorder/', data, { headers: this.headers });
  }
  getCouponList() {
    return this.http.get(environment.apiEndpoint + 'couponlist/', { headers: this.headers });
  }

  checkCoupon(data) {
    return this.http.post(environment.apiEndpoint + 'managecoupon/', data, { headers: this.headers });
  }
  getBestSellingPro(data) {
    return this.http.post(environment.apiEndpoint + 'bestsellproductslist/', data, { headers: this.headers });
  }
  getAdressList(id) {
    return this.http.get(environment.apiEndpoint + 'cusaddlistbycusid/' + id, { headers: this.headers });
  }

  deleteAddress(id) {
    return this.http.get(environment.apiEndpoint + 'deletecustomeraddress/' + id, { headers: this.headers });
  }

  updateAddress(data, addid) {
    return this.http.post(environment.apiEndpoint + 'updateCustomerAddressById/' + addid, data, { headers: this.headers });
  }

  getCmsDetails(id): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'cmslist/' + id, { headers: this.headers });
  }

  getRepeatOrder(id): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'repeatorder/?product_id=' + id, { headers: this.headers });
  }

  updateProfile(data, id) {
    return this.http.post(environment.apiEndpoint + 'Userprofileupdate/' + id, data, { headers: this.headers });
  }
  emailOtp(data) {
    return this.http.post(environment.apiEndpoint + 'useremailverifyotp/', data, { headers: this.headers });
  }

  emailVerified(data) {
    return this.http.post(environment.apiEndpoint + 'useremailverify/', data, { headers: this.headers });
  }

  getOrderImageList(data) {
    return this.http.post(environment.apiEndpoint + 'listimageorder/', data, { headers: this.headers });
  }

  getSuggestionList(data) {
    return this.http.post(environment.apiEndpoint + 'searchsuggestionlist/', data, { headers: this.headers });
  }

  cancelOrderData(data) {
    return this.http.post(environment.apiEndpoint + 'cancelorder/', data, { headers: this.headers });
  }

  getdeliveryCharge() {
    return this.http.get(environment.apiEndpoint + 'deliverycharge/', { headers: this.headers });
  }

  addOrderPaytmUpdate(data) {
    return this.http.post(environment.apiEndpoint + 'updateorderbypaytm/', data, { headers: this.headers });
  }



  // Final Api fotr constromat
  userLogin(data) {
    return this.http.post(environment.apiEndpoint + 'userlogin/', data, { headers: this.headers });
  }

  getBannerList() {
    return this.http.get(environment.apiEndpoint + 'bannerlist/', { headers: this.headers });
  }

}