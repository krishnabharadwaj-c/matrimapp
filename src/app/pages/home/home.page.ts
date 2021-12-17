import { Component } from '@angular/core';
import { IonSlides, PopoverController, ModalController } from '@ionic/angular';
import { NavigationService } from 'src/app/services/navigation.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import {ProfileService} from 'src/app/services/profile.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  public introSlider: any[];
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
  promoSlider: any;

  constructor(public popoverCtrl: PopoverController,
    public modalController: ModalController,
    public navigationService: NavigationService,
    public profileService: ProfileService,
    private nativeStorage: NativeStorage) {}

    ngOnInit() {
      this.profileService.getJSON().subscribe(data => {
        this.introSlider = data.info;
        console.log(this.introSlider)
    });
    }
  
    routeToDailyProfile(){
      this.navigationService.goToDailyProfile();
    }
 
    

    routeToViewProfile(id){
      this.nativeStorage.setItem('info', {profileID: id})
      .then(
        () => console.log('Stored item!'),
        error => console.error('Error storing item', error)
      );

      this.navigationService.goToViewProfile();
    }

}
