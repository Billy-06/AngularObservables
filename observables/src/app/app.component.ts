import { Component, ElementRef, OnDestroy, OnInit, ViewChild, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subscription, filter, from, fromEvent, map, of, take, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'observables';

  sub !: Subscription;
  subStrings !: Subscription;
  subApples !: Subscription;
  subArray !: Subscription;
  subFrom !: Subscription;
  subEvent !: Subscription;
  subInputDetector !: Subscription;
  
  @ViewChild('name') nameInput!: ElementRef;

  ngOnInit () {
    // this.sub = of(2,4,6).subscribe( item => console.log(`Value from of: ${item}`) );
    // this.subStrings = of("String One", "String Two", "String Three", "String Four").subscribe({
    //   next:  item => console.log(`Value from of: ${item}`),
    //   error: err => console.log(`Error logging the ${err}`),
    //   complete: () => console.log("Done logging the strings :)")
    // });
    // this.subArray = of([2,4,6]).subscribe( item => console.log(`Value from of: ${item}`) );
    // this.subFrom = from([20,45,63]).subscribe({
    //   next: item => console.log(`Value from of: ${item}`),
    //   error: err => console.log("Error handling ", err),
    //   complete: () => console.log("Completed the from observable")
    // });

    // // let characters:string = "";
    // const characters:string []= [];
    // this.subEvent = fromEvent(document , 'keydown').subscribe({
    //   next: event => {
    //     // characters += (event as KeyboardEvent).key
    //     characters.push((event as KeyboardEvent).key)
    //     console.log(characters)
    //   },
    //   error: err => console.log(`There's been a bug at ${err}`),
    //   complete: () => console.log("Completed event streaming")
    // });
    const apples$ = from([
      {
        products: [
          { id: 1, name: "macintosh" },
          { id: 2, name: "gala" },
          { id: 3, name: "fuji" },
          { id: 4, name: "another" },
        ],
        supplier: "Joe Stevens"
      },
      {
        products: [
          { id: 1, name: "macintosh" },
          { id: 2, name: "gala" },
          { id: 3, name: "fuji" },
          { id: 4, name: "another" },
        ],
        supplier: "Joe Stevens"
      },
    ]);
    
    this.subApples = apples$.pipe(
        take( 1 ),
        map(
            item => item.products.map( it => ({...it, color:"red"}) )
        ),
        filter( it => it.length > 3),
        tap( it => {
            it.map( item => console.log(`Item: ${item.name} - ${item.color}`))
        } )
      ).subscribe();

    // this.subInputDetector = fromEvent(this.nameInput, 'input').subscribe({
    //   next: ev => console.log(`Your typed: ${ev.target}`),
    //   error: err => console.log(`You got an error: ${err}`),
    //   complete: () => console.log("completed detecting typed input")
    // });
  }

  ngOnDestroy () {
    this.sub.unsubscribe();
    this.subArray.unsubscribe();
    this.subFrom.unsubscribe();
    this.subStrings.unsubscribe();
    this.subEvent.unsubscribe();

    this.subApples.unsubscribe();
    // this.subInputDetector.unsubscribe();
    
  }
}
