import React from 'react';
import { Link } from 'react-router-dom';
import { ResponsiveLine } from 'nivo';
import logoWhite from '../images/storyland-white.png';
import ExploreLatestBooks from '../components/explore/ExploreLatestBooks';

const Landing = () => {
  return (
    <div className='landing-web'>
      <div className='landing-first-section'>
        <div className='landing-logo'>
          <img src={logoWhite} alt='storyland-app' />
        </div>
        <div className='landing-screen first-landing'>
          <div className='landing-screen-text'>
            <h2 className='landing-screen-title'>
              Welcome to your private library
            </h2>
            <p>
              The app that helps you to read more, to keep your books organized
              and discover new ones with your friends
            </p>
          </div>
        </div>
      </div>
      <div className='landing-screen second-landing'>
        <ExploreLatestBooks />
        <div className='landing-screen-text catalog-text'>
          <h2 className='landing-section-title'>Full catalog of books</h2>
          <h3 className='landing-section-subtitle'>
            Where you can discover wonderful recommendations
          </h3>
        </div>
      </div>
      <div className='landing-screen third-landing'>
        <div className='chart-landing'>
          <ResponsiveLine
            data={[
              {
                id: 'Pages',
                data: [
                  { x: '1', y: 24 },
                  { x: '2', y: 50 },
                  { x: '3', y: 60 },
                  { x: '4', y: 86 },
                  { x: '5', y: 32 },
                  { x: '6', y: 10 },
                  { x: '7', y: 42 },
                  { x: '8', y: 22 },
                  { x: '9', y: 95 },
                  { x: '10', y: 60 },
                  { x: '11', y: 68 },
                  { x: '12', y: 32 },
                  { x: '13', y: 82 },
                  { x: '14', y: 65 },
                  { x: '15', y: 45 },
                  { x: '16', y: 24 },
                  { x: '17', y: 58 },
                  { x: '18', y: 98 }
                ]
              }
            ]}
            curve='natural'
            axisTop={null}
            axisRight={null}
            axisBottom={null}
            axisLeft={null}
            enableGridY={false}
            enableGridX={false}
            lineWidth={7}
            dotSize={0}
            colors='#ffbb43'
            dotColor='inherit:darker(1)'
            dotLabelYOffset={-15}
            isInteractive={false}
            enableStackTooltip={false}
            animate={true}
            motionStiffness={100}
            motionDamping={5}
          />
        </div>
        <div className='landing-screen-text chart-text'>
          <h2 className='landing-section-title'>Daily stats.</h2>
          <h3 className='landing-section-subtitle'>
            The daily stats will help you to know how much you read periodically
            and they will encourage you to keep the habit
          </h3>
        </div>
      </div>
      <div className='landing-screen buddies-screen'>
        <div className='landing-buddies'>
          <img alt='storyland-buddy' src='https://joeschmoe.io/api/v1/jordan' />
          <img alt='storyland-buddy' src='https://joeschmoe.io/api/v1/jeane' />
        </div>
        <div className='landing-buddies'>
          <img alt='storyland-buddy' src='https://joeschmoe.io/api/v1/jed' />
          <img alt='storyland-buddy' src='https://joeschmoe.io/api/v1/jenni' />
        </div>
        <div className='landing-screen-text buddies-text'>
          <h2 className='landing-section-title'>Connect with your friends.</h2>
          <h3 className='landing-section-subtitle'>
            Discover what they are reading, their tastes and what books they
            have pending
          </h3>
        </div>
      </div>
      <div className='landind-screen fifth-landing'>
        <div className='landing-screen-text'>
          <h2 className='landing-section-title'>Start now.</h2>
          <h3 className='landing-section-subtitle'>
            Sign up and become a lover of reading.
          </h3>
        </div>
        <div className='landing-buttons'>
          <div>
            <Link to='/register'>
              <button className='my-button reg-button'>Get Started</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
