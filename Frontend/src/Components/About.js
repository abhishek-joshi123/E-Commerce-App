import React from 'react'
import Layout from '../Layouts/Layout'
import '../Styles/About.css'
import AboutImage from '../Images/AboutImage.jpg'

export default function About() {
  return (
    <Layout title = {'About us - Ecommerce App'}>
      <div className='about-Div'>
          <div className='About-Heading'>
            <span>Who We Are</span>
          </div>
          <div className='About-Image'>
            <img src={AboutImage} alt="image" />
          </div>
          <div className='About-Inform'>
            <section>
              <p>With the trendiest, freshest, and most unique styles from across India and the world, AJIO invites you to express your personal style fearlessly, and with a confidence and optimism that cannot be easily shaken. </p>
            </section>
            <article>
                <div>
                  <p className='PHeading'>AJIO OWN</p>
                  <p className='PPara'>AJIO OWN is our private label – that’s designed by us, and owned by you. If you’re looking for head-turning styles that are one-of-a-kind, AJIO OWN is what you should stock up on.</p>
                </div>
                <div className='About-Inform-SecondDiv'>
                  <p className='PHeading'>Exclusive International Labels</p>
                  <p className='PPara'>We bring you the trendiest and most exclusive brands from around the world to your wardrobe. Forget scouring the net for what’s hot globally, we’ve got you covered.</p>
                </div>
            </article>
            <section>
              <p>Why let a world that loves to police your wardrobe and your expression get the upper hand, anyway?
                <br/>
                <br/>
                So the next time someone says ‘Oh, that dress is too bold’ ‘Are you sure you’re the right size for this?’ ‘Maybe you should pick a colour that suits you’ or ‘Act your age and wear something else’, go ahead and do exactly what you please. When it comes to great style and personal expression, there should never be any regrets.
              </p>
            </section>
            <article>
                <div>
                  <p className='PHeading'>Capsule Collections</p>
                  <p className='PPara'>If there’s an occasion to express your personal style, we’ve got a capsule collection to match. Shopping for a specific mood, event or style story has never been easier.</p>
                  <p className='PHeading'>AJIO Style Tribe</p>
                  <p className='PPara'>A high-fashion editorial where we feature the internet’s coolest cats. It’s where you get to read the stories of these influencers and shop their stunning shoot looks.</p>
                  <p className='PHeading'>#AJIOrecommends</p>
                  <p className='PPara'>From the hailstorm of trends coming down on us every season, we only recommend the ones guaranteed to put you on the hit list. Watch out for these regular highlights.</p>
                </div>
                <div className='About-Inform-SecondDiv'>
                  <p className='PHeading'>The Indie Experience</p>
                  <p className='PPara'>Our Indie styles are literally art you can wear. They are carefully handpicked, so that only the most authentic, handcrafted pieces by artisans across the country and globe make the cut.</p>
                  <p className='PHeading'>#AJIOtoday</p>
                  <p className='PPara'>Our daily trend spotlight that lets you in on what’s hip and happening, and what you should be carting right now. Like they say, a trend each day keeps the blues away!</p>
                  <p className='PHeading'>#recommendsAJIO</p>
                  <p className='PPara'>This is where we celebrate and showcase our most stylish customers, who’ve given us a shout-out on social while dressed in a trendy AJIO style. You could very well be on the list too.</p>
                </div>
            </article>
          </div>
      </div>
    </Layout>
  )
}
