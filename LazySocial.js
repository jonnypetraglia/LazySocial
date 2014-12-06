(function() {

  function lazySocial() {
    "use strict";

    var ga = (typeof _gaq !== 'undefined');


    function loadScript(site) {
      var script = document.createElement('script');
      script.async = true;
      if(site.scriptID) script.id = site.scriptID;
      script.src = site.scriptURL;
      document.body.appendChild(script);
    }

    function createView(siteName, siteConfig, pageURL, eager) {
      var li = document.createElement('li');
      li.className = 'social-widget '+siteName+'-widget';

      if(!eager) {
        var placeholder = document.createElement('a');
        placeholder.href = siteConfig.href+encodeURIComponent(pageURL);
        placeholder.text = siteConfig.action;
        placeholder.className = "placeholder";
        li.appendChild(placeholder);
      }

      var real = document.createElement('div');
      real.innerHTML = siteConfig.real;
      li.appendChild(real);
      return li;
    }


    var googleanalytics = {scriptURL: (/^https/.test(location) ? '//ssl' : '//www') + '.google-analytics.com/ga.js'};
    if(ga) loadScript(googleanalytics);


    var containers = document.getElementsByClassName('social-widgets');
    [].forEach.call(containers, function(list) {

      var pageURL = list.getAttribute('data-href') || args.pageURL || document.URL,
          locale = list.getAttribute('data-locale') || 'en_US',
          eager = list.getAttribute('data-eager') || false,
          facebookAppId = list.getAttribute('data-facebook-appId'),
          twitterVia = list.getAttribute('data-twitter-via') || '',
          twitterRelated = list.getAttribute('data-twitter-username') || '',
          twitterHashtags = list.getAttribute('data-twitter-hashtags') || '',
          twitterText = list.getAttribute('data-twitter-text') || '',
          twitterDNT = list.getAttribute('data-twitter-dnt') || '',
          buttonStyle = list.getAttribute('data-style') || 'horizontal',
          sitesToUse = list.getAttribute('data-use').split('|');

      if(sitesToUse.length==0) return;


      var siteStyles = {
        vertical_count: {
          facebook: 'data-layout="box_count"',
          twitter: 'data-count="vertical"',
          google: 'data-size="tall"',
          linkedin: 'data-counter="top"'
        },
        horizontal_count: {
          facebook: 'data-layout="button_count"',
          twitter: '',
          google: 'data-size="medium"',
          linkedin: 'data-counter="right" data-showzero="true"'
        },
        horizontal: {
          facebook: 'data-layout="button"',
          twitter: 'data-count="none"',
          google: 'data-size="medium" data-annotation="none"',
          linkedin: ''
        }
      }
      if(!siteStyles[buttonStyle]) {
        console.log("Invalid social button style: " + buttonStyle);
        buttonStyle = 'horizontal';
      }

      var sites = {
        facebook:   {action: 'Like', 
                     scriptURL: 'https://connect.facebook.net/'+locale+'/sdk.js#xfbml=1&appId='+facebookAppId+'&version=v2.0',
                     scriptID: 'facebook-jssdk',
                     href: '//www.facebook.com/sharer/sharer.php?u=',
                     real: '<div class="fb-like" '+siteStyles[buttonStyle].facebook+' data-href="'+pageURL+'" data-action="like" data-show-faces="false" data-share="false"></div>'},
        google:     {action: '+1',
                     scriptURL: 'https://apis.google.com/js/plusone.js',
                     href: '//plus.google.com/_/+1/confirm?url=',
                     real: '<div class="g-plusone" '+siteStyles[buttonStyle].google+' data-href="'+pageURL+'"></div>'},
        twitter:    {action: 'Tweet',
                     scriptURL: 'https://platform.twitter.com/widgets.js',
                     scriptID: 'twitter-wjs',
                     href: '//twitter.com/intent/tweet?related=' + twitterRelated + '&url=',
                     real: '<a href="https://twitter.com/share" class="twitter-share-button" '+siteStyles[buttonStyle].twitter+' data-url="'+pageURL+'" data-lang="'+locale+'" data-related="'+twitterRelated+'" data-via="'+twitterVia+'" data-hashtags="'+twitterHashtags+'" data-text="'+twitterText+'" data-dnt="'+twitterDNT+'"></a>'},
        linkedin:   {action: 'Share',
                     scriptURL: 'https://platform.linkedin.com/in.js',
                     href: '//www.linkedin.com/shareArticle?mini=true&url=',
                     real: '<script type="IN/Share" '+siteStyles[buttonStyle].linkedin+'data-url="'+pageURL+'"></script>'}
      };

      sitesToUse.forEach(function(name) {
        if(!sites[name])
            console.log("Invalid social site: " + name);
        else
          (function(site) {
            var view = createView(name, site, pageURL, eager);
            list.appendChild(view);
            if(eager)
              loadScript(site);
            else
              view.onmouseover = function() {
                this.onmouseover = null;
                this.removeChild(this.childNodes[0]);
                if(ga) _gaq.push(['_trackEvent', 'Social', name.substr(0,1).toUpperCase()+name.substr(1), site.action]);
                loadScript(site);
              }
          })(sites[name]);
      })
    });
  }

  if(window.onload) {
    var curronload = window.onload;
    var newonload = function() {
        curronload();
        lasySocial();
    };
    window.onload = newonload;
  } else {
      window.onload = lazySocial;
  }
})();