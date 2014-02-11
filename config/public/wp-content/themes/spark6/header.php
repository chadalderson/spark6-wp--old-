<?php
/**
 * The Header template for our theme
 *
 * Displays all of the <head> section and everything up till <div id="main">
 *
 * @package WordPress
 * @subpackage Twenty_Twelve
 * @since Twenty Twelve 1.0
 */
?><!DOCTYPE html>
<!--[if IE 7]>
<html class="ie ie7" <?php language_attributes(); ?>>
<![endif]-->
<!--[if IE 8]>
<html class="ie ie8" <?php language_attributes(); ?>>
<![endif]-->
<!--[if !(IE 7) | !(IE 8)  ]><!-->
<html <?php language_attributes(); ?>>
<!--<![endif]-->
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>" />
<meta name="viewport" content="width=device-width" />
<title><?php wp_title( '|', true, 'right' ); ?></title>
<link rel="profile" href="http://gmpg.org/xfn/11" />
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
<?php // Loads HTML5 JavaScript file to add support for HTML5 elements in older IE versions. ?>
<!--[if lt IE 9]>
<script src="<?php echo get_template_directory_uri(); ?>/js/html5.js" type="text/javascript"></script>
<![endif]-->
<?php wp_head(); ?>
<link href="<?php echo get_template_directory_uri(); ?>/css/bootstrap.min.css" rel="stylesheet" media="screen">
<link href="<?php echo get_template_directory_uri(); ?>/css/all.css" rel="stylesheet" media="screen">
<link href="<?php echo get_template_directory_uri(); ?>/css/videojs.css" rel="stylesheet" media="screen">
<script type="text/javascript" src="//use.typekit.net/jgg4bxu.js"></script>
<script type="text/javascript">try{Typekit.load();}catch(e){}</script>
<script src="<?php echo get_template_directory_uri(); ?>/js/jquery.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/bootstrap.min.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/holder/holder.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/plugins.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/main.js"></script>
</head>

<body>
<div id="page" class="hfeed site container">
	<div id="header">
        <!-- Static navbar -->
        <div id="header-nav" class="navbar navbar-default" role="navigation">
          
          <div class="navbar-header">
            <button type="button" id="openMenu" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
          </div>
          
          <a id="logo" href="#" class="">
            <span class="spark"></span>
            <p class="text">Spark6</p>
          </a><!--/#logo -->

          <div class="navbar-collapse collapse">
            <ul id="nav" class="nav nav-pills nav-justified">
              <li class="active"><a href="<?php bloginfo('siteurl') ?>">Home</a></li>
              <li><a href="<?php bloginfo('siteurl') ?>/about">About</a></li>
              <li><a href="<?php bloginfo('siteurl') ?>/work">Work</a></li>
              <li><a href="<?php bloginfo('siteurl') ?>/contact">Contact</a></li>
            </ul>
          </div><!--/.nav-collapse -->

        </div><!--/.navbar -->
      </div><!-- /#header-->