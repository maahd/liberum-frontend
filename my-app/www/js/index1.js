/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/*
 * jQuery Mobile in a iScroll plugin
 * Copyright (c) Kazuhiro Osawa
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * dependency: iScroll 3.7.1 http://cubiq.org/iscroll
 */
/*

-head1 name

iPhone like 'position fixed' header/footer manager

=head1 EXAMPLE

<div data-role="page" data-iscroll="enable" id="index">
  <div data-role="header">
    <h1>INDEX PAGE</h1>
  </div>

  <div data-role="content">
    <div data-iscroll="scroller">
      some contents.
    </div>
  </div>

  <div data-role="footer" class="ui-bar">
    <div data-role="navbar" class="ui-navbar">
      <ul class="ui-grid-b">
        <li class="ui-block-a"><a href="#home">home</a></li>
        <li class="ui-block-a"><a href="#timeline">timeline</a></li>
        <li class="ui-block-a"><a href="#message">message</a></li>
        <li class="ui-block-a"><a href="#bookmark">bookmark</a></li>
        <li class="ui-block-a"><a href="#config">config</a></li>
      </ul>
    </div>
  </div>
</div>


=cut

 */

 if (window.innerWidth && window.innerWidth <= 600) { 
 $(document).ready(function(){ 
 $('#header ul').addClass('hide'); 
 $('#header').append(
 '<div class="leftButton" onclick="toggleMenu()">Menu</div>'); 
 });
 function toggleMenu() { 
 $('#header ul').toggleClass('hide'); 
 $('#header .leftButton').toggleClass('pressed'); 
 }
}



    
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }

};
