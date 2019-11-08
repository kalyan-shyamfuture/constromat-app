import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events, ToastController } from 'ionic-angular';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { ModalController } from 'ionic-angular';
import { ServicesProvider } from '../../core/services/services';
import { environment } from '../../core/global';
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage({ segment: 'productdetails/:id/:catid' })
@Component({
  selector: 'page-productdetails',
  templateUrl: 'productdetails.html',
})
export class ProductdetailsPage {
  productdetailsType: string = "details";
  rating;
  avg_rating;
  product_details: any = {};
  img_base_url;
  product_id;
  logged_user_id;
  customer_cart_data: any;
  recently_view_product: any = [];
  product_details_img: any = [];
  package_name;
  visible_key: boolean;
  selectedColor: any;
  selectedSize: any;
  color: any;
  activeIndex: any;
  selectedIndex: number;
  product_variation: any = [];
  proImageList: any = [];
  product_regular_price: any;
  product_sell_price: any
  product_brand: any;
  product_material: any;
  reviewList: any;
  stockQty: any;
  pid: any;
  product_price: any;
  product_att_length: any;
  reviewListLength: number;

  shownGroup = 1;

  deliveryType: any = 1;
  catid: any;
  defaultPagination: number;

  productDetails: any = {};
  proMeta: any = {};
  productList: any = [];
  baseimg: any = environment.imageBaseUrl;
  deliveryList: any = [];

  action: any;
  user_id: any;
  isLoggedin: boolean;
  deviceId: any;
  user_name: any;
  proMetai:any;
  proimgArr:any =[];
  discountPrice:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public events1: Events,
    private spinnerDialog: SpinnerDialog,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    public sp: ServicesProvider,
  ) {
    this.events1.publish('isHeaderHidden', true);
    if (localStorage.getItem('isLoggedin')) {
      this.user_id = localStorage.getItem('logged_user_id');
      this.user_name = localStorage.getItem('logged_user_name');
      this.isLoggedin = true;
      this.deviceId = "";
    }
    else {
      this.user_id = '';
      this.user_name = 'Guest';
      this.isLoggedin = false;
      this.deviceId = localStorage.getItem('deviceId');
    }
  }

  ionViewDidLoad() {
    this.menuCtrl.close();
    this.events1.publish('hideBackButton', false);
    this.events1.publish('isHeaderHidden', true);
    this.defaultPagination = 1;
    this.pid = this.navParams.get('id');
    this.catid = this.navParams.get('catid');
    this.getProductDetails(this.pid, this.catid);
    this.getSimilarProducts(this.catid, this.pid);
    this.proMetai = 0;

    if (localStorage.getItem('isLoggedin')) {
      this.logged_user_id = localStorage.getItem('logged_user_id');
    }
    else {
      this.logged_user_id = '';
    }

    this.getDeliverSlot();

  }

  ionViewWillEnter() {
    if (localStorage.getItem("cart")) {
      this.customer_cart_data = JSON.parse(localStorage.getItem("cart"));

    }
    else {
      this.customer_cart_data = [];
    }
    this.getProductDetails(this.pid, this.catid);
  }

  ionViewWillLeave() {
    this.events1.publish('hideBackButton', true);
    this.events1.publish('isHeaderHidden', false);
  }


  


  toggleGroup(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  };
  isGroupShown(group) {
    return this.shownGroup === group;
  };


  gotoDetails(id, catid) {
    this.navCtrl.push('ProductdetailsPage', { id: id, catid: catid });
  }
  


  getProductDetails(pid, catid) {
    var limit = 20;
    var pageno = this.defaultPagination;

    var data = {
      "cat_id": this.catid,
      "product_id": this.pid,
      "brand_id": ""
    }
    this.sp.getTopStaples(limit, pageno, data).subscribe(
      res => {
        this.productDetails = res['result']['data'][0];
        if(this.productDetails.image_multiple) {
          var str = this.productDetails.image_multiple;
          var multipleImage  = str;
          this.proimgArr = multipleImage.split(',');
          this.proimgArr = this.proimgArr.filter(Boolean);
        }
        this.proMeta = this.productDetails.meta[0];
        this.discountPrice = parseFloat(this.proMeta.price) - parseFloat(this.proMeta.market_price);
        this.visible_key = true;
        var index = this.customer_cart_data.findIndex(y => y.product_id == this.productDetails.id && y.unit_id == this.proMeta.unit_id);
        if (index != -1) {
          this.proMeta.isCart = true;
          this.proMeta.quantity = this.customer_cart_data[index].quantity;
        }
        else {
          this.proMeta.isCart = false;
          this.proMeta.quantity = 0;
        }

      },
      error => {
        this.visible_key = true;
      }
    )
  }

  changePrice(meta,i) {
    this.proMeta = {};
    this.proMetai =i;
    this.proMeta = this.productDetails.meta[this.proMetai];
   this.discountPrice = parseFloat(this.proMeta.price) - parseFloat(this.proMeta.market_price);
    this.visible_key = true;
    var index = this.customer_cart_data.findIndex(y => y.product_id == this.productDetails.id && y.unit_id == this.proMeta.unit_id);
    if (index != -1) {
      this.proMeta.isCart = true;
      this.proMeta.quantity = this.customer_cart_data[index].quantity;
    }
    else {
      this.proMeta.isCart = false;
      this.proMeta.quantity = 0;
    }
  }

  getSimilarProducts(catid, pid) {
    var limit = 20;
    var pageno = this.defaultPagination;

    var data = {
      "cat_id": catid,
      "product_id": "",
      "brand_id": ""
    }
    this.sp.getTopStaples(limit, pageno, data).subscribe(
      res => {
        this.productList = res['result']['data'];
        this.visible_key = true;
        var index = this.productList.findIndex(function (o) {
          return o.id === pid;
        })
        if (index !== -1) this.productList.splice(index, 1);
      },
      error => {
        this.visible_key = true;
      }
    )
  }

  getDeliverSlot() {
    this.sp.getDeliverSlotHome().subscribe(
      res => {
        this.deliveryList = res['result'];
      },
      error => {
      }
    )
  }


  buyNow(productDetails,proMeta) {

    var data = {
      "product_id": productDetails.id,
      "cat_id":productDetails.category_id,
      "product_name": productDetails.name,
      "image_small": productDetails.image_large,
      "user_id": this.user_id,
      "quantity": "1",
      "unit_id": proMeta.unit_id,
      "unit_price": proMeta.market_price,
      "device_token": this.deviceId,
      "action": "insert",
      "totalOurPrice": proMeta.market_price,
      "totalMarketPrice": proMeta.price,
      "unit_quantity" : proMeta.quantity_count,
      "unit_name": proMeta.unit_name,
    }
     var index = this.customer_cart_data.findIndex(y => y.product_id == productDetails.id && y.unit_id == proMeta.unit_id );
     this.productDetails.meta[this.proMetai].isCart = true;
     this.productDetails.meta[this.proMetai].quantity = 1;
     if (index == -1) {
       this.customer_cart_data.push(data);
       this.setCartData();
       this.navCtrl.push('CartPage');
     }
     else {
      this.navCtrl.push('CartPage');
     }
 
     this.sp.cartNumberStatus(true);
  }

  setCartData() {
    localStorage.setItem("cart", JSON.stringify(this.customer_cart_data));
  }


  addtoCart(productDetails,proMeta) {
    var data = {
      "product_id": productDetails.id,
      "cat_id":productDetails.category_id,
      "product_name": productDetails.name,
      "image_small": productDetails.image_large,
      "user_id": this.user_id,
      "quantity": "1",
      "unit_id": proMeta.unit_id,
      "unit_price": proMeta.market_price,
      "device_token": this.deviceId,
      "action": "insert",
      "totalOurPrice": proMeta.market_price,
      "totalMarketPrice": proMeta.price,
      "unit_quantity" : proMeta.quantity_count,
      "unit_name": proMeta.unit_name,
    }
     var index = this.customer_cart_data.findIndex(y => y.product_id == productDetails.id && y.unit_id == proMeta.unit_id );
     this.productDetails.meta[this.proMetai].isCart = true;
     this.productDetails.meta[this.proMetai].quantity = 1;
     if (index == -1) {
       this.customer_cart_data.push(data);
       this.setCartData();
     }

     this.sp.cartNumberStatus(true);
   

  }

  increment(topProduct,proMeta) {
    var index = this.customer_cart_data.findIndex(y => y.product_id == topProduct.id && y.unit_id == proMeta.unit_id);
    if (index != -1) {
      this.customer_cart_data[index].quantity = parseInt(proMeta.quantity) + 1;
      this.setCartData();
    }
    this.productDetails.meta[this.proMetai].quantity = parseInt(proMeta.quantity) + 1;
    this.sp.cartNumberStatus(true);
  }

  decrement(topProduct,proMeta) {
    var index;
    if (proMeta.quantity > 1) {
      index = this.customer_cart_data.findIndex(y => y.product_id == topProduct.id && y.unit_id == proMeta.unit_id);
      if (index != -1) {
        this.customer_cart_data[index].quantity = parseInt(proMeta.quantity) - 1;
        this.productDetails.meta[this.proMetai].quantity = parseInt(proMeta.quantity) - 1;
        this.setCartData();
       if( this.productDetails.meta[this.proMetai].quantity == 0) {
        this.productDetails.meta[this.proMetai].isCart = false;
       }
      }

    }
    else {
      index = this.customer_cart_data.findIndex(y => y.product_id == topProduct.id && y.unit_id == proMeta.unit_id);
      if (index != -1) {
        this.customer_cart_data.splice(index, 1);
        this.setCartData();
      }
      this.productDetails.meta[this.proMetai].isCart = false;

    }

    this.sp.cartNumberStatus(true);

  }
  goBack() {
    this.navCtrl.pop();
  }
  gotoCmsPage(id) {
    this.navCtrl.push('CmsPage', { id: id });
  }
  presentToast(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  deliveryListt() {
    return this.deliveryList.filter((delivery) => delivery.is_home == 1);
  }


}
