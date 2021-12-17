import { AfterViewInit, Component, ElementRef, NgZone, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import {  GestureController, IonCard, Platform } from '@ionic/angular';
import { Gesture,
  GestureConfig,
  createGesture } from '@ionic/core';

@Component({
  selector: 'app-daily-profile',
  templateUrl: './daily-profile.page.html',
  styleUrls: ['./daily-profile.page.scss'],
})
export class DailyProfilePage implements AfterViewInit {
  introSlider: any;
  longPressActive = false
  @ViewChildren(IonCard, {read: ElementRef}) cards: QueryList<ElementRef>;
  tinderCardsArray: Array<ElementRef>;

  moveOutWidth: number; 
  shiftRequired: boolean; 
  transitionInProgress: boolean;
  
  interested: any;
  notinterested: any;
  shortlisted: any;

  constructor( public profileService: ProfileService,private gestureCtrl: GestureController,private zone: NgZone,
    private platform: Platform) {
    this.profileService.getJSON().subscribe(data => {
      this.introSlider = data.info;
    });
   }

  ngOnInit() {
    this.interested = []
    this.notinterested = []
    this.shortlisted = []   
  }

  ngAfterViewInit(){
    this.moveOutWidth = document.documentElement.clientWidth * 1.5;

    this.cards.changes.subscribe(() => {
      this.tinderCardsArray = this.cards.toArray();
      this.useLongPress(this.tinderCardsArray);
      this.useTinderSwipe(this.tinderCardsArray)
    });
  }

  userClickedButton(event, value, index, id) {
    event.preventDefault();
    if (!this.cards.length) return false;
    if (value == "interest") {
      this.tinderCardsArray[index].nativeElement.style.transform = 'translate(' + this.moveOutWidth + 'px, -100px) rotate(-30deg)';
      var interestScope = this.introSlider.filter(e=> e.id == id)
      this.interested.push(interestScope[0].imageName)
    } else if (value == "nointerest"){
      this.tinderCardsArray[index].nativeElement.style.transform = 'translate(-' + this.moveOutWidth + 'px, -100px) rotate(30deg)';
      var nointerestScope = this.introSlider.filter(e=> e.id == id)
      this.notinterested.push(nointerestScope[0].imageName)
    } else if (value == "shortlist"){
      this.tinderCardsArray[index].nativeElement.style.transform = 'translate(-' + this.moveOutWidth + 'px, -100px) rotate(150deg)';
      var shortlistScope = this.introSlider.filter(e=> e.id == id)
      this.shortlisted.push(shortlistScope[0].imageName)
    };
  };

  useLongPress(cardArray){
    for (let i=0; i<cardArray.length; i++){
      const card = cardArray[i];
      const gesture: Gesture = this.gestureCtrl.create({
        el: card.nativeElement,
        gestureName: 'long-press',
        onStart: ev =>{
          this.longPressActive = true;
        },
        onEnd: ev => {
          this.longPressActive = false;
        }
      }, true);
      gesture.enable(true)
    }
  }
  
  async useTinderSwipe(cardArray){

    for (let i=0; i<cardArray.length; i++){
      const card = cardArray[i];
      const gesture = this.gestureCtrl.create({
        el: card.nativeElement,
        gestureName: 'tinder-swipe',
        onStart: ev =>{
        },
        onMove: ev =>{
          card.nativeElement.style.transform = `translateX(${
            ev.deltaX
          }px) rotate(${ev.deltaX / 10}deg)`;

          //TO SET COLOR ON SWIPE
          this.setCardColor(ev.deltaX,ev.deltaY, card.nativeElement);
        },
        onEnd: ev => {
          card.nativeElement.style.transition = ".5s ease-out";

         //Right side Move
          if (ev.deltaX > 150) {
            card.nativeElement.style.transform = `translateX(${
              +this.platform.width() * 2
            }px) rotate(${ev.deltaX / 2}deg)`;

            var interestScope = this.introSlider[i]
            this.interested.push(interestScope.imageName)
          }
          // Left Side Move
          else if (ev.deltaX < -150) {
            card.nativeElement.style.transform = `translateX(-${
              +this.platform.width() * 2
            }px) rotate(${ev.deltaX / 2}deg)`;

            var nointerestScope = this.introSlider[i]
            this.notinterested.push(nointerestScope.imageName)
          }
          // Up Side Move
          else if (ev.deltaY < 0) {
            card.nativeElement.style.transform = `translateY(-${
              +this.platform.width() * 2
            }px) rotate(${ev.deltaY / 2}deg)`;
            var shortlistScope = this.introSlider[i]
            this.shortlisted.push(shortlistScope.imageName)
          }
          // When No move or if small move back to original
          else {
            card.nativeElement.style.transform = "";
          }

        }
      },true);

      gesture.enable(true)
    }
  }

  // STYLE OF CARD WHEN GESTURE START
  setCardColor(x,y, element) {
    let color = "";
    const abs = Math.abs(x);
    const min = Math.trunc(Math.min(16 * 16 - abs, 16 * 16));
    const hexCode = this.decimalToHex(min, 2);

    let colorY = "";
    const absY = Math.abs(y);
    const minY = Math.trunc(Math.min(16 * 16 - absY, 16 * 16));
    const hexCodeY = this.decimalToHex(minY, 2);

    if (x < 0) {
      color = "#FF" + hexCode + "FF" + hexCode;
    } else {
      color = "#" + hexCode + "FF" + hexCode;
    }

    if (y < 0) {
      colorY = "#FF" + hexCodeY + "FF" + hexCodeY;
    } else {
      colorY = "#" + hexCodeY + "FF" + hexCodeY;
    }

    element.style.background = color;
  }

  decimalToHex(d, padding) {
    let hex = Number(d).toString(16);
    padding =
      typeof padding === "undefined" || padding === null
        ? (padding = 2)
        : padding;

    while (hex.length < padding) {
      hex = "0" + hex;
    }
    return hex;
  }

}
