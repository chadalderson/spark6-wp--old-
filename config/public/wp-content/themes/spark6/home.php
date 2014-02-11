<?php
/*
Template Name: Home
*/

get_header(); ?>
<div class="jumbotron home-video">
        <a href="#">
          <div class="welcome">
            <p>We build things.</p>
            <div class="icon-play"></div>
            <img src="<?php echo get_template_directory_uri(); ?>/img/home-video.jpg" />
          </div>
          <div class="video">
            <p>Play It.</p>
            <img src="<?php echo get_template_directory_uri(); ?>/img/home-video-hover.jpg" />
          </div>       
          <div class="video-box">
            <video id="home_video" class="video-js vjs-default-skin" controls preload="none" width="1080" height="606"
                poster="<?php echo get_template_directory_uri(); ?>/img/video.png"
                data-setup="{}">
              <source src="http://video-js.zencoder.com/oceans-clip.mp4" type='video/mp4' />
              <source src="http://video-js.zencoder.com/oceans-clip.webm" type='video/webm' />
              <source src="http://video-js.zencoder.com/oceans-clip.ogv" type='video/ogg' />
            </video>
          </div>
        </a> 
      </div><!-- /.home-video -->

      <div id="services" class="row">
        <div class="col-md-4 col-sm-6 col-xs-12">
          <a href="#" class="thumbnail ">
            <h4>Mobile <br/>first</h4>
            <div class="service-text">
              <p>Mauris sed tempus velit. Aliquam turpis ipsum alano elit.</p>
              <p class="btn icon-mobile"><span></span>Learn More</p>
            </div>
            <img src="<?php echo get_template_directory_uri(); ?>/img/thumb-mobile.jpg" alt="Mobile"  />
            <div class="red-overlay"></div>
          </a>
        </div>
        <div class="col-md-4 col-sm-6 col-xs-12">
          <a href="#" class="thumbnail ">
            <h4>Enterprise <br/>CMS</h4>
            <div class="service-text">
              <p>Mauris sed tempus velit. Aliquam turpis ipsum alano elit.</p>
              <p class="btn icon-cms"><span></span>Learn More</p>
            </div>
            <img src="<?php echo get_template_directory_uri(); ?>/img/thumb-cms.jpg" alt="CMS"  />
            <div class="red-overlay"></div>
          </a>
        </div>
        <div class="col-md-4 col-sm-6 col-xs-12">
          <a href="#" class="thumbnail ">
            <h4>User <br/>Experience</h4>
            <div class="service-text">
              <p>Mauris sed tempus velit. Aliquam turpis ipsum alano elit.</p>
              <p class="btn icon-ux"><span></span>Learn More</p>
            </div>
            <img src="<?php echo get_template_directory_uri(); ?>/img/thumb-ux.jpg" alt="User Experience"  />
            <div class="red-overlay"></div>
          </a>
        </div>
        <div class="col-md-4 col-sm-6 col-xs-12">
          <a href="#" class="thumbnail enterprise">
            <h4>Enterprise <br/>Gameification</h4>
            <div class="service-text">
              <p>Mauris sed tempus velit. Aliquam turpis ipsum alano elit.</p>
              <p class="btn icon-enterprise"><span></span>Learn More</p>
            </div>
            <img src="<?php echo get_template_directory_uri(); ?>/img/thumb-enterprise.jpg" alt="Enterprise"  />
            <div class="red-overlay"></div>
          </a>
        </div>
        <div class="col-md-4 col-sm-6 col-xs-12">
          <a href="#" class="thumbnail ">
            <h4>Digital <br/>Marketing</h4>
            <div class="service-text">
              <p>Mauris sed tempus velit. Aliquam turpis ipsum alano elit.</p>
              <p class="btn icon-marketing"><span></span>Learn More</p>
            </div>
            <img src="<?php echo get_template_directory_uri(); ?>/img/thumb-marketing.jpg" alt="Digital Marketing"  />
            <div class="red-overlay"></div>
          </a>
        </div>
        <div class="col-md-4 col-sm-6 col-xs-12">
          <a href="#" class="thumbnail ">
            <h4>Video <br/>Production</h4>
            <div class="service-text">
              <p>Mauris sed tempus velit. Aliquam turpis ipsum alano elit.</p>
              <p class="btn icon-video"><span></span>Learn More</p>
            </div>
            <img src="<?php echo get_template_directory_uri(); ?>/img/thumb-video.jpg" alt="Video"  />
            <div class="red-overlay"></div>
          </a>
        </div>        
      </div><!-- /#services -->

      <div class="jumbotron home-facebook">
        <a href="#" class="text-center">
          <p class="fb-icon"><span></span></p>
          <span class="fb-shadow"></span>
          <h2>Fusce et mi eget enim suscipit faucibus et ac nisl. Donec risus nibh sit amet enim.</h2>
          <p class="like-txt">Like Us</p>
        </a>
      </div><!-- /.home-facebook-->
      
      <div id="companies" class="row">
        <div class="col-md-3 col-sm-3 col-xs-6">
          <a class="thumbnail paypal">
            <p>PayPal</p>
            <span class="rollover"></span>
          </a>
        </div>
        <div class="col-md-3 col-sm-3 col-xs-6">
          <a  class="thumbnail dsc">
            <p>DSC</p>
            <span class="rollover"></span>
          </a>
        </div>
        <div class="col-md-3 col-sm-3 col-xs-6">
          <a  class="thumbnail cisco">
            <p>Cisco</p>
            <span class="rollover"></span>
          </a>
        </div>
        <div class="col-md-3 col-sm-3 col-xs-6">
          <a  class="thumbnail ebay last">
            <p>eBay Inc</p>
            <span class="rollover"></span>
          </a>
        </div>
        <div class="col-md-3 col-sm-3 col-xs-6">
          <a  class="thumbnail bbdo">
            <p>BBDO</p>
            <span class="rollover"></span>
          </a>
        </div>
        <div class="col-md-3 col-sm-3 col-xs-6">
          <a class="thumbnail ebaycarreers">
            <p>eBay Inc Careers</p>
            <span class="rollover"></span>
          </a>
        </div>      
        <div class="col-md-3 col-sm-3 col-xs-6">
          <a  class="thumbnail att">
            <p>AT&amp;T</p>
            <span class="rollover"></span>
          </a>
        </div>
        <div class="col-md-3 col-sm-3 col-xs-6">
          <a class="thumbnail mc last">
            <p>MC</p>
            <span class="rollover"></span>
          </a>
        </div>      
      </div><!--/#companies --> 
<script src="<?php echo get_template_directory_uri(); ?>/js/videojs.js"></script>
<script>
      videojs.options.flash.swf = "<?php echo get_template_directory_uri(); ?>/video-js.swf";
    </script>
<?php get_footer(); ?>