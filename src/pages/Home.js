import React from 'react';

import Ladder from '../components/Home/Ladder';

import RuleCart from '../components/Home/RuleCart';

import '../style/home.scss';

import pepeWisdom from '../assets/wisdom.png';

import panic from '../assets/panic.png';
// import pyramid from '../assets/pyramid.png';
import jude from '../assets/jude.png';
// import stupid from '../assets/stupid.png';
import success from '../assets/success.png';
// import guns from '../assets/guns.png';

const rules = [
  {
    title: "Don't be pathetic",
    text: "Lost a lot of money? They arn't real, try again",
    imgSrc: panic
  },
  // {
  //   title: "Don't believe",
  //   text: "Just enjoy and have fun. Things are not matter",
  //   imgSrc: pyramid
  // },
  {
    title: "Move your money",
    text: "Buy and sell. Do not store in fiat",
    imgSrc: jude
  },
  // {
  //   title: "Don't be foolish",
  //   text: "Buy red, sell green, improvise",
  //   imgSrc: stupid
  // },
  {
    title: "Uaghh!",
    text: "Get a lot? Don't stop",
    imgSrc: success
  },
  // {
  //   title: "State doesn't matter",
  //   text: "Load up on guns, bring your friends",
  //   imgSrc: guns
  // },
];

const Home = (props) => {
  return (
    <main className='home-container'>
      <div className='welcome-cart'>
        <div className='wrap-img'>
          <img src={pepeWisdom} alt='wisdom frog'/>
        </div>
        <div className='wrap-text'>
          <h1>{"*~{^-^}~*"} | The Pepele</h1>
          <h2>cryptocurrency exchange simulator game</h2>
          <p>
            For start you have $5k and the whole live data of cryptocurrency you need.
          </p>
          <br/>
          <h3>Make your pepe reach and happy</h3>
        </div>
      </div>

      <Ladder nav={props.navigate}/>
      
      <div className='rules'>
        {
          rules.map(rule => (
            <RuleCart
              key={rule.title}
              title={rule.title}
              text={rule.text}
              imgSrc={rule.imgSrc}
            />
          ))
        }
      </div>
      
    </main >
  );
}

export default Home;