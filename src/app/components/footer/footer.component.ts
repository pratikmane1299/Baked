import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {


  constructor() { }

  ngOnInit() {
    $(document).ready(function(){
      $("#scrollToTopButton").hide();
      $(window).on("scroll", function() {
        var scrollHeight = $(document).height();
        var scrollPosition = $(window).height() + $(window).scrollTop();
        if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
          // when scroll to bottom of the page
          console.log("reached bottom of the page");
          $("#scrollToTopButton").show();
        } else {
          $("#scrollToTopButton").hide();
        }
      });
    });
  }

}
