import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

declare var $: any;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    isOpen: boolean;
    constructor() { }

    ngOnInit() {
        this.isOpen = false;
        /* Audio Player */

        let getaudio = $('#player')[0], mouseovertimer, audiostatus = 'off', playerControls = '.player-controls';
        $(document).on('mouseenter', playerControls, function () {
            if (!mouseovertimer) {
                mouseovertimer = window.setTimeout(function () {
                    mouseovertimer = null;
                    if (!$(playerControls).hasClass('playing')) {
                        getaudio.load();
                        getaudio.play();
                        $(playerControls).addClass('playing');
                        return false;
                    }
                }, 2500);
            }
        });

        $(document).on('mouseleave', playerControls, function () {
            if (mouseovertimer) {
                window.clearTimeout(mouseovertimer);
                mouseovertimer = null;
            }
        });
        $(document).on('click touch', playerControls, function (e) {
            e.preventDefault();
            if (!$(playerControls).hasClass('playing')) {
                if (audiostatus === 'off') {
                    $(playerControls).addClass('playing');
                    getaudio.load();
                    getaudio.play();
                    window.clearTimeout(mouseovertimer);
                    audiostatus = 'on';
                    return false;
                } else if (audiostatus === 'on') {
                    $(playerControls).addClass('playing');
                    getaudio.play();
                }
            } else if ($(playerControls).hasClass('playing')) {
                getaudio.pause();
                $(playerControls).removeClass('playing');
                window.clearTimeout(mouseovertimer);
                audiostatus = 'on';
            }
            return false;
        });
        $('#player').on('ended', function () {
            $(playerControls).removeClass('playing');
            audiostatus = 'off';
        });


        $('nav').find('a')[0].click(function (e) {
            e.preventDefault();
            let section = $(this).attr('href');
            $('html, body').animate({
                scrollTop: $(section).offset().top
            });
        });
        // Header Change onScroll

        $(function () {
            $(window).on('scroll', function () {
                if ($(window).scrollTop() > 50) {
                    $('.navbar').addClass('active');
                } else {
                    // remove the background property so it comes transparent again (defined in your css)
                    $('.navbar').removeClass('active');
                }
            });
        });
    }

    closeOnClick() {
        this.isOpen = false;
    }
}
