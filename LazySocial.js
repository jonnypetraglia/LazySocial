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

    function createPlaceholder(siteName, siteConfig, url, style, eager) {
      var li = document.createElement('li');
      li.className = 'social-widget '+siteName+'-widget ' + style;

      if(!eager) {
        var placeholder = document.createElement('a');
        placeholder.href = siteConfig.href+encodeURIComponent(url);
        placeholder.text = siteConfig.action;
        placeholder.className = "placeholder";
        li.appendChild(placeholder);
      }
      return li;
    }

    function createReal(li, html) {
      var real = document.createElement('div');
      real.innerHTML = html;
      li.appendChild(real);
    }


    var googleanalytics = {scriptURL: (/^https/.test(location) ? '//ssl' : '//www') + '.google-analytics.com/ga.js'};
    if(ga) loadScript(googleanalytics);


    var containers = document.getElementsByClassName('social-widgets');
    [].forEach.call(containers, function(list) {

      var settings = {}, sitesToUse = list.getAttribute('data-use').split('|'), eager = list.getAttribute('data-eager');
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

      var readSetts = function() {
        settings.url = list.getAttribute('data-href') ||  document.URL,
        settings.locale = list.getAttribute('data-locale') || 'en_US',
        settings.facebook = {appId: list.getAttribute('data-facebook-appId')};
        settings.twitter = {};
        ['via', 'related', 'hashtags', 'text', 'dnt'].forEach(function(attr) {
          settings.twitter['data-twitter-'+attr] = list.getAttribute('data-twitter-'+attr) || ''
        });
        settings.style = siteStyles[list.getAttribute('data-style')] || siteStyles['horizontal'];
      };
      readSetts();

      var sites = {
        facebook:   {action: 'Like', 
                     scriptURL: 'https://connect.facebook.net/'+settings.locale+'/sdk.js#xfbml=1&appId='+settings.facebook.appId+'&version=v2.0',
                     scriptID: 'facebook-jssdk',
                     href: '//www.facebook.com/sharer/sharer.php?u=',
                     real: function() {return '<div class="fb-like" '+settings.style.facebook+' data-href="'+settings.url+'" data-action="like" data-show-faces="false" data-share="false"></div>'}},
        google:     {action: '+1',
                     scriptURL: 'https://apis.google.com/js/plusone.js',
                     href: '//plus.google.com/_/+1/confirm?url=',
                     real: function() {return '<div class="g-plusone" '+settings.style.google+' data-href="'+settings.url+'"></div>'}},
        twitter:    {action: 'Tweet',
                     scriptURL: 'https://platform.twitter.com/widgets.js',
                     scriptID: 'twitter-wjs',
                     href: '//twitter.com/intent/tweet?related=' + settings.twitter['data-twitter-related'] + '&url=',
                     real: function() {
                      var s = '<a href="https://twitter.com/share" class="twitter-share-button" '+settings.style.twitter+' data-url="'+settings.url+'" ';
                      for(var attr in settings.twitter)
                        s+= attr+'="'+settings.twitter[attr]+'" '
                      s+= '></a>';
                      return s;
                      }},

        linkedin:   {action: 'Share',
                     scriptURL: 'https://platform.linkedin.com/in.js',
                     href: '//www.linkedin.com/shareArticle?mini=true&url=',
                     real: function() {return '<script type="IN/Share" '+settings.style.linkedin+'data-url="'+settings.url+'"></script>'}}
      };

      sitesToUse.forEach(function(name) {
        if(!sites[name]) return;
        var li = createPlaceholder(name, sites[name], settings.url, list.getAttribute('data-style'), eager);
        list.appendChild(li);
        if(eager) {
          readSetts();
          createReal(li, sites[name].real());
          loadScript(sites[name]);
        } else {
          li.onmouseover = function() {
            this.onmouseover = null;
            this.removeChild(this.childNodes[0]);
            if(ga) _gaq.push(['_trackEvent', 'Social', name.substr(0,1).toUpperCase()+name.substr(1), site.action]);
            readSetts();
            createReal(li, sites[name].real());
            loadScript(sites[name]);
          }
        }
      });
    });
  }

  if(window.onload) {
    var curr = window.onload;
    var mine = function() {
        curr();
        lasySocial();
    };
    window.onload = mine;
  } else
      window.onload = lazySocial;
})();