LazySocial v0.1
===============
License: MIT


Status
-------

Supported sites:
  * Facebook
  * Google+
  * Twitter
  * LinkedIn
  * Additional Google Analytics support (for detecting mouseovers)


Special thanks to: [Taylor Fausak](http://taylor.fausak.me/2012/05/31/better-social-widget-lazy-loading). I took what you did and ran with it.


Summary
-------

LazySocial is a way to "lazy load" your social icons so that your page loads faster and you have less of a headache worrying about stupid buttons.
"Lazy loading" -or those who are unaware- means loading only when it is absolutely necessary. In the case of social buttons, that time is when
the user hovers their mouse over the button.

Why lazy load? Simple: page load speed. If you wanted social buttons for all 4 websites t listed above, the browser loads:

  * The JS for each site = 481kb (154kb + (36kb+57kb+111kb) + 108kb + 3.7kb)
  * The iframes for all but LinkedIn = 132kb (48kb + (36kb+1kb) + 43kb)
  * All the overhead for making 10+ more individual requests

All before the browser spinner stops spinning. Pretty annoying, especially for something that the user might never even interact with.

So by lazy loading, you only fetch them when you need to, and only the ones that the user is interested in. Pretty nifty.


In addition to that, LazySocial also:

  * Inserts the HTML tags that each site requires in addition to their JS.
  * Lets you set the style (horizontal, horizontal_count, or vertical_count) that _all_ buttons will be.
  * Does not attempt to style anything; it just handles inserting.
  * Automagically handles Google Analytics stuffs for when the buttons are loaded via hover.
  * Also provides a straightup link to share as well, meaning it will work on mobile!
  * Has NO external libraries! Pure vanilla JS, baby!


All that, and all you have to do is write _one_ HTML tag!

__But wait, there's more!__ If you don't want eager loading but still want to not have to be bothered by having to 
write the all that junk by hand, just set the 'data-eager' attribute to `true`, and the buttons will be loaded when the page loads, but you still get all the nice perks listed above.


Usage
-----
Everything is done by just setting data attributes in the HTML.

And a quick note: you can alter the attributes after the page loads if you so desire (if eager loading is not enabled)
Just keep in mind that it won't change buttons that are already loaded.

For example, if the page loaded with `data-style="vertical_count"` and the user hovered over Facebook, Facebook would render as the vertical count style. If you then changed it to `data-style="horizontal_count"` and then the user moused over Twitter, Twitter would render as the horizontal count style, but Facebook would remain the vertical count style, which would look weird.

So use discretion.


## LazyLoader Settings ##

  * href - The URL to pass to the sites to share; defaults to the current page's address
  * eager - Loads the buttons on page load instead of on mouseover
  * use - What sites you want to load, in a pipe-delimited list in the order you want them; example: 'google|facebook|twitter|linkedin'


## Site Settings ##

  * locale - (optional) The locale to supply to sites that take it as an argument; defaults to 'en_US'

  * facebook-appId = (required for FB) Your AppID.

  * twitter-via = (optional) Screen name of the user to attribute the Tweet to.
  * twitter-related = (optional) Related accounts.
  * twitter-hashtags = (optional) No '#' necessary.
  * twitter-text = (optional) Default Tweet text. If unset, Twitter will set it to the page title.
  * twitter-dnt = (optional) Opt Out of Twitter "Tailoring". Set to true to enable.

  * linkedin-title = (optional) The title to be used in the post
  * linkedin-source = (optional) Where the post on LinkedIn will say that the content is from
  * linkedin-summary = (optional) Do I really need to explain 'summary' to you?


Downsides
---------
  * Does not degrade gracefully if JS is not enabled.
  * Twitter's 'data-counturl' is not settable because I'm getting sick of adding shit to the URL
    * if I add it I'll just introduce 'data-twitter-shortUrl'/'twitterShortUrl' & then set 'data-url' to that & 'data-counturl' to pageURL.
  * I have no idea what I'm doing when it comes to Google Analytics.