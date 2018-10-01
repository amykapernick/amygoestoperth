import React, { Component, Fragment } from 'react';
import Helmet from 'react-helmet';
import Prismic from 'prismic-javascript';
import {Link, LinkResolver, RichText, Date} from 'prismic-reactjs';
import {Tweet} from 'react-twitter-widgets';
import Codepen from 'react-codepen-embed';

import '../../scss/layouts/article.scss';
import {Facebook, Twitter} from 'react-feather';
import AmyKate from '../../img/amykate.jpg';
import AimHigher from '../../img/aimhigher.png';
import Freelance from '../../img/freelancers.png';

const profiles = {
  'amykate': {
    'title': 'Amy Goes to Perth',
    'id': 'amykate',
    'image': AmyKate,
    'url': ''
  },
  'AimHigher': {
    'title': 'AimHigher Web Design',
    'id': 'aimhigher',
    'image': AimHigher,
    'url': 'https://aimhigherwebdesign.com.au'
  },
  'Freelance': {
    'title': "Freelancer's Guide",
    'id': 'freelance',
    'image': Freelance,
    'url': 'https://thefreelance.guide/'
  },
};

const siteUrl = 'https://amygoestoperth.com.au/';

class Meta extends Component {
  render() {
      let name = this.props.name + ' | Amy Goes to Perth';
      let description = this.props.description;
      let slug = this.props.slug;
      let image = this.props.featureImage;
      return (
          <Helmet>
              <title>{name}</title>
              <meta name="description" content={description} />
              <link rel="canonical" href={slug} />

              {/* Facebook */}
              <meta property="og:url" content={slug} />
              
              <meta property="og:title" content={name} />
              <meta property="og:image" content={image} />
              <meta property="og:description" content={description} />

              {/* Twitter */}
              <meta name="twitter:url" content={slug} />
              <meta name="twitter:title" content={name} />
              <meta name="twitter:description" content={description} />
              <meta name="twitter:image" content={image} />
          </Helmet>
      );
  }
};


export const Article = ({match}) => (
  <div>
    <Content id={match.params.id} />
  </div>
);

class Content extends Component {
  constructor() {
    super();
    this.state = {
      article: null
    };
  };

  componentWillMount() {
    const apiEndpoint = 'https://amygoestoperth.prismic.io/api/v2';
    Prismic.api(apiEndpoint).then(api => {
      api.query(
        Prismic.Predicates.at('my.blog_post.uid', this.props.id)
      ).then(response => {
        if (response) {
          this.setState({article: response.results[0]});
        }
      });
    });
  }

  render() {
    let title, item, article, content, intro, date;
    if (this.state.article) {
      item = this.state.article;
      title = item.data.title[0].text;

      let articleLink = siteUrl + item.slugs[0];
      let facebookLink = 'https://www.facebook.com/sharer/sharer.php?u=' + articleLink;
      let twitterLink = 'https://twitter.com/home?status=So%20%40amys_kapers%20wrote%20this%20really%20cool%20blog%20post,%20you%20should%20check%20it%20out!%20' + articleLink;

      let pubDate;
      if(item.data.custom_publish_date) {
        pubDate = item.data.custom_publish_date;
      }
      else {
        pubDate = item.first_publication_date
      };
      let d = Date(pubDate);
      date = d.getDate() + ' ' + d.toLocaleString("en", { month: "long"  }) + ' ' + d.getFullYear();

      let featureImage = item.data.featured_image.url;
      let profileImage, profileUrl;
      let tags = item.tags || [];

      if (tags.indexOf(profiles.AimHigher.id) > -1) {
        profileImage = profiles.AimHigher.image;
        profileUrl = profiles.AimHigher.url;
      }
      else if (tags.indexOf(profiles.Freelance.id) > -1) {
        profileImage = profiles.Freelance.image;
        profileUrl = profiles.Freelance.url;
      }
      else {
        profileImage = profiles.amykate.image;
        profileUrl = profiles.amykate.url;
      };

      intro = (
        <div className="share-icons">
          <Meta name={title} description={item.data.description[0].text} slug={articleLink} featureImage={featureImage} />
          <a href={facebookLink} target="_blank" className="facebook share-link">{<Facebook />}</a>
          <a href={twitterLink} target="_blank" className="twitter share-link">{<Twitter />}</a>
          <div className="author">
            { profileUrl !== '' ?
              <a href={profileUrl} target="_blank" rel="nofollow">
                <img alt="Profile Image" className="image-profile" src={profileImage} />
              </a>
            :
              <img alt="Profile Image" className="image-profile" src={profileImage} />
            }
          </div>
        </div>
      );

      content = item.data.body;
      article = content.map((section) => {
        if (section.slice_type == 'content') {
          return(
            RichText.render(section.primary.text, LinkResolver)
          )
        }
        else if (section.slice_type == 'image') {
          if (section.primary.image_gallery == "Yes") {
            let imageLot = section.items;
            let images = imageLot.map((image) => {
              let panorama = '';
              if (image.panorama == 'Yes') {
                panorama = 'panorama';
              }
              return (
                <div className={'image-container' + panorama} key={image.image.url}>
                  <img src={image.image.url} alt={image.image.alt} />
                </div>
              );
            });

            return (
              <figure>
                {images}
              </figure>
            )
          }
          else if (section.primary.same_caption == "Yes") {
            let imageLot = section.items;
            let images = imageLot.map((image) => (
              <div className="image-container" key={image.image.url}>
                <img src={image.image.url} alt={image.image.alt} />
              </div>
            ));

            return (
              <figure>
                {images}
                <figcaption>{imageLot[0].caption[0].text}</figcaption>
              </figure>
            );
          }
          else {
            let imageLot = section.items;
            let images = imageLot.map((image) => {
              let justify = image.justify.toLowerCase();
              return (
                <figure key={image.image.url} className={justify}>
                  <div className="image-container" >
                    <img src={image.image.url} alt={image.image.alt} />
                  </div>
                  {image.caption[0] && <figcaption>{image.caption[0].text}</figcaption>}
                </figure>
              );
            });

            return (
              <Fragment>{images}</Fragment>
            );
          }
        }
        else if (section.slice_type == 'horizontal_break') {
          return (<hr />);
        }
        else if (section.slice_type == 'blockquote') {
          return (
            <blockquote>{section.primary.blockquote[0].text}</blockquote>
          );
        }
        else if (section.slice_type == 'embed') {
          if (section.primary.embed.provider_name == "Twitter") {
            let urlStart = section.primary.embed.author_url + '/status/';
            let tweetUrl = section.primary.embed.embed_url;
            let urlStartLength = urlStart.length;
            let urlLength = tweetUrl.length
            let tweetIdDraft = tweetUrl.slice(urlStartLength, urlLength);            
            let urlEnd;
            if (tweetIdDraft.indexOf('/') >= 0) {
              urlEnd = tweetUrl.length - 1;
            }
            else {
              urlEnd = tweetUrl.length;
            }
            let tweetId = tweetIdDraft.slice(0, urlEnd); 

            return (
              <Tweet tweetId={tweetId} options={{conversation: "hidden"}} />
            );
          };
        }
        else if (section.slice_type == 'code') {
          let codeSects = section.primary.code;
          let codeBlock = codeSects.map((codeSec) => (
            codeSec.text
          ));
          return (
            <div className="code">
              <pre>
                {codeBlock}
              </pre>
            </div>
          );
        }
        else if (section.slice_type == 'codepens') {
          let codeId = section.primary.codepen_id[0].text;
          let codeUser = section.primary.codepen_user[0].text;
          let defaultTab, preview;
          if (section.primary.preview == 'Yes') {
            preview = false;
          }
          else {
            preview = true;
          }
          if (section.primary.default_tab == 'HTML') {
            defaultTab = 'html'
          }
          else if (section.primary.default_tab == 'CSS') {
            defaultTab = 'css'
          }
          else if (section.primary.default_tab == 'JS') {
            defaultTab = 'js'
          }
          else if (section.primary.default_tab == 'Result') {
            defaultTab = 'result'
          }
          return (
            <Codepen hash={codeId} user={codeUser} preview={preview} defaultTab={defaultTab} />
          );
        }
      });
    };

    return (
      <article className="article content">
        <header>
          <h1>{title}</h1>
          <div className="article-intro">
            {intro}
            <h6 className="date"><time dateTime={date}>{date}</time></h6>
          </div>
        </header>
        {article}
        <a href="/" className="back end">Back to Article Feed</a>
      </article>
    );
  }
};