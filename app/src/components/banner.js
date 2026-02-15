import React from 'react';
import Banner from 'react-js-banner';
// import info from '../assets/info.svg';
import './banner.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const banner = () => {
  const contentStyle = {
    background: '#FFF',
    color: '#354c74',
    width: '40%',
    fontFamily: 'Lato',
  };
  const arrowStyle = { color: '#FFF' };
  return (
    <Banner
      title={
        <div>
          <span
            style={{
              color: '#FFF',
              fontFamily: 'Lato',
            }}
          ></span>
          <span> </span>
          <span>
            <Popup
              trigger={
                <span
                  style={{
                    color: '#FFF',
                    fontFamily: 'Lato',
                    textDecoration: 'underline',
                  }}
                ></span>
              }
              {...{
                contentStyle,
                arrowStyle,
              }}
              position={'bottom center'}
              on={['hover', 'focus']}
            ></Popup>
          </span>
        </div>
      }
    />
  );
};

export default banner;
