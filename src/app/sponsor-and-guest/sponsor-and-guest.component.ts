import { Component, OnInit } from '@angular/core';
import { SponsorAndGuest } from "../../models/sponsorAndGuest.model";
import { SponsorAndGuestService } from "../sponsor-and-guest.service";
import { EventService } from "../event.service";
import { SessionService } from "../session.service";

declare const $;

@Component({
  selector: 'app-sponsor-and-guest',
  templateUrl: './sponsor-and-guest.component.html',
  styleUrls: ['./sponsor-and-guest.component.css']
})
export class SponsorAndGuestComponent implements OnInit {

  events :Event[]=[];
  sponsorAndGuests : SponsorAndGuest[] = [];
  
  dataLoaded: boolean;

  constructor(private sponsorAndGuestService : SponsorAndGuestService,private eventService: EventService,private session :SessionService) { }

  ngOnInit() {

    this.dataLoaded = false;
    this.getSponsorsAndGuest();
    this.getEvents();
    this.dataLoaded=true;

  }

  getSponsorsAndGuest() : void{

    this.sponsorAndGuestService.getSponsorAndGuests().subscribe(
      res =>{
        console.log(res["SponsorOrGuest"]);
        this.sponsorAndGuests =  res["SponsorOrGuest"];
      }
    );

  }

  getEvents(): void {
    this.eventService.getEvents()
                .subscribe(res=>{
                  console.log(res["events"]);
                  this.events=res["events"];
                  this.dataLoaded=true;
                  $(function(){
                    //alert('test');
                    $('#Sponser').DataTable( {
                      dom: 'Bfrtip',
                      buttons: [
                          'copy', 'csv', 'excel', 'pdf', 'print'
                      ]
                      } );
                  })
                  
                  
                });
               
    //.subscribe(data=>{},err=>{});
  }

  delete(sponsorandguest: SponsorAndGuest): void {
    this.sponsorAndGuests = this.sponsorAndGuests.filter(sg => sg !== sponsorandguest);
    this.sponsorAndGuestService.deleteSponsorAndGuest(sponsorandguest).subscribe(
      res=>{
        console.log(res);
        if(res["success"]){
          alert("Deleted Successfully");
        }
        else{
          alert("Cannot delete , refering in another field");
        }
      },
      err => {
        console.error(err);
      }
    );
  }
}
