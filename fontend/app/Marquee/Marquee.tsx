
import React from 'react';

const links = ['/zendesk.png', '/adobe.png', '/shopify.png', '/microsoft.png', '/intel.png', '/nvidia.png', '/atlassian.png', '/uber.png', '/stripe.png'];

const Marquee = () => {
  return (
    <div className='bg-white overflow-hidden'>
        <div className='flex space-x-[1rem] animate-marquee whitespace-nowrap h-[8rem] items-center'>
            {links.map((link, index) => 
                <img key={index} src={link} alt="" loading='lazy'/>)}
            {links.map((link, index) => 
                <img key={index + links.length} src={link} alt="" loading='lazy'/>)}
        </div>
    </div>
  );
};

export default Marquee;
