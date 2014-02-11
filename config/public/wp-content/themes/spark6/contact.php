<?php
/*
Template Name: Contact
*/

get_header(); ?>
<script type="text/javascript" 
src="http://maps.google.com/maps/api/js?sensor=false&amp;language=en"></script>
<div class="jumbotron featured contact">
        <img src="<?php bloginfo('stylesheet_directory');?>/img/header-contact.jpg" alt="Contact Us">
        <img src="<?php bloginfo('stylesheet_directory');?>/img/header-contact-mobile.jpg" class="mobile-header" alt="Enterprise Gameification">
        <h1 class="text-center">Contact Us</h1>
      </div><!-- /.featured -->

      <div id="contact-page" class="row">
        <div class="left-col">
          <form id="contactForm" role="form">
            <div class="form-group">
              <p>
                <label for="name">Your Name</label>
                <input type="text" class="form-control" id="name">
              </p>
            </div>
            <div class="form-group">
              <p>
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email">
              </p>
            </div>
            <div class="form-group hideTablet">
              <p>
                <label for="company">Company</label>
                <input type="text" class="form-control" id="company">
              </p>
            </div>
            <div class="form-group hideTablet">
              <p>
                <label for="url">Website</label>
                <input type="url" class="form-control" id="url" >
              </p>
            </div>
            <div class="form-group hideTablet">
              <p>
                <label for="phone">Phone</label>
                <input type="tel" class="form-control" id="phone" >
              </p>
            </div>
            <div class="form-group">
              <p class="textarea">
                <label for="message">Message</label>
                <textarea class="form-control" id="message" rows="5" ></textarea>
              </p>
            </div>
            <button type="submit" class="btn btn-default">Submit</button>
            <p class="instructions">Unlock the <strong>First Contact</strong> Achievement!</p>
          </form>
        </div><!-- /.left-col -->
        <div class="right-col">
          <div class="google-map-canvas">
            <div id="gmap"></div>
          </div>
          <div class="bgred">
            <address>
              <span class="spark-white"></span>
              <strong>Spark6 Inc.</strong><br>
              1415 10th Street STE 2<br>
              Santa Monica, California 90401
            </address>
            <div class="contact-email">
              <strong>Sales</strong>
              <p>sales@spark6.com</p>
            </div>
            <div class="contact-email last">
              <strong>Support</strong>
              <p>support@spark6.com</p>
            </div>
            <div class="clearfix"></div>
            <div class="contact-email">
              <strong>Careers</strong>
              <p>careers@spark6.com</p>
            </div>
            <div class="contact-email last">
              <strong>Accounting</strong>
              <p>accounting@spark6.com</p>
            </div>
            <div class="clearfix"></div>

            <ul class="social-nav">
              <li><a href="#" class="linkedin"><span>LinkedIn</span></a></li>
              <li><a href="#" class="facebook"><span>Facebook</span></a></li>
              <li><a href="#" class="pinterest"><span>Pinterest</span></a></li>
            </ul>

          </div>
        </div><!-- /.right-col -->
        <div class="clearfix"></div>
      </div><!-- /#contact-page -->

      <h3 class="subheading text-center">More Great Services.</h3>


      <div id="nav-services" class="row">
        <a href="#" class="thumbnail mobile col-sm-4 col-xs-6">
          <h4>Mobile <br/>first</h4>
          <img src="<?php bloginfo('stylesheet_directory');?>/img/thumb-mobile.jpg" alt="Mobile" />
          <div class="red-overlay">
            <div class="diamond"></div>
            <span class="icon-mobile"></span>
          </div>
        </a>
        <a href="#" class="thumbnail cms col-sm-4 col-xs-6">
          <h4>Enterprise <br/>CMS</h4>
          <img src="<?php bloginfo('stylesheet_directory');?>/img/thumb-cms.jpg" alt="CMS" />
          <div class="red-overlay">
            <div class="diamond"></div>
            <span class="icon-cms"></span>
          </div>
        </a>
        <a href="#" class="thumbnail ux col-sm-4 col-xs-6">
          <h4>User <br/>Experience</h4>
          <img src="<?php bloginfo('stylesheet_directory');?>/img/thumb-ux.jpg" alt="UX" />
          <div class="red-overlay">
            <div class="diamond"></div>
            <span class="icon-ux"></span>
          </div>
        </a>
        <a href="#" class="thumbnail enterprise hidden col-sm-4 col-xs-6">
          <h4>Enterprise <br/>Gameification</h4>
          <img src="<?php bloginfo('stylesheet_directory');?>/img/thumb-enterprise.jpg" alt="Enterprise" />
          <div class="red-overlay">
            <div class="diamond"></div>
            <span class="icon-enterprise"></span>
          </div>
        </a>
         <a href="#" class="thumbnail cms  col-sm-4 col-xs-6">
          <h4>Digital <br/>Marketing</h4>
          <img src="<?php bloginfo('stylesheet_directory');?>/img/thumb-marketing.jpg" alt="Marketing" />
          <div class="red-overlay">
            <div class="diamond"></div>
            <span class="icon-marketing"></span>
          </div>
        </a>
        <a href="#" class="thumbnail video col-sm-4 col-xs-6">
          <h4>Video <br/>Production</h4>
          <img src="<?php bloginfo('stylesheet_directory');?>/img/thumb-video.jpg" alt="Video" />
          <div class="red-overlay">
            <div class="diamond"></div>
            <span class="icon-video"></span>
          </div>
        </a>
        
      </div><!--/#nav-services -->
<?php get_footer(); ?>