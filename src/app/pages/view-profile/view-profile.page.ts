import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { NavController } from '@ionic/angular';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.page.html',
  styleUrls: ['./view-profile.page.scss'],
})
export class ViewProfilePage implements OnInit {
  id: any;
  introSlider: any;
  currentProfile: any;
  images: any;
  imageInfo: any;
  imageName: any;
  slideOpts = {
    initialSlide: 0,
    speed: 1000,
    zoom: false,
    autoplay: false,
    loop: true,
    page: true,
    pagination : {
      el: '.swiper-pagination',
      clickable: true
    }
  };

  constructor(private nativeStorage: NativeStorage,
    public profileService: ProfileService,
    public navCtrl: NavController,) {
   
   }

  ngOnInit() {
    this.currentProfile = {}
    this.nativeStorage.getItem('info')
    .then(
      data => {console.log(data); 
        this.id = data.profileID;
        if(this.id != undefined){
          this.profileService.getJSON().subscribe(data => {
            this.introSlider = data.info;
            this.introSlider.filter(data => {
              data.id == this.id
            })
            this.images = this.currentProfile[0].multiImages;
            this.imageInfo = this.currentProfile[0].imageInfo;
            this.imageName = this.currentProfile[0].imageName;
        });
        }
      },
      error => console.error(error)
    );

      // this.id = 2
      //   if(this.id != undefined){
      //     this.profileService.getJSON().subscribe(data => {
      //       this.introSlider = data.info;
      //       this.currentProfile = this.introSlider.filter(data => {
      //         return data.id == this.id
      //       })
      //       this.images = this.currentProfile[0].multiImages;
      //       this.imageInfo = this.currentProfile[0].imageInfo;
      //       this.imageName = this.currentProfile[0].imageName;
      //   });
      // }
  }

  goback() {
    this.navCtrl.back();
  }

}
