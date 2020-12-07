import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

library.add(faFacebookF, faTwitter, faInstagram);

const SocialIcons = () => (
  <div className="d-flex justify-content-center">
    <FontAwesomeIcon icon={['fab', 'instagram']} size="lg" className="m-1" />
    <FontAwesomeIcon icon={['fab', 'twitter']} size="lg" className="m-1" />
    <FontAwesomeIcon icon={['fab', 'facebook-f']} size="lg" className="m-1" />
  </div>
);

export default SocialIcons;
