import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import Img from 'gatsby-image'

import '../scss/layouts/feed.scss'
import { Facebook, Twitter } from 'react-feather'
import AmyKate from '../img/amykate.jpg'
import AimHigher from '../img/aimhigher.png'
import Freelance from '../img/freelancers.png'
import Owl from '../img/owl.svg'

const profiles = {
	'Amy Goes To Perth': {
		title: 'Amy Goes to Perth',
		id: 'amykate',
		image: AmyKate,
		url: 'https://amygoestoperth.com.au',
	},
	AimHigher: {
		title: 'AimHigher Web Design',
		id: 'aimhigher',
		image: AimHigher,
		url: 'https://aimhigherwebdesign.com.au',
	},
	'The Freelance Guide': {
		title: "Freelancer's Guide",
		id: 'freelance',
		image: Freelance,
		url: 'https://thefreelance.guide',
	},
}

export default class IndexPage extends React.Component {
	render() {
		const { data } = this.props,
			{ edges: posts } = data.allMarkdownRemark,
			{ edges: featured } = data.featuredPost,
			meta = {
				name: data.site.siteMetadata.title,
				description: data.site.siteMetadata.description,
				slug: data.site.siteMetadata.siteUrl,
			}

		featured[0].node.featured = true

		return (
			<Layout meta={meta}>
				<h1 className="hidden">Amy Goes to Perth</h1>
				<div className="article-feed">
					{/* {true && <Article {...featured[0].node} key="featured" />} */}
					{posts.map(({ node: post }) => {
						if (!post.frontmatter.draft || process.env.NODE_ENV == 'development') {
							return <Article {...post} key={post.id} />
						}
					})}
				</div>
			</Layout>
		)
	}
}

const Article = ({ frontmatter, id, fields, excerpt, featured }) => {
	if (new Date(frontmatter.publishDate) > new Date()) {
		return
	}
	const author = profiles[frontmatter.mainBlog],
		articleLink = `${author.url}${fields.slug}`,
		facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${articleLink}`,
		twitterLink = `https://twitter.com/home?status=So%20%40amys_kapers%20wrote%20this%20really%20cool%20blog%20post,%20you%20should%20check%20it%20out!%20${articleLink}`,
		image = frontmatter.featuredImage || frontmatter.featuredGif

	return (
		<article key={id} className={`feed-article ${featured && 'featured'}`}>
			<div className="image-feature">{image.childImageSharp ? <Img fixed={image.childImageSharp.fixed} /> : <img src={image.publicURL} />}</div>
			<div className="author">
				<div className="image-profile">
					{author.url !== '' ? (
						<a href={author.url} target="_blank" rel="nofollow" title={'Link to host blog, ' + author.title}>
							<img alt="Profile Image" src={author.image} />
						</a>
					) : (
						<img alt="Profile Image" src={author.image} />
					)}
				</div>
			</div>
			<header>
				<h2 className="article-title">
					<Link to={`${fields.slug.replace('/blog/posts', '')}`}>{frontmatter.title}</Link>
				</h2>

				<time className="date">{frontmatter.publishDate}</time>
			</header>
			<div className="excerpt">{excerpt}</div>
			<div className="share-icons">
				<a href={facebookLink} target="_blank" className="facebook share-link">
					{<Facebook />}
					<span>Share article to Facebook (opens in new tab)</span>
				</a>
				<a href={twitterLink} target="_blank" className="twitter share-link">
					<span className="twitter">
						<Twitter />
					</span>
					<span className="owl">
						<Owl />
					</span>
					<span>Share article to Twitter (opens in new tab)</span>
				</a>
			</div>
		</article>
	)
}

export const pageQuery = graphql`
	query IndexQuery {
		site {
			siteMetadata {
				title
				description
				siteUrl
			}
		}
		allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___updateDate] }) {
			edges {
				node {
					id
					excerpt(pruneLength: 400)
					fields {
						slug
					}
					frontmatter {
						title
						draft
						publishDate(formatString: "DD MMM YYYY")
						mainBlog
						tags
						featuredImage {
							childImageSharp {
								fixed(width: 500) {
									...GatsbyImageSharpFixed_withWebp
								}
							}
						}
					}
				}
			}
		}
		featuredPost: allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___updateDate] }, limit: 1) {
			edges {
				node {
					id
					excerpt(pruneLength: 400)
					fields {
						slug
					}
					frontmatter {
						title
						draft
						publishDate(formatString: "DD MMM YYYY")
						mainBlog
						tags
						featuredGif
					}
					html
				}
			}
		}
	}
`
