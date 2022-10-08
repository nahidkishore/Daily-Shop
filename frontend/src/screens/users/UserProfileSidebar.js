import React from 'react';
import { Link } from 'react-router-dom';
import ScreenHeader from '../../components/ScreenHeader';
import Wrapper from '../dashboard/Wrapper';

const UserProfileSidebar = () => {
  return (
    <Wrapper>
      <ScreenHeader>User Profile updated</ScreenHeader>
      <div className='sidebar'>
      <div className='sidebar__element'>
        <h3>Setting</h3>
      </div>
      <div className='sidebar__element'>
        <Link>Change Password</Link>
        <Link to='/updatePassword'>Change Password</Link>
      </div>
      <div className='sidebar__element'>
        <Link to='/updateName'>Change Name</Link>
      </div>
    </div>
    </Wrapper>
    
  );
}

export default UserProfileSidebar;