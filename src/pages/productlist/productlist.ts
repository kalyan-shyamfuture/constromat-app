import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, NavParams, MenuController, Events, ModalController, ViewController } from 'ionic-angular';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { ServicesProvider } from '../../core/services/services';
import { environment } from '../../core/global';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Keyboard } from '@ionic-native/keyboard';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage({ segment: 'productlist/:id' })
@IonicPage()
@Component({
  selector: 'page-productlist',
  templateUrl: 'productlist.html',
})
export class ProductlistPage {
  baseimg: any = environment.imageBaseUrl;
  rating;
  product_list: any = [];
  FilterResult: number;
  visible_key: boolean = false;
  catId: any;
  filterUrl: any;
  filterData: any;
  product_regular_price: any;
  product_sell_price: any;
  productList: any = [];
  defaultPagination: number;
  id: any;
  type: any;
  brandid: any;
  user_id: any;
  deviceId: any;
  isLoggedin: boolean;
  action: any;
  searchTxt: any = "";
  searchType: any = "";
  customer_cart_data: any = [];
  proList: any = [];
  searchList: any = [];
  searchKeyword: any;
  searchForm: FormGroup;
  pageno = 1;
  productList2: any = [];
  totalproCount:number=0;
  proCount:number=0;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    private spinnerDialog: SpinnerDialog,
    public events1: Events,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public sp: ServicesProvider,
    public toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    public keyboard: Keyboard
  ) {

    this.searchForm = this.formBuilder.group({
      searchTxt: ['', Validators.compose([Validators.minLength(3), Validators.required])],
    });

    if (localStorage.getItem('isLoggedin')) {
      this.user_id = localStorage.getItem('logged_user_id');
      this.isLoggedin = true;
      this.deviceId = "";
    }
    else {
      this.user_id = '';
      this.isLoggedin = false;
      this.deviceId = localStorage.getItem('deviceId');
    }

  }

  ionViewDidLoad() {
    this.defaultPagination = 1;
    this.menuCtrl.close();
    this.events1.publish('hideBackButton', false);
    this.events1.publish('isHeaderHidden', false);
    this.rating = [1, 2, 3, 4, 5];

    if (localStorage.getItem("cart")) {
      this.customer_cart_data = JSON.parse(localStorage.getItem("cart"));

    }
    else {
      this.customer_cart_data = [];
    }

    this.searchType = this.navParams.get('searchType');
    if (this.navParams.get('searchType') == 'discount') {
      this.getDiscountProducts();
    }
    else if (this.navParams.get('searchType') == 'search') {
    }
    else {
      if (this.navParams.get('type') == 'brand') {
        this.brandid = this.navParams.get('idd');
      }
      else if (this.navParams.get('type') == 'category') {
        this.catId = this.navParams.get('idd');
      }
      else {
        this.catId = this.navParams.get('id');
      }

      if (this.navParams.get('searchTxt')) {
        this.searchTxt = this.navParams.get('searchTxt');
      }
      this.filterData = this.navParams.get('filterData');
      this.getProducts();

    }

  }

  filterList(event) {
    this.searchTxt = event;
    this.searchTxt = this.searchForm.value.searchTxt;
    if (this.searchTxt) {
      this.getProductsClick();
    }
    else {
      this.getProducts();
    }
  }

  getProductsClick() {
    this.spinnerDialog.show();
    var limit = 50;
    var data = {
      "cat_id": "",
      "product_id": "",
      "brand_id": "",
      "user_id": this.user_id,
      "device_token": this.deviceId,
      "pro_search": this.searchTxt
    }

    this.sp.getTopStaples(limit, this.pageno, data).subscribe(
      res => {
        this.productList = res['result']['data'];
        this.totalproCount  = res['result']['count'];
        this.proCount = res['result']['data'].length;
        this.productList.forEach((x, i) => {
          var index = this.customer_cart_data.findIndex(y => y.product_id == x.id && y.unit_id == x.meta[0].unit_id);
          if (index != -1) {
            this.productList[i].meta[0].isCart = true;
            this.productList[i].meta[0].quantity = this.customer_cart_data[index].quantity;
          }
          else {
            this.productList[i].meta[0].isCart = false;
            this.productList[i].meta[0].quantity = 0;
          }
        })
        this.visible_key = true;
        this.searchList = [];
        this.spinnerDialog.hide();


      },
      error => {
        this.visible_key = true;
        this.spinnerDialog.hide();

      }
    )
  }


  filterSearchList(event) {
    this.searchTxt = event._value;
    if (this.searchTxt.length > 2) {
      var data = {
        "keyword": this.searchTxt
      }
      this.sp.getSuggestionList(data).subscribe(
        res => {
          this.searchKeyword = res['result']['keyword'];
          this.searchList = res['result']['brand_details'];
          if (this.searchList.length == 0) {
            this.showErrorToast('Product not found')
          }

        },
        error => {
          this.searchList = [];
          this.visible_key = true;

        }
      )
    }
    else {
      this.searchList = [];
    }

  }

  selectSearchResult(item, searchKey) {
    if (this.searchTxt) {
      this.searchTxt = searchKey;
      this.brandid = item.brand_id;
      this.catId = '';
      this.getProducts();
    }
  }

  getDiscountProducts() {
    this.spinnerDialog.show();
    var limit = 50;
    var data = {
      "user_id": this.user_id,
      "device_token": this.deviceId,
    }

    this.sp.getDiscountProduct(limit, this.pageno, data).subscribe(
      res => {

        this.proList = res['result']['data'];
        this.totalproCount  = res['result']['count'];
        this.proCount = res['result']['data'].length;
        this.visible_key = true;
        this.productList = Object.keys(this.proList).map(i => this.proList[i])

        this.productList.forEach((x, i) => {
          var index = this.customer_cart_data.findIndex(y => y.product_id == x.id && y.unit_id == x.meta[0].unit_id);
          if (index != -1) {
            this.productList[i].meta[0].isCart = true;
            this.productList[i].meta[0].quantity = this.customer_cart_data[index].quantity;
          }
          else {
            this.productList[i].meta[0].isCart = false;
            this.productList[i].meta[0].quantity = 0;
          }
        })


        this.spinnerDialog.hide();
      },
      error => {
        this.visible_key = true;
        this.spinnerDialog.hide();
      }
    )
  }

  getProducts() {
    this.spinnerDialog.show();
    var limit = 50;
    var data = {
      "cat_id": this.catId,
      "product_id": "",
      "brand_id": this.brandid,
      "user_id": this.user_id,
      "device_token": this.deviceId,
      "pro_search": this.searchTxt
    }

    this.sp.getTopStaples(limit, this.pageno, data).subscribe(
      res => {
        this.productList = res['result']['data'];
        this.totalproCount  = res['result']['count'];
        this.proCount = res['result']['data'].length;
        this.productList.forEach((x, i) => {
          var index = this.customer_cart_data.findIndex(y => y.product_id == x.id && y.unit_id == x.meta[0].unit_id);
          if (index != -1) {
            this.productList[i].meta[0].isCart = true;
            this.productList[i].meta[0].quantity = this.customer_cart_data[index].quantity;
          }
          else {
            this.productList[i].meta[0].isCart = false;
            this.productList[i].meta[0].quantity = 0;
          }
        })
        this.visible_key = true;
        this.searchList = [];
        this.spinnerDialog.hide();


      },
      error => {
        this.visible_key = true;
        this.spinnerDialog.hide();

      }
    )
  }

  setCartData() {
    localStorage.setItem("cart", JSON.stringify(this.customer_cart_data));
  }

  addtoCart(product, i) {
    var data = {
      "product_id": product.id,
      "cat_id": product.category_id,
      "product_name": product.name,
      "image_small": product.image_large,
      "user_id": this.user_id,
      "quantity": "1",
      "unit_id": product.meta[0].unit_id,
      "unit_price": product.meta[0].market_price,
      "device_token": this.deviceId,
      "action": "insert",
      "totalOurPrice": product.meta[0].market_price,
      "totalMarketPrice": product.meta[0].price,
      "unit_quantity": product.meta[0].quantity_count,
      "unit_name": product.meta[0].unit_name,
    }
    var index = this.customer_cart_data.findIndex(y => y.product_id == product.id && y.unit_id == product.meta[0].unit_id);
    if (index == -1) {
      this.customer_cart_data.push(data);
      this.productList[i].meta[0].quantity = 1;
      this.productList[i].meta[0].isCart = true;
      this.setCartData();
    }
    this.sp.cartNumberStatus(true);

  }


  increment(topProduct, i) {
    var index = this.customer_cart_data.findIndex(y => y.product_id == topProduct.id && y.unit_id == topProduct.meta[0].unit_id);
    if (index != -1) {
      this.customer_cart_data[index].quantity = parseInt(topProduct.meta[0].quantity) + 1;
      this.setCartData();
    }
    this.productList[i].meta[0].quantity = this.customer_cart_data[index].quantity;
    this.productList[i].meta[0].quantity = this.customer_cart_data[index].quantity;
    this.sp.cartNumberStatus(true);
  }

  decrement(topProduct, i) {
    var index;
    if (topProduct.meta[0].quantity > 1) {
      index = this.customer_cart_data.findIndex(y => y.product_id == topProduct.id && y.unit_id == topProduct.meta[0].unit_id);
      if (index != -1) {
        this.customer_cart_data[index].quantity = parseInt(topProduct.meta[0].quantity) - 1;
        this.productList[i].meta[0].quantity = parseInt(topProduct.meta[0].quantity) - 1;
        if (this.productList[i].meta[0].quantity == 0) {
          this.productList[i].meta[0].isCart = false;
          this.productList[i].meta[0].isCart = false;
        }
      }

      this.setCartData();
      this.sp.cartNumberStatus(true);
    }
    else {
      index = this.customer_cart_data.findIndex(y => y.product_id == topProduct.id && y.unit_id == topProduct.meta[0].unit_id);
      if (index != -1) {
        this.customer_cart_data.splice(index, 1);

      }
      this.productList[i].meta[0].isCart = false;
      this.productList[i].meta[0].isCart = false;
      this.setCartData();
      this.sp.cartNumberStatus(true);
    }



  }

  gotoDetails(id, catid) {
    this.navCtrl.push('ProductdetailsPage', { id: id, catid: catid });
  }


  showErrorToast(data: any) {
    let toast = this.toastCtrl.create({
      message: data,
      duration: 4000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
    });

    toast.present();
  }


  doInfinite(infiniteScroll) {
    var limit = 50;
    this.pageno = this.pageno + 1;

    if (this.navParams.get('searchType') == 'discount') {
      var data1 = {
        "user_id": this.user_id,
        "device_token": this.deviceId,
      }

      this.sp.getDiscountProduct(limit, this.pageno, data1).subscribe(
        res => {
          this.productList2 = Object.keys(res['result']['data']).map(i => res['result']['data'][i])
          this.proList = [...this.productList, ...this.productList2];
          this.proCount = this.proList.length;
          this.visible_key = true;
          this.productList = Object.keys(this.proList).map(i => this.proList[i])
          this.productList.forEach((x, i) => {
            var index = this.customer_cart_data.findIndex(y => y.product_id == x.id && y.unit_id == x.meta[0].unit_id);
            if (index != -1) {
              this.productList[i].meta[0].isCart = true;
              this.productList[i].meta[0].quantity = this.customer_cart_data[index].quantity;
            }
            else {
              this.productList[i].meta[0].isCart = false;
              this.productList[i].meta[0].quantity = 0;
            }
          })
          infiniteScroll.complete();
        },
        error => {
          this.visible_key = true;
        }
      )
    }
    else {
      var data = {
        "cat_id": this.catId,
        "product_id": "",
        "brand_id": this.brandid,
        "user_id": this.user_id,
        "device_token": this.deviceId,
        "pro_search": this.searchTxt
      }
      this.sp.getTopStaples(limit, this.pageno, data).subscribe(
        res => {
          this.productList = [...this.productList, ...res['result']['data']];
          this.proCount = this.productList.length;
          this.productList.forEach((x, i) => {
            var index = this.customer_cart_data.findIndex(y => y.product_id == x.id && y.unit_id == x.meta[0].unit_id);
            if (index != -1) {
              this.productList[i].meta[0].isCart = true;
              this.productList[i].meta[0].quantity = this.customer_cart_data[index].quantity;
            }
            else {
              this.productList[i].meta[0].isCart = false;
              this.productList[i].meta[0].quantity = 0;
            }
          })
          this.visible_key = true;
          this.searchList = [];
          infiniteScroll.complete();
        },
        error => {
          this.visible_key = true;
        }
      )
    }
  }

}
