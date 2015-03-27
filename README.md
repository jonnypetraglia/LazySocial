LazySocial
===============
> Version: 0.1
> License: MIT
> Supports: Facebook, Google+, Twitter, LinkedIn, and some Google Analytics
> Tested: FF 36

LazySocial is a very small Javascript library to make it _stupid simple_ to
include social share buttons that don't slow the page load time.

Add a _single_ `ul` tag. Include the JS. Done.


Special thanks to: [Taylor Fausak](http://taylor.fausak.me/2012/05/31/better-social-widget-lazy-loading). I took what you did and ran with it.


Usage
-----
First, create any number of `ul` elements with the class `social-widgets` and
add `data-` attributes to the `ul` to configure the sites that you want to use.

Second, include the JS script.

Third, ... that's it. That's all you need. LazySocial will automatically run
as soon as the page loads.


Styling the button appearances before they are moused over is left up to you, or
you can just use the "social.css" that I wrote for the sample HTML page.


### LazySocial Configuration ###

  * `href` - The URL to pass to the sites to share; defaults to the current
             page's address
  * `eager` - Loads the buttons on page load instead of on mouseover
  * `use` - What sites you want to load, in a pipe-delimited list in the order
            you want them; example: 'google|facebook|twitter|linkedin'


### Site Configuration ###

  * `locale` - (optional) The locale to supply to sites that take it as an
               argument; defaults to 'en_US'

  * `facebook-appId` = (required for FB) Your AppID.

  * `twitter-via` = (optional) Screen name of the user to attribute the Tweet to
  * `twitter-related` = (optional) Related accounts
  * `twitter-hashtags` = (optional) No '#' necessary
  * `twitter-text` = (optional) Default Tweet text. If unset, Twitter will set
                     it to the page title
  * `twitter-dnt` = (optional) Opt Out of Twitter "Tailoring". Set to true to
                    enable

  * `linkedin-title` = (optional) The title to be used in the post
  * `linkedin-source` = (optional) Where the post on LinkedIn will say that the
                        content is from
  * `linkedin-summary` = (optional) Do I really hafta explain 'summary' to you?


Advanced Usage
---------

#### Post-page load configuration ####

The values of the `data` attributes for the sites are only 'locked in' when the
user actually mouses over. Up until that point, you can alter values of the
attributes all you want, except for `eager` and `use`, which are only relevant
at the time of the page load.

#### Non-Lazy Loading ####

If you don't want lazy loading but still would like a simple way to include
social buttons, just set the `data-eager="true"` and the buttons will be loaded
when the page loads.


Downsides
---------
  * Does not degrade gracefully if JS is not enabled.
  * Twitter's 'data-counturl' is not settable because I'm getting sick of adding
    s#&$ to the URL
    * Adding it would introduce `data-twitter-shortUrl`/`twitterShortUrl`
      & then set `data-url` to that & `data-counturl` to pageURL.
  * I have no idea what I'm doing when it comes to Google Analytics.
  * Minified size is 3.2kb. Would love it if I could get it under 2kb.
  * Facebook requires more CSS to fix it sometimes being invisible, but I'm not
    sure if that is my fault.


Why "Lazy" Load?
-------

LazySocial is a way to "lazy load" your social icons so that your page loads
faster and you have less of a headache worrying about stupid buttons.

"Lazy loading" -or those who are unaware- means loading only when it is
absolutely necessary. In the case of social buttons, that time is when the user
hovers their mouse over the button.

Why lazy load? Simple: page load speed. If you wanted social buttons for all 4
websites listed above, the browser loads:

  * The JS for each site = 481kb (154kb + (36kb+57kb+111kb) + 108kb + 3.7kb)
  * The iframes for all but LinkedIn = 132kb (48kb + (36kb+1kb) + 43kb)
  * All the overhead for making 10+ more individual HTTP requests

All before the browser spinner stops spinning. Pretty annoying, especially for
something that the user might never even interact with.

So by lazy loading, you only fetch them when you need to, and only the ones that
the user is interested in. Pretty nifty.


In addition to that, LazySocial also:

  * Inserts the HTML tags that each site requires in addition to their JS.
  * Lets you set the style (horizontal, horizontal_count, or vertical_count)
    that _all_ buttons will be.
  * Does not attempt to style anything; it just handles inserting.
  * Automagically handles Google Analytics stuffs for when the buttons are
    loaded via hover.
  * Also provides a straightup link to share as well, meaning it will work on
    mobile!
  * Has NO external libraries! Pure vanilla JS, baby!


All that, and all you have to do is write _one_ HTML tag!
