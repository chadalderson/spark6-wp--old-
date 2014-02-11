<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */


$url = parse_url(getenv("CLEARDB_DATABASE_URL"));

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define("DB_NAME", trim($url["path"], "/"));
// define("DB_NAME", "heroku_4eed1f5663e035f");

/** MySQL database username */
define("DB_USER", trim($url["user"]));
// define("DB_USER", "b7cfc877a785ae");

/** MySQL database password */
define("DB_PASSWORD", trim($url["pass"]));
// define("DB_PASSWORD", "db3717c2");

/** MySQL hostname */
define("DB_HOST", trim($url["host"]));
// define("DB_HOST", "us-cdbr-east-03.cleardb.com");

/** MySQL database port  */
// define("DB_PORT", trim($url["port"]));

/** Database Charset to use in creating database tables. */
define("DB_CHARSET", "utf8");

/** Allows both foobar.com and foobar.herokuapp.com to load media assets correctly. */
define("WP_SITEURL", "http://" . $_SERVER["HTTP_HOST"]);

/** WP_HOME is your Blog Address (URL). */
// define('WP_HOME', "http://" . $_SERVER["HTTP_HOST"]);

define("FORCE_SSL_LOGIN", getenv("FORCE_SSL_LOGIN") == "true");
define("FORCE_SSL_ADMIN", getenv("FORCE_SSL_ADMIN") == "true");
if ($_SERVER["HTTP_X_FORWARDED_PROTO"] == "https")
  $_SERVER["HTTPS"] = "on";

/** The Database Collate type. Don't change this if in doubt. */
define("DB_COLLATE", "");

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'b-Ng<X36).?s]prs!JOus4(d=YWp_~,+{tmV-.Zme+IU+(Wn(c]-Ch] 5jS|mIKg');
define('SECURE_AUTH_KEY',  '(d4;G-GKt1:EEzgiT`tGRhSP@|oMQ1s``zoQ!_zo3,-D78SGQ5Gf)Q!U6J%c(HVG');
define('LOGGED_IN_KEY',    'Q[0lH$CnxY>y)@k//[NdTJ 9Am[Qug5Cy@-|;,k,lBMS$:kzK{J{=jHL}|EEl,BB');
define('NONCE_KEY',        '2}Z_@*$al|#,.P|OFbM_J@_@?0g:hg!jd0ROY+7H7$-fY!O- H$C87F:K*N#?ypI');
define('AUTH_SALT',        '>|Un0;^l|EGk,3U|}lLJgbp,na=Y[o)v0<jhLZxcbq2+;:?`{;c5lA*it5-$.aV`');
define('SECURE_AUTH_SALT', '<.y~-WkD,:^Yo0KTXxN:^Dh,I!Ou>^s2_7WNZ.~v5A^x6T?v9&.UJ?:zn]h-!S,c');
define('LOGGED_IN_SALT',   'Pu^])NjlH0K(4nO8MY%8wnN3hq0juIw@@dNOg,Dc6YP+;D*`cuz>_=&A@O:1-!M-');
define('NONCE_SALT',       'BKNW5%u[5Sz4DM?PBssjZ,H+K<%}118.C+eRI7NhI;n#eNSGg%M_69Nc=SJ|bPPK');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = "wp_";

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to "de_DE" to enable German
 * language support.
 */
define("WPLANG", "");

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define("WP_DEBUG", false);

/**
 * Enable the WordPress Object Cache
 */
define("WP_CACHE", getenv("WP_CACHE") == "true");

/**
 * Disable the built-in cron job
 */
define("DISABLE_WP_CRON", getenv("DISABLE_WP_CRON") == "true");

/* That"s all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined("ABSPATH") )
  define("ABSPATH", dirname(__FILE__) . "/");

/* constants for wpro s3 use */
define('WPRO_ON', true); // Enables the plugin and use configuration from contants.
define('WPRO_SERVICE', 's3'); // Amazon S3 is the service.
define('WPRO_FOLDER', ''); // Prepend all URI paths at S3 with this folder. In most cases, you probably want this to be empty.
define('WPRO_AWS_KEY', 'AKIAJBFWST6RQAPBAVQQ');
define('WPRO_AWS_SECRET', 'PwPlaTj/Z7w/Ob/K87Yf5Swh5nn8Hroepkzv0f4M');
define('WPRO_AWS_BUCKET', 'spark6-r2'); // The name of the Amazon S3 bucket where your files should be stored.
define('WPRO_AWS_VIRTHOST', ''); // If you have a virthost for your Amazon S3 bucket, it should be there.
define('WPRO_AWS_ENDPOINT', 's3-us-west-1.amazonaws.com'); // The Amazon endpoint datacenter where your S3 bucket is. 

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . "wp-settings.php");


