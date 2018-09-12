import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { PushNotificationService } from './push-notification.service';

const VAPID_PUBLIC = 'BGtAuHTsb1--TkunwxQZDd2JII6baiJEg9mr8WsHK_qCsl-h7p4KSGSjcCTBzdox0lCXFfVKtDakgMrJUYNfRTk';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(swPush: SwPush, pushService: PushNotificationService) {
    if (swPush.isEnabled) {
      swPush.requestSubscription({
        serverPublicKey: VAPID_PUBLIC
      })
      .then(subscription => {
        console.log(subscription);
        pushService.sendSubscriptionToTheServer(subscription).subscribe();
      })
      .catch(console.error);
    }
  }

}
